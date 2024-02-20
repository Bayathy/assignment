import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['public/*'],
  react: true,
}, {
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
  },
})
