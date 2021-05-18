import ThemeContainer from '../contexts/theme/ThemeContainer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faCheckSquare, faTrash, faCheckCircle, faPlus, faListAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { Box, Grid, Text } from '@chakra-ui/layout'
import { GroupAndTaskListProvider } from '../contexts/GroupAndTaskListContext'
import { useState } from 'react'


function MyApp({ Component, pageProps }) {
  library.add(
    faCheckSquare, faTrash, faCheckCircle, faCircle, faPlus, faListAlt,
    faTimes, faCheck
  )

  return (
    <ThemeContainer>
      <Grid as='div' height='100vh' background='gray.800'
        templateColumns='0.5fr 2fr'
        templateRows='0.5fr 2.2fr 0.3fr'
        templateAreas="
          'taskGroups content'
          'taskGroups content' 
          'taskGroups content'
        "
      >
        <Component {...pageProps} />
      </Grid>
    </ThemeContainer>
  )
}

export default MyApp
