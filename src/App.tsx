import Home from './components/Home/Home'
import { HomePageProps } from './components/Interface/Props'
import { BackendAPI } from './model/api'

function App() {
  return (
    <Home {... new HomePageProps(new BackendAPI())}></Home>
  )
}

export default App
