import { Box, Flex, Grid, Heading, ListItem, UnorderedList } from '@chakra-ui/layout'
import Head from 'next/head'
import TaskList from '../components/TaskList'

export default function Home() {
  return (
    <>
      <TaskList />
    </>
  )
}
