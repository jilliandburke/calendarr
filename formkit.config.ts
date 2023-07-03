import { generateClasses } from '@formkit/themes'
import { genesisIcons } from '@formkit/icons'
import theme from './theme'

const config = {
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(theme),
  },
}

export default config
