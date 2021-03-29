import { Box, Flex, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/layout"
import React, { useContext, useState } from "react"
import { Input } from "@chakra-ui/input"
import { Button } from "@chakra-ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress"

import { GroupAndTaskListContext } from "../contexts/GroupAndTaskListContext"
import { GetStaticProps } from "next"
import { motion } from "framer-motion"

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
    
  setTimeout(() => {
    setDateNow(setCurrentDateTime())
  }, 1000)

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
    <>
      <Flex as='header'
        gridArea='header'
        width='100%'

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
            <motion.p
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.6 }}
            >
              <Text as='span'
                color='whiteAlpha.600'
                fontSize='1.6rem'

                marginRight='0.4rem'
                paddingTop='0.4rem'
              >
                <FontAwesomeIcon icon='list-alt' />
              </Text>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.45 }}
            >
              <Heading
                fontSize='2.2rem'
                marginLeft='0.6rem'
              >
                {getTaskGroupSelected().name}
              </Heading>
            </motion.p>
          </Flex>

          <motion.p
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.45 }}
          >
            <Flex as='span'
              direction='column'
              alignItems='center'
              justifyContent='center'

              width='6rem'
              height='6rem'
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
          </motion.p>
        </Flex>

        <Flex as='div'
          alignItems='center'
          justifyContent='center'

          width='100%'
          marginRight='0.8rem'
        >
          <motion.p
            initial={{ opacity: 0, width: '0' }}
            animate={{ opacity: 1, width: '55%' }}
            transition={{ ease: 'easeInOut', duration: 0.7 }}
          >
            <Input id='input-title'
              type='text'
              placeholder='Add new task'

              background='whiteAlpha.300'
              fontWeight='medium'
              
              border='0'
              width='100%'
              marginRight='0.3rem'
              marginTop='5px'
              marginBottom='5px'

              _focus={{
                background: 'white',
                color: 'blue.900'
              }}
            />
          </motion.p>
          <motion.p
            initial={{ opacity: 0, width: '0' }}
            animate={{ opacity: 1, width: '1rem' }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
          >
            <Button type='submit' onClick={() => handleCreateNewTask()}
              background='transparent'
              color='white'

              _hover={{
                background: 'whiteAlpha.100',
                color: 'green.400'
              }}
            >
              <FontAwesomeIcon icon='check'/>
            </Button>
          </motion.p>
        </Flex>
      </Flex>

      <Flex as='div'
        gridArea='content'
        direction='column'
        width='100%'

        padding='0.5rem 4.2rem 1.9rem 1.8rem'
        
        background='gray.700'
        color='white'
      >

        <Box as='main'
        >
          <UnorderedList
          >
            {getTaskGroupSelected().tasks.length !== 0 ? getTaskGroupSelected().tasks.map((task, indexTask) => (
              task.isCompleted ?
              <motion.div
                initial={{ opacity: 0, width: '50%' }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ ease: 'easeInOut', duration: 0.7 }}
              >
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
                    onClick={() => handleRemoveTask(indexTask)}

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
                </ListItem>
              </motion.div> : 
              <motion.div
                initial={{ opacity: 0, width: '50%' }}
                animate={{ opacity: 1, width: '100%' }}
                transition={{ ease: 'easeInOut', duration: 0.7 }}
              >
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

                    <Text as='p'
                      fontWeight='medium'
                      marginBottom='5px'
                    >
                      {task.title}
                    </Text>
                  </Flex>
                  <Button type='button'
                    onClick={() => handleRemoveTask(indexTask)}

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
              </motion.div>
            ))
            :
            <Text as='span'
              background='transparent'
              color='white'
              fontWeight='medium'
              fontStyle='italic'

              paddingTop='1rem'
            >
              <motion.p
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
              >
                No tasks
              </motion.p>
            </Text>
          }
          </UnorderedList>
        </Box>
      
      </Flex>
      <Flex as='footer'
        gridArea='footer'
        alignItems='center'
        justifyContent='space-between'

        width='100%'

        background='gray.900'
        color='white'

        borderRadius='0px 0px 10px 10px'

        padding='0 2rem'
      >
        <Text as='span'
          color='whiteAlpha.800'
          fontWeight='medium'
        >
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.4 }}
          >
            {
              getTaskGroupSelected().quantityTasksIncompleted
            } REMAINING TASKS
          </motion.p>
        </Text>
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
        >
          <CircularProgress value={getTaskGroupSelected().tasks.length === 0 ? 0 : Math.round(getTaskGroupSelected().quantityTasksCompleted / getTaskGroupSelected().tasks.length * 100)}
            color='green.500'
            size='67'
          >
            <CircularProgressLabel fontSize='1.3rem' fontWeight='medium'>
              {
                getTaskGroupSelected().tasks.length === 0 ? 0 : 
                  Math.round(getTaskGroupSelected().quantityTasksCompleted / getTaskGroupSelected().tasks.length * 100)
              }
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
        </motion.p>
      </Flex>
    </>
  )
}