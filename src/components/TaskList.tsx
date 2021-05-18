import { Box, Flex, Grid, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/layout"
import React, { useContext, useState } from "react"
import { Input } from "@chakra-ui/input"
import { Button } from "@chakra-ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress"

import { GroupAndTaskListContext } from "../contexts/GroupAndTaskListContext"

interface DateNow {
  seconds: string,
  minutes: string,
  hours: string,
  dayOfWeek: string,
  day: string,
  month: string,
  year: string
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatDateTime(minuteOrHour: string) {
  if (minuteOrHour.length === 1) return '0'.concat(minuteOrHour)
  return minuteOrHour
}

export default function TaskList() {

  const {
    getTaskGroupSelected,
    createNewTask,
    removeTask,
    toggleTaskCompletion
  } = useContext(GroupAndTaskListContext)

  const [dateNow, setDateNow] = useState<DateNow>(setCurrentDateTime())

  function handleCreateNewTask(): void {
    const titleNewTask = document.querySelector('#input-title') as HTMLInputElement

    if (titleNewTask.value === '') {
      // gerar erro
      return 
    }
    createNewTask(titleNewTask.value)
    titleNewTask.value = ''
    // Não foi gerado erro
  }

  function handleRemoveTask(index: number): void {
    removeTask(index)
  }

  function handleToggleTaskCompletion(index: number): void {
    toggleTaskCompletion(index)
  }
    
  setTimeout(() => {
    setDateNow(setCurrentDateTime())
  }, 1000)

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
  function formatDateTime(minuteOrHour: string) {
    if (minuteOrHour.length === 1) return '0'.concat(minuteOrHour)
    return minuteOrHour
  }

  function setCurrentDateTime(): DateNow {
    const dateCurrent = new Date()
    return {
      seconds: formatDateTime(dateCurrent.toLocaleTimeString('default', { second: '2-digit' })),
      minutes: formatDateTime(dateCurrent.toLocaleTimeString('default', { minute: '2-digit' })),
      hours: formatDateTime(dateCurrent.toLocaleTimeString('default', { hour: '2-digit' })),
      dayOfWeek: capitalize(dateCurrent.toLocaleDateString('default', { weekday: 'long' })),
      day: dateCurrent.toLocaleDateString('default', { day: 'numeric' }),
      month: capitalize(dateCurrent.toLocaleDateString('default', { month: 'long' })),
      year: dateCurrent.toLocaleDateString('default', { year: 'numeric' })
    } as DateNow
  }

  const buttonsTaskCompletionStyle = {
    borderRadius: '50%',
    
    background: 'transparent',
    fontSize: '1.3rem',
    marginRight: '1rem',
    marginLeft: '1rem',
    padding: '0',
  }

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    width: '100%',
    height: '4rem',
    fontSize: '1.2rem',
    marginBottom: '1rem',
    borderRadius: '0.6rem',

    background: 'whiteAlpha.100',
  }

  return (
    <Grid as='div' gridArea='content' templateColumns='1.6fr 0.4fr' 
      templateRows='0.5fr 0.7fr 3fr' width='100%' color='white'
      templateAreas="
        'header dateHour'
        'inputTask dateHour'
        'taskListContent footer'
      "
      paddingRight='1rem' paddingLeft='2rem'
    >
      <Flex as='header' gridArea='header' alignItems='center' justifyContent='center' 
        width='100%' marginTop='2rem' marginLeft='1.4rem'
      >
        <Flex as='div' alignItems='center' width='100%'
        >
          <Text as='strong' fontSize='3rem' color='white'>
            {getTaskGroupSelected().name}
          </Text>
        </Flex>
      </Flex>
      <Flex gridArea='inputTask' as='div' alignItems='center' marginTop='1rem'
        marginLeft='0.8rem'
      >
        <Input id='input-title' type='text' placeholder='Adicionar nova tarefa'
          border='0' background='whiteAlpha.300' focusBorderColor='gray.200' 
          fontWeight='medium' width='100%' height='3.6rem'

          onKeyUp={(event) => {
            const keyEnterPressed = event.key === 'Enter'

            if (keyEnterPressed) {
              handleCreateNewTask()
            }
          }}

          _focus={{
            background: 'white',
            color: 'blue.900'
          }}
        />
        <Button type='submit' onClick={() => handleCreateNewTask()}
          background='transparent' color='white' marginLeft='0.5rem'
          size='lg'
          _hover={{
            background: 'whiteAlpha.100',
            color: 'green.400'
          }}
        >
          <FontAwesomeIcon icon='check'/>
        </Button>
      </Flex>

      <Box as='main' gridArea='taskListContent' paddingTop='2.5rem'>
        <UnorderedList>
          {getTaskGroupSelected().tasks.length !== 0 ? getTaskGroupSelected().tasks.map((task, indexTask) => (
            task.isCompleted ?
              <ListItem key={indexTask}
                {...listItemStyle}
              >
                <Flex as='div' alignItems='center'>
                  <Button checked={task.isCompleted}
                    onClick={() => handleToggleTaskCompletion(indexTask)}

                    {...buttonsTaskCompletionStyle}
                    color='green.400'

                    _hover={{
                      background: 'whiteAlpha.900',
                      color: 'gray.500'
                    }}
                  >
                    <FontAwesomeIcon icon='check-circle'/>
                  </Button>

                  <Text as='span' color='gray.300' textDecoration='line-through'
                    textAlign='center'
                  >
                    {task.title}
                  </Text>
                </Flex>
                <Button type='button'
                  onClick={() => handleRemoveTask(indexTask)}

                  background='red.600' fontSize='0.9rem' height='2rem'
                  width='2rem' marginRight='1rem'

                  _hover={{
                    background: 'red.610'
                  }}
                >
                  <FontAwesomeIcon icon='trash' />
                </Button>
              </ListItem>
            :
              <ListItem key={indexTask}
                {...listItemStyle}
              >
                <Flex as='div'
                  alignItems='center'
                >
                  <Button
                    checked={task.isCompleted}
                    onClick={() => handleToggleTaskCompletion(indexTask)}

                    {...buttonsTaskCompletionStyle}
                    color='white'
                
                    _hover={{
                      color: 'green.400'
                    }}
                  >
                    <FontAwesomeIcon icon={['far', 'circle']} />
                  </Button>

                  <Text as='p' marginBottom='5px' >
                    {task.title}
                  </Text>
                </Flex>
                <Button type='button' onClick={() => handleRemoveTask(indexTask)}
                  background='red.600' fontSize='0.9rem' height='2rem'
                  width='2rem' marginRight='1rem'

                  _hover={{
                    background: 'red.700'
                  }}
                >
                  <FontAwesomeIcon icon='trash' />
                </Button>
              </ListItem>
            ))
          :
          <Box as='div'>
            <Text as='span' background='transparent' color='white' 
              fontSize='1.7rem'
            >
              Sem tarefas
            </Text>
          </Box>
        }
        </UnorderedList>
      </Box>

      <Box as='span' gridArea='dateHour' display='flex' flexDirection='column' 
        width='15rem' color='whiteAlpha.800' alignItems='center' paddingTop='2rem'
      >
        <Text as='strong' fontSize='3.6rem'>
          {dateNow.hours}:{dateNow.minutes}
        </Text>

        <Text as='span' fontSize='1.5rem' >
          {dateNow.dayOfWeek}
        </Text>

        <Text as='span' color='whiteAlpha.500' fontSize='1.5rem' marginTop='0.2rem'>
          {dateNow.day} {dateNow.month} {dateNow.year}
        </Text>
      </Box>

      <Flex as='footer' gridArea='footer' direction='column' alignItems='center' 
        justifyContent='flex-end' width='100%' marginBottom='2rem' padding='0 2rem'
        color='white'
        borderRadius='0px 0px 0.6rem 0.6rem' fontSize='1.2rem'
      >
        <CircularProgress value={getTaskGroupSelected().tasks.length === 0 ? 0 : Math.round(getTaskGroupSelected().quantityTasksCompleted / getTaskGroupSelected().tasks.length * 100)}
          color='green.500' size='75' paddingBottom='1rem'
        >
          <CircularProgressLabel paddingBottom='1rem'>
            {
              getTaskGroupSelected().tasks.length === 0 ? 0 : 
                Math.round(getTaskGroupSelected().quantityTasksCompleted / getTaskGroupSelected().tasks.length * 100)
            }%
          </CircularProgressLabel>
        </CircularProgress>
        <Text as='span' color='whiteAlpha.800' textTransform='uppercase' 
          textAlign='center' paddingBottom='1rem'
        >
          {
            getTaskGroupSelected().quantityTasksIncompleted
          } Tarefas restantes
        </Text>
      </Flex>
    </Grid>
  )
}