
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react'
import { GroupAndTaskListContext } from '../contexts/GroupAndTaskListContext'


export default function GroupTaskList() {

  const {
    taskGroupsList,
    createNewTaskGroup,
    removeTaskGroup,
    selectTaskGroup,
  } = useContext(GroupAndTaskListContext)

  const [clickedInButtonNewGroup, setClickedInButtonNewGroup] = useState(false)

  function handleNewTaskGroup() {
    const inputNameGroup = document.querySelector('#input-name-new-group') as HTMLInputElement

    if (inputNameGroup.value === '') {
      // Gerar erro
      return
    }

    createNewTaskGroup(inputNameGroup.value)
    inputNameGroup.value = ''
    setClickedInButtonNewGroup(false)
    // Não houve erro
  }

  function hanldeRemoveTaskGroup(indexTaskGroup: number) {
    removeTaskGroup(indexTaskGroup)
  }

  return (
    <>
      <Flex as='div'
        gridArea='taskGroups'
        direction='column'
        alignItems='center'
      >
        {taskGroupsList.map((group, indexTaskGroup) => (
          group.isSelected ? 
          <Button as='div' key={Number(indexTaskGroup)}
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='space-between'
            width='90%'
            height='4.3rem'

            padding='0.35rem 0.7rem 0.6rem 1.3rem'
            marginBottom='1rem'

            background='gray.600'
            color='white'
            shadow='0px 0px 4px 0px black'
            borderRadius='12px'

            _hover={{
              background: 'whiteAlpha.400',
              cursor: 'pointer'
            }}
          >
            <Flex as='div'
              width='100%'
              alignItems='center'
              justifyContent='space-between'
            >
              <Text as='span'
                fontWeight='medium'
              >
                {group.name}
              </Text>

              <Box as='span' onClick={() => hanldeRemoveTaskGroup(indexTaskGroup)}
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
          : 
          <Button as='div' key={Number(indexTaskGroup)} onClick={() => selectTaskGroup(indexTaskGroup, taskGroupsList)}
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='space-between'
            width='90%'
            height='4.3rem'

            padding='0.35rem 0.7rem 0.6rem 1.3rem'
            marginBottom='1rem'

            background='gray.700'
            color='white'
            // shadow='0px 0px 7px 0px black'
            borderRadius='12px'

            _hover={{
              background: 'whiteAlpha.400',
              cursor: 'pointer'
            }}
          >
            <Text as='span'
              textAlign='center'
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
          ))
        }
        {!clickedInButtonNewGroup ?
          <Button onClick={() => setClickedInButtonNewGroup(true)}
            display='flex'
            alignItems='center'
            justifyContent='center'

            background='blue.400'
            color='whiteAlpha.800'
            fontSize='0.9rem'

            width='90%'
            height='2.2rem'

            _hover={{
              background: 'blue.500',
              color: 'whiteAlpha.900'
            }}
          >
            <FontAwesomeIcon icon='plus' />
            <Text as='span'
              
              marginLeft='0.5rem'
              marginBottom='0.1rem'
            >
              CREATE NEW GROUP
            </Text>
          </Button>
          :
          <Flex as='div'
            alignItems='center'
            justifyContent='center'
          >
            <Input id='input-name-new-group'
              type='text'
              placeholder=''

              background='whiteAlpha.300'
              fontWeight='medium'
              
              border='0'
              width='60%'
              marginRight='0.3rem'
              marginTop='5px'
              marginBottom='5px'

              _focus={{
                background: 'white'
              }}
            />
            <Button type='submit' onClick={() => handleNewTaskGroup()}
              background='transparent'
              color='white'

              _hover={{
                background: 'whiteAlpha.200',
              }}
            >
              <FontAwesomeIcon icon='plus'/>
            </Button>
            <Button type='submit' onClick={() => setClickedInButtonNewGroup(false)}
              background='transparent'
              color='white'

              _hover={{
                background: 'whiteAlpha.200',
              }}
            >
              <FontAwesomeIcon icon='times'/>
            </Button>
          </Flex>
        }
        </Flex>
    </>
  )
}