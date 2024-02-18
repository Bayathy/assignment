import { css } from '@kuma-ui/core'

function App() {
  return (
    <div className={css`
      background-color: red;
    `}
    >
      <p className={css`
        color: blue;
      `}
      >
        test
      </p>
      <ul>
        <li>test</li>
      </ul>
    </div>
  )
}

export default App
