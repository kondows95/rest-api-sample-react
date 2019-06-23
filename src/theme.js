import { createMuiTheme } from '@material-ui/core/styles'
import primary from '@material-ui/core/colors/blue'
import secondary from '@material-ui/core/colors/pink'

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: primary,
    secondary: secondary,
  },
})