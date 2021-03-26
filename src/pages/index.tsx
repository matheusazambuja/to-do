import { Box, Flex, Grid, Heading, ListItem, UnorderedList } from '@chakra-ui/layout'
import Head from 'next/head'
import GroupTaskList from '../components/GroupTaskList'
import TaskList from '../components/TaskList'
import { GroupAndTaskListProvider } from '../contexts/GroupAndTaskListContext'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Todo</title>
      </Head>

      <Grid as='div'
        templateColumns='0.4fr 0.9fr 2.6fr 0.4fr'
        templateRows='0.6fr 0.6fr 2.8fr 0.4fr 0.6fr'
        templateAreas="
          '. . . .'
          '. taskGroups header .'
          '. taskGroups content .'
          '. taskGroups footer .'
          '. . . .'
        "
        height='100vh'

        overflow='auto'

        background='gray.600'
      >

        <GroupAndTaskListProvider>
          <GroupTaskList />
          <TaskList />
        </GroupAndTaskListProvider>

      </Grid>
    </>
  )
}
