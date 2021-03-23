import Head from "next/head"

import { Box, Flex, Grid, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/layout"
import React, { useState } from "react"
import { Input } from "@chakra-ui/input"
import { Button } from "@chakra-ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress"

interface Task {
  id: number
  title: string
  isComplete: boolean
}

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
  const [dateNow, setDateNow] = useState<DateNow>({} as DateNow)
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  
  setTimeout(() => {
    const dateCurrent = new Date()
    setDateNow({
      seconds: formatDateTime(dateCurrent.toLocaleTimeString('default', { second: '2-digit' })),
      minutes: formatDateTime(dateCurrent.toLocaleTimeString('default', { minute: '2-digit' })),
      hours: formatDateTime(dateCurrent.toLocaleTimeString('default', { hour: '2-digit' })),
      dayOfWeek: capitalize(dateCurrent.toLocaleDateString('default', { weekday: 'long' })),
      day: dateCurrent.toLocaleDateString('default', { day: 'numeric' }),
      month: capitalize(dateCurrent.toLocaleDateString('default', { month: 'long' })),
      year: dateCurrent.toLocaleDateString('default', { year: 'numeric' })
    })
  }, 1000)

  function quantTaskListComplete(tasks: Task[]) {
    const countTaskList = tasks.length
    const countTaskListCompleted = tasks.filter(task => {
      return task.isComplete
    }).length

    return countTaskList ? Math.round((countTaskListCompleted / countTaskList) * 100) : 0
  }

  function handleCreateNewTask() {
    const id = Math.floor(Math.random() * 1000)
    if(newTaskTitle == '') {
      // Gerar erro
      return
    }
    const task = { id: id, title: newTaskTitle, isComplete: false }
    setTasks([ ...tasks, task ])

    const inputTitle = document.querySelector('#input-title') as HTMLInputElement
    inputTitle.value = ''
    setNewTaskTitle('')
    // Não houve erro
  }

  function handleToggleTaskCompletion(id: number) {
    const newTasksList = tasks.filter(task => {
      return task.id === id ? (task.isComplete = !task.isComplete) || true : true
    })
    setTasks(newTasksList)
  }

  function handleRemoveTask(id: number) {
    const newTasksList = tasks.filter(task => {
      return task.id != id
    })
    setTasks(newTasksList)
  }

  const buttonsTaskCompletionStyle = {
    borderRadius: '50%',
    
    background: 'transparent',
    fontSize: '1.3rem',
    marginRight: '1rem',
    padding: '0',
  }

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    
    width: '100%',
    height: '3rem',
    marginBottom: '1rem',
    marginTop: '1rem',
    paddingLeft: '1.2rem',
    borderRadius: '12px',

    background: 'whiteAlpha.100',
  }

  return (
    <Grid as='div'
      templateColumns='0.7fr 1.9fr 0.7fr'
      templateRows='0.6fr 0.6fr 2.8fr 0.4fr 0.6fr'
      templateAreas="
        '. . .'
        '. header .'
        '. content .'
        '. footer .'
        '. . .'
      "
      height='100vh'

      overflow='auto'

      background='gray.600'
    >
      <Head>
        <title>Home - Todo</title>
      </Head>

      <Flex as='header'
        gridArea='header'

        direction='column'
        alignItems='center'

        background='gray.700'
        color='white'

        borderRadius='10px 10px 0px 0px'

        paddingTop='1rem'
        paddingBottom='0.7rem'

      >
        <Flex as='div'
          alignItems='center'
          justifyContent='space-between'
          width='83%'

          marginBottom='1rem'
        >
          <Flex as='span'
            alignItems='center'
            justifyContent='center'
          >
            <Text as='span'
              color='blue.500'
              fontSize='1.6rem'
              marginRight='0.6rem'
            >
              <FontAwesomeIcon icon='list-alt' />
            </Text>
            <Heading
              fontSize='2.2rem'
              marginLeft='0.6rem'
            >
              Todo List
            </Heading>
          </Flex>

          <Flex as='span'
            direction='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >

            <Text as='span'
              fontSize='2.7rem'
              fontWeight='medium'
            >
              {dateNow.hours}:{dateNow.minutes}
            </Text>

            <Text as='span'
              color='whiteAlpha.800'
              fontSize='0.8rem'
              fontWeight='medium'
            >
              {dateNow.dayOfWeek}
            </Text>
            <Text as='span'
              color='whiteAlpha.500'
              fontSize='0.8rem'
              fontWeight='medium'
            >
              {dateNow.day} {dateNow.month} {dateNow.year}
            </Text>
          </Flex>
        </Flex>

        <Flex as='div'
          alignItems='center'
          justifyContent='center'

          width='100%'
          marginRight='0.8rem'
        >
          <Input id='input-title'
            type='text'
            placeholder='Add new task'
            onChange={(e) => setNewTaskTitle(e.target.value)}

            background='whiteAlpha.300'
            fontWeight='medium'
            
            border='0'
            width='60%'
            marginRight='0.3rem'
            marginTop='5px'
            marginBottom='5px'
          />
          <Button type='submit' onClick={handleCreateNewTask}
            background='transparent'
            color='white'

            _hover={{
              background: 'whiteAlpha.200',
            }}
          >
            <FontAwesomeIcon icon='plus'/>
          </Button>
        </Flex>

      </Flex>

      <Flex as='div'
        gridArea='content'
        direction='column'

        padding='0.5rem 4.2rem 1.9rem 1.8rem'
        
        background='gray.700'
        color='white'
      >

        <Box as='main'
        >
          <UnorderedList
          >
            {tasks.length != 0 ? tasks.map(task => (
              task.isComplete ? 
              <ListItem key={task.id}
                {...listItemStyle}
              >
                <Flex as='div'
                  alignItems='center'
                >
                  <Button
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}

                    {...buttonsTaskCompletionStyle}
                    color='green.400'

                    _hover={{
                      background: 'whiteAlpha.900',
                      color: 'gray.500'
                    }}
                  >
                    <FontAwesomeIcon icon='check-circle'/>
                  </Button>

                  <Text as='s'
                    color='gray.300'
                    fontWeight='medium'
                    marginBottom='5px'
                  >
                    {task.title}
                  </Text>
                </Flex>
                <Button type='button'
                  onClick={() => handleRemoveTask(task.id)}

                  background='red.600'
                  fontSize='0.9rem'

                  height='2rem'
                  width='2rem'
                  marginRight='1rem'

                  _hover={{
                    background: 'red.610'
                  }}
                >
                  <FontAwesomeIcon icon='trash' />
                </Button>
              </ListItem> :
              <ListItem key={task.id}
                {...listItemStyle}
              >
                <Flex as='div'
                  alignItems='center'
                >
                  <Button
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}

                    {...buttonsTaskCompletionStyle}
                    color='white'
                
                    _hover={{
                      color: 'green.400'
                    }}
                  >
                    <FontAwesomeIcon icon='circle' />
                  </Button>

                  <Text as='p'
                    marginBottom='5px'
                  >
                    {task.title}
                  </Text>
                </Flex>
                <Button type='button'
                  onClick={() => handleRemoveTask(task.id)}

                  background='red.600'
                  fontSize='0.9rem'

                  height='2rem'
                  width='2rem'
                  marginRight='1rem'

                  _hover={{
                    background: 'red.700'
                  }}
                >
                  <FontAwesomeIcon icon='trash' />
                </Button>
              </ListItem>
            ))
            :
              <Text as='span'
                background='transparent'
                color='white'
                fontWeight='medium'
                textAlign='center'
              >
                No tasks
              </Text>
            }
          </UnorderedList>
        </Box>
      
      </Flex>
      <Flex as='footer'
        gridArea='footer'
        alignItems='center'
        justifyContent='space-between'

        background='gray.900'
        color='white'

        borderRadius='0px 0px 10px 10px'

        padding='0 2rem'
      >
        <Text as='span'
          color='whiteAlpha.800'
          fontWeight='medium'
        >
          {
            tasks.filter(task => {
              return !task.isComplete
            }).length
          } REMAINING TASKS
        </Text>

        <CircularProgress value={quantTaskListComplete(tasks)}

          color='green.500'
          size='67'
        >
          <CircularProgressLabel fontSize='1.3rem' fontWeight='medium'>
            {quantTaskListComplete(tasks)}
            <Text as='span'
              position='relative'
              left='1px'
              top='-4px'

              color='blackAlpha.800'

              fontSize='0.92rem'
              fontWeight='bold'
            >
              %
            </Text>
          </CircularProgressLabel>
        </CircularProgress>
      </Flex>
    </Grid>
  )
}

export async function getStaticProps() {
}