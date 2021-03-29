
import { Button, ButtonProps } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { GroupAndTaskListContext } from '../contexts/GroupAndTaskListContext'


export default function GroupTaskList() {

  const {
    taskGroupsList,
    createNewTaskGroup,
    removeTaskGroup,
    selectTaskGroup,
  } = useContext(GroupAndTaskListContext)

  const [isClickedButtonNewGroup, setIsClickedButtonNewGroup] = useState(false)

  function handleNewTaskGroup() {
    const inputNameGroup = document.querySelector('#input-name-new-group') as HTMLInputElement

    if (inputNameGroup.value === '') {
      // Gerar erro
      return
    }

    createNewTaskGroup(inputNameGroup.value)
    inputNameGroup.value = ''
    setIsClickedButtonNewGroup(false)
    // Não houve erro
  }

  function handleRemoveTaskGroup(indexTaskGroup: number) {
    removeTaskGroup(indexTaskGroup)
  }

  const buttonTaskGroupsStyle: ButtonProps = {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: {
      base: '11rem',
      xl: '13rem'
    },
    height: '4.7rem',

    padding: '0.35rem 0.7rem 0.6rem 1.3rem',
    marginBottom: {
      base: '14px',
      xl: '20px'
    },
    marginLeft: {
      base: '2px'
    },
    marginRight: {
      base: '12px'
    },

    color: 'white',
    borderRadius: {
      base: '6px',
      xl: '12px'
    },

    _hover: {
      cursor: 'pointer'
    }
  }

  return (
    <>
      <Flex as='div'
        gridArea='taskGroups'
        flexWrap={{
          base: 'wrap',
          xl: 'wrap'
        }}
        direction={{
          base: 'row',
          xl: 'column'
        }}
        alignItems={{
          base: 'flex-start',
          xl: 'flex-start'
        }}
        justifyContent={{
          base: 'center',
          xl: 'flex-start'
        }}

        marginTop='15px'
        marginBottom='15px'
      >
        {taskGroupsList.map((group, indexTaskGroup) => (
          group.isSelected ? 
          <motion.div
            whileHover={{ 
              x: 3,
              y: -3,
              transition: { duration: 0.2 }
            }}
          >
            <Button as='div' key={Number(indexTaskGroup)}
              {...buttonTaskGroupsStyle}

              background='gray.600'
              shadow='0px 0px 3px 0px rgba(255, 255, 255, 0.4)'
            >
              <Flex as='div'
                width='100%'
                alignItems='center'
                justifyContent='space-between'
              >
                <Text as='span'
                  fontSize='1.4rem'
                  fontWeight='medium'
                >
                  {group.name}
                </Text>

                <Box as='span' onClick={() => handleRemoveTaskGroup(indexTaskGroup)}
                  paddingRight='0.5rem'
                  paddingTop='0.1rem'
                >
                  <FontAwesomeIcon icon='times' />
                </Box>
              </Flex>

              <Flex as='span'
                alignItems='center'
                justifyContent='space-between'

                marginTop='0.2rem'
                width='100%'

              >
                <Text as='span'
                  color='whiteAlpha.600'
                  fontSize='0.9rem'
                  fontWeight='medium'
                >
                  {group.tasks.length} tasks
                </Text>
                <Text as='span'
                  color='whiteAlpha.600'
                  fontSize='0.9rem'
                  fontWeight='medium'
                >
                  {group.quantityTasksCompleted} completed
                </Text>
              </Flex>
            </Button> 
          </motion.div>
          : 
          <motion.div
            whileHover={{ 
              x: 3,
              y: -3,
              transition: { duration: 0.2 }
            }}
          >
            <Button as='div' key={Number(indexTaskGroup)} onClick={() => selectTaskGroup(indexTaskGroup, taskGroupsList)}
              {...buttonTaskGroupsStyle}

              background='gray.700'
            >
              <Text as='span'
                fontSize='1.3rem'
                fontWeight='medium'
              >
                {group.name}
              </Text>

              <Flex as='span'
                alignItems='center'
                justifyContent='space-between'

                marginTop='0.2rem'
                width='100%'
              >
                <Text as='span'
                  color='whiteAlpha.600'
                  fontSize='0.9rem'
                  fontWeight='medium'
                >
                  {group.tasks.length} tasks
                </Text>
                <Text as='span'
                  color='whiteAlpha.600'
                  fontSize='0.9rem'
                  fontWeight='medium'
                >
                  {group.quantityTasksCompleted} completed
                </Text>
              </Flex>
            </Button>
          </motion.div>
          ))
        }
        {!isClickedButtonNewGroup ?
          <Button onClick={() => setIsClickedButtonNewGroup(true)}
            display='flex'
            alignItems='center'
            justifyContent='center'

            background='blue.400'
            color='whiteAlpha.800'
            fontSize='0.9rem'

            width='12rem'
            height='2.2rem'

            marginLeft='7px'
            _hover={{
              background: 'blue.500',
              color: 'whiteAlpha.900'
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <FontAwesomeIcon icon='plus' />
              <Text as='span'
                
                marginLeft='0.5rem'
                marginBottom='0.1rem'
              >
                CREATE NEW GROUP
              </Text>
            </motion.div>
          </Button>
          :
          <Flex as='div'
            alignItems='flex-start'

            transition="all 200ms"
            width='13rem'
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <Input id='input-name-new-group'
                type='text'
                placeholder=''

                background='whiteAlpha.300'
                fontWeight='medium'
                
                border='0'
                width='8.5rem'
                height='1.9rem'
                marginTop='2px'
                marginBottom='5px'
                marginLeft='5px'

                _focus={{
                  background: 'white',
                  color: 'blue.900'
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <Button type='submit' onClick={() => handleNewTaskGroup()}
                height='2rem'
                width='0.3rem'

                background='transparent'
                color='white'
                fontSize='0.8rem'

                _hover={{
                  background: 'whiteAlpha.200',
                }}
              >
                <FontAwesomeIcon icon='plus'/>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <Button type='submit' onClick={() => setIsClickedButtonNewGroup(false)}
                height='2rem'
                width='0.3rem'

                background='transparent'
                color='white'
                fontSize='0.8rem'

                _hover={{
                  background: 'whiteAlpha.200',
                }}
              >
                <FontAwesomeIcon icon='times'/>
              </Button>
          </motion.div>
        </Flex>
        }
        </Flex>
    </>
  )
}