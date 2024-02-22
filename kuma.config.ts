import { createTheme } from '@kuma-ui/core'

export const theme = createTheme({
  colors: {
    primary: '#462eff',
    secondary: '#fb6b30',
    extra: '#333333',
  },
})

type UserTheme = typeof theme

declare module '@kuma-ui/core' {
  export interface Theme extends UserTheme {}
}

export default theme
