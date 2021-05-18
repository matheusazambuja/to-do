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
    width: '16rem',
    height: '5.5rem',
    color: 'white',

    padding: '0.4rem 0.7rem 0.6rem 1.3rem',
    marginBottom: '1.7rem',

    borderRadius: '12px',
  }

  return (
    <Flex as='div' gridArea='taskGroups' overflowY='scroll'
      direction='column' alignItems='center' justifyContent='flex-start'

      filter='brightness(0.94)' background='blackAlpha.400'
      padding='3rem 0'

      css={{
        '::-webkit-scrollbar': {
          width: '0.5rem',
        },
        '::-webkit-scrollbar-track': {
          // background: '#494D4B',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#4D4D57',
          borderRadius: '16px',
        },
      }}
    >
      {taskGroupsList.map((group, indexTaskGroup) => (
        group.isSelected ? 
        <motion.section key={Number(indexTaskGroup)}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 3, y: -3, transition: { duration: 0.2 } }}
        >
          <Button {...buttonTaskGroupsStyle} colorScheme='blue'
            shadow='0px 0px 0.2rem 0px rgba(255, 255, 255, 0.6)'
          >
            <Flex as='div' width='100%' alignItems='center' 
              justifyContent='space-between'
            >
              <Text as='span' fontSize='1.4rem' letterSpacing='0.05rem'
              >
                {group.name}
              </Text>

              <Box as='span' onClick={() => handleRemoveTaskGroup(indexTaskGroup)}
                paddingRight='0.5rem' paddingTop='0.1rem'
              >
                <FontAwesomeIcon icon='times' />
              </Box>
            </Flex>

            <Flex as='span' alignItems='center' justifyContent='space-between'
              marginTop='0.2rem' width='100%'
            >
              <Text as='span' color='whiteAlpha.600' fontSize='0.9rem'>
                {group.tasks.length} Tarefas
              </Text>
              <Text as='span' color='whiteAlpha.600' fontSize='0.9rem'>
                {group.quantityTasksCompleted} Completos
              </Text>
            </Flex>
          </Button> 
        </motion.section>
        : 
        <motion.section key={Number(indexTaskGroup)}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 3, y: -3, transition: { duration: 0.2 } }}
        >
          <Button as='div' onClick={() => selectTaskGroup(indexTaskGroup, taskGroupsList)}
            {...buttonTaskGroupsStyle}

            background='gray.700'
          >
            <Text as='span' fontSize='1.3rem'>
              {group.name}
            </Text>

            <Flex as='span' alignItems='center' justifyContent='space-between'
              marginTop='0.2rem' width='100%'
            >
              <Text as='span' color='whiteAlpha.600' fontSize='0.9rem'
              >
                {group.tasks.length} Tarefas
              </Text>
              <Text as='span' color='whiteAlpha.600' fontSize='0.9rem'
              >
                {group.quantityTasksCompleted} Completos
              </Text>
            </Flex>
          </Button>
        </motion.section>
        ))
      }
      {!isClickedButtonNewGroup ?
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.6 }}
        >
          <Button onClick={() => setIsClickedButtonNewGroup(true)}
            colorScheme='blue' size='md' fontSize='0.9rem'
            marginTop='0.5rem'
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.6 }}
            >
              <FontAwesomeIcon icon='plus' />
              <Text as='span' textTransform='uppercase'
                
                marginLeft='0.5rem' marginBottom='0.1rem'
              >
                Criar novo grupo
              </Text>
            </motion.div>
          </Button>
        </motion.div>
        :
        <Flex as='div' direction='column' alignItems='center' justifyContent='flex-start'
          width='100%' marginTop='0.5rem' padding='0 2rem'
          transition="all 200ms" 
        >
          <Box as='div' display='flex' width='100%' paddingBottom='1rem'
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <Button type='submit' onClick={() => handleNewTaskGroup()}
                size='lg' marginLeft='0.5rem' colorScheme='green'
                fontSize='0.8rem' flex='1 0 50%'
              >
                <FontAwesomeIcon icon='plus'/>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              <Button type='submit' onClick={() => setIsClickedButtonNewGroup(false)}
                size='lg' marginLeft='0.4rem' colorScheme='red'
                fontSize='0.8rem' flex='1 0 50%'

                _hover={{
                  background: 'whiteAlpha.200',
                }}
              >
                <FontAwesomeIcon icon='times'/>
              </Button>
            </motion.div>
          </Box>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
          >
            <Input id='input-name-new-group' type='text' placeholder=''
              onKeyUp={(event) => {
                const keyEnterPressed = event.key === 'Enter'

                if (keyEnterPressed) {
                  handleNewTaskGroup()
                }
              }}

              background='whiteAlpha.300' fontWeight='medium'
              
              border='0' size='md'

              _focus={{
                background: 'white',
                color: 'blue.900'
              }}
            />
          </motion.div>
        </Flex>
      }
      </Flex>
  )
}