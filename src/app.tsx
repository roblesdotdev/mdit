import {
  ErrorBoundary,
  LocationProvider,
  Route,
  Router,
  lazy,
} from 'preact-iso'
import { HomePage } from './pages/home'
import { HelmetProvider } from 'react-helmet-async'

const NotFound = lazy(() => import('./pages/not-found'))

export default function App() {
  return (
    <HelmetProvider>
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            <Route path="/" component={HomePage} />
            <Route path="*" component={NotFound} />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
    </HelmetProvider>
  )
}
