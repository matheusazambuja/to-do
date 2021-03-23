import ThemeContainer from '../contexts/theme/ThemeContainer'
import { faCheckSquare, faTrash, faCheckCircle, faCircle, faPlus, faListAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'


function MyApp({ Component, pageProps }) {
  library.add(
    faCheckSquare, faTrash, faCheckCircle, faCircle, faPlus, faListAlt
  )

  return (
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
  )
}

export default MyApp
