import { theme, extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
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
      100: "#f0f1f3",
      300: '#D8D8D8',
      330: '#DCDDE0',
      500: '#2D2D38',
      600: '#29292E',
      700: '#202024',
      900: '#666',
      1000: '#202024'
    },
    blue: {
      ...theme.colors.blue,
      600: '#5965E0',
      620: '#4953B8',
      700: '#3346FF',
      800: '#2E384D',
      900: '#121241',
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