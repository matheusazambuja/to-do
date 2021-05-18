import { theme, extendTheme } from '@chakra-ui/react'


export const customTheme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      },

      body: {
        background: 'gray.50'
      },

      'html, body': {
        height: '100%'
      },

      'body, input, textarea, button': {
        font: '500 1rem Inter, sans-serif',
      },

      button: {
        cursor: 'pointer'
      },

      'h1, h2, h3, h4, h5, h6': {
        fontWeight: 600,
        fontFamily: 'Lexend, sans-serif',
        color: 'gray.800'
      },

      h1: {
        fontSize: '2rem'
      },

      h2: {
        fontSize: '1.5rem'
      },

    }
  },
  breakpoints: {
    ...theme.breakpoints
  },
  fontWeights: {
    ...theme.fontWeights,
    normal: 400,
    medium: 600,
    bold: 700
  },
  radii: {
    ...theme.radii
  },
  fontSizes: {
    ...theme.fontSizes
  },
  colors: {
    ...theme.colors,
    gray: {
      ...theme.colors.gray,
      50: '#F7F8FA',
      100: '#E6E8EB',
      200: '#AFB2B1',
      500: '#494D4B',
      600: '#37474F',
      700: '#282A36',
      800: '#24283B',
      830: '#202024',
      850: '#1F2335',
      900: '#121214'
    },
    blue: {
      ...theme.colors.blue,
      600: '#5965E0',
      620: '#4953B8',
      700: '#3346FF',
      800: '#2E384D',
      900: '#1A203C',
    },
    red: {
      ...theme.colors.red,
      600: '#E83F5B',
      610: '#FF2513'
    },
    green: {
      ...theme.colors.green,
      400: '#4CD62B'
    }
  }
})

export default customTheme