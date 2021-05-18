import { Grid } from '@chakra-ui/layout'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import GroupTaskList from '../components/GroupTaskList'
import TaskList from '../components/TaskList'
import { GroupAndTaskListProvider, TaskGroup } from '../contexts/GroupAndTaskListContext'

interface HomeProps {
  iat: number
  expiration: number
  taskGroupsList: TaskGroup[]
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Home - Todo</title>
      </Head>

      <GroupAndTaskListProvider 
        iat={props.iat}
        expiration={props.expiration}
        taskGroupsList={props.taskGroupsList}
      >
        <GroupTaskList />
        <TaskList />
      </GroupAndTaskListProvider>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let resultCookies = JSON.parse(JSON.stringify(ctx.req.cookies))

  if (Object.keys(resultCookies).includes('infoTasksUser')) {
    resultCookies = JSON.parse(resultCookies.infoTasksUser)
    return {
      props: {
        taskGroupsList: resultCookies.taskGroupsList ?? {} as TaskGroup[],
        iat: resultCookies.iat,
        expiration: resultCookies.expiration
      }
    }
  } else {
    return {
      props: {} as HomeProps
    }
  }
}