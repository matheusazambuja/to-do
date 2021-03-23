import Head from "next/head"

import { Box, Flex, Grid, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/layout"
import React, { useState } from "react"
import { Input } from "@chakra-ui/input"
import { Button } from "@chakra-ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Task {
  id: number
  title: string
  isComplete: boolean
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

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

    background: 'whiteAlpha.200',
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
        alignItems='center'
        justifyContent='space-between'

        background='gray.700'
        color='white'

        paddingTop='1rem'
        paddingBottom='0.7rem'

      >
        <Heading
          width='100%'
          textAlign='center'
        >
          Todo List
        </Heading>

      </Flex>

      <Flex as='div'
        gridArea='content'
        direction='column'

        padding='1.9rem 3.5rem'
        
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
                    color='gray.500'
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
        direction='row'
        alignItems='center'
        justifyContent='space-between'

        background='gray.400'
        color='white'

        paddingLeft='2rem'
      >
        <Text as='span'
          color='whiteAlpha.800'
        >
          {
            tasks.filter(task => {
              return !task.isComplete
            }).length
          } TASKS
        </Text>

        <Flex as='div'
          alignItems='center'
          justifyContent='center'
          marginRight='0.8rem'
        >
          <Input id='input-title'
            type='text'
            placeholder='Add new task'
            onChange={(e) => setNewTaskTitle(e.target.value)}

            background='gray.500'
            border='0'
            width='17rem'
            marginRight='0.3rem'
            marginTop='5px'
            marginBottom='5px'
          />
          <Button type='submit' onClick={handleCreateNewTask}
            background='transparent'
            color='white'

            _hover={{
              background: 'whiteAlpha.300',
            }}
          >
            <FontAwesomeIcon icon='plus'/>
          </Button>
        </Flex>
      </Flex>
    </Grid>
  )
}