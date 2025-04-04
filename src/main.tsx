import { render } from 'preact'
import './styles/fonts.css'
import './styles/global.css'
import App from './app.tsx'

const root = document.getElementById('root')

if (root) {
  render(<App />, root)
}
