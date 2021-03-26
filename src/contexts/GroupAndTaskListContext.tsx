import { createContext, ReactNode, useEffect, useState } from "react";

export interface Task {
  title: string
  isCompleted: boolean
}

export interface TaskGroup {
  tasks: Task[]
  name: string
  isSelected: boolean
  quantityTasksIncompleted: number
  quantityTasksCompleted: number
}

interface GroupAndTaskListContextData {
  taskGroupsList: TaskGroup[]
  getTaskGroupSelected: () => TaskGroup
  createNewTaskGroup: (groupName: string) => void
  removeTaskGroup: (index: number) => void
  selectTaskGroup: (index: number, newTaskGroupsList: TaskGroup[]) => void
  createNewTask: (titleTask: string) => void
  removeTask: (index: number) => void
  toggleTaskCompletion: (index: number) => void
}

interface GroupAndTaskListProviderProps {
  children: ReactNode
}

export const GroupAndTaskListContext = createContext(
  {} as GroupAndTaskListContextData
)

export function GroupAndTaskListProvider({ children }: GroupAndTaskListProviderProps ) {

  const [taskGroupsList, setTaskGroupsList] = useState<TaskGroup[]>([{
      tasks: [] as Task[],
      name: 'General',
      isSelected: true,
      quantityTasksIncompleted: 0,
      quantityTasksCompleted: 0
    }]
  )

  function createNewTaskGroup(groupName: string) {

    const newTaskGroup: TaskGroup = {
      name: groupName,
      isSelected: true,
      tasks: [] as Task[],
      quantityTasksIncompleted: 0,
      quantityTasksCompleted: 0
    }

    const newTaskGroupsList = taskGroupsList.map(group => {
      return group.isSelected ? { ...group, isSelected: false } : group
    })

    setTaskGroupsList([ ...newTaskGroupsList, newTaskGroup ])
  }

  function removeTaskGroup(index: number) {
    const indexTaskGroupGeneral = 0

    if (index === indexTaskGroupGeneral) return
    else {

      const newTaskGroupsList: TaskGroup[] = taskGroupsList.filter((group, groupIndex) => groupIndex !== index)

      // setTaskGroupsList([ ...newTaskGroupsList ])

      selectTaskGroup(indexTaskGroupGeneral, newTaskGroupsList)
    }
  }

  function selectTaskGroup(index: number, newTaskGroupsList: TaskGroup[]) {
    let newTaskGroups: TaskGroup[] = newTaskGroupsList.map((group, groupIndex) => {

      if (group.isSelected) {
        group.isSelected = false
      } else if (groupIndex === index) {
        group.isSelected = true
      }

      return group
    })

    setTaskGroupsList([ ...newTaskGroups ])
  }

  function getTaskGroupSelected() {
    const taskGroupSelected = taskGroupsList.filter(group => {
      return group.isSelected === true
    })[0]

    return taskGroupSelected
  }

  useEffect(() => {
    console.log(taskGroupsList)
  }, [taskGroupsList])

  // ********************************************************************

  function createNewTask(titleTask: string) {

    const task = {
      title: titleTask,
      isCompleted: false
    }

    const newTaskList = [ ...getTaskGroupSelected().tasks, task ]

    changeTaskList(newTaskList)
  }

  function removeTask(index: number) {
    const newTaskList = getTaskGroupSelected().tasks.filter((task, taskIndex) => {
      return taskIndex !== index
    })

    changeTaskList(newTaskList)
  }

  function toggleTaskCompletion(index: number) {
    const newTaskList = getTaskGroupSelected().tasks.filter((task, taskIndex) => {
      return taskIndex === index ? (task.isCompleted = !task.isCompleted) || true : true
    })

    changeTaskList(newTaskList)
  }

  function getQuantityTasksIncompleted(taskList: Task[]) {
    const quantityTaskIncompleted = taskList.filter(group => {
      return !group.isCompleted
    }).length

    return quantityTaskIncompleted
  }

  function getQuantityTasksCompleted(taskList: Task[]) {
    const quantityTaskCompleted = taskList.filter(group => {
      return group.isCompleted
    }).length

    return quantityTaskCompleted
  }

  function changeTaskList(newTaskList: Task[]) {
    const newTaskGroups: TaskGroup[] = taskGroupsList.map(group => {
      return group.isSelected ? {
        ...group,
        tasks: newTaskList,
        quantityTasksIncompleted: getQuantityTasksIncompleted(newTaskList),
        quantityTasksCompleted: getQuantityTasksCompleted(newTaskList)
      } : group
    })

    setTaskGroupsList(newTaskGroups)
  }

  return (
    <GroupAndTaskListContext.Provider value={{
      taskGroupsList,
      getTaskGroupSelected,
      createNewTaskGroup,
      removeTaskGroup,
      selectTaskGroup,
      createNewTask,
      removeTask,
      toggleTaskCompletion,
    }}>
      {children}
    </GroupAndTaskListContext.Provider>
  )
}