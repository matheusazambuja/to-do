import ThemeContainer from '../contexts/theme/ThemeContainer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faCheckSquare, faTrash, faCheckCircle, faPlus, faListAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

function MyApp({ Component, pageProps }) {
  library.add(
    faCheckSquare, faTrash, faCheckCircle, faCircle, faPlus, faListAlt,
    faTimes, faCheck
  )

  return (
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
  )
}

export default MyApp
