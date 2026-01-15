import Headers from './components/headers/Headers'
import Pages from './components/mainpage/Pages'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'
// import Product from './components/mainpage/products/Product'

const App = () => {
  return (
    <DataProvider>
    <Router>
    <div className='app'>
      <Headers/>
      <Pages/>
    </div>
    </Router>
    </DataProvider>
  )
}

export default App
