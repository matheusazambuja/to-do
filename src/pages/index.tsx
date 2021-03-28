import { Box, Flex, Grid, Heading, ListItem, UnorderedList } from '@chakra-ui/layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Head from 'next/head'
import GroupTaskList from '../components/GroupTaskList'
import TaskList from '../components/TaskList'
import { GroupAndTaskListProvider } from '../contexts/GroupAndTaskListContext'

export default function Home() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <Head>
        <title>Home - Todo</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: 'easeIn', duration: 0.2 }}
      >
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
      </motion.div>
    </>
  )
}
