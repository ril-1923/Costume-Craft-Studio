import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import App from './App'
import { StoreProvider } from './store'
createRoot(document.getElementById('root')!).render(<HashRouter><StoreProvider><App/></StoreProvider></HashRouter>)
