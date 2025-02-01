import { Routes } from 'react-router-dom'
import {Route} from 'react-router-dom'
import Home from './Home'
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login'
function App() {
  return (
    <div className='px-4 py-1 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
         </Routes> 
    </div>
  )
}

export default App