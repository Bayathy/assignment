import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    ignores: ['public/*'],
    react: true,
  },
  {
    rules: {
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },
  ...compat.config({
    extends: ['plugin:@tanstack/eslint-plugin-query/recommended'],
  }),
)
