import { Route, Routes } from 'react-router'

import Home from './pages/Home'
import Wish from './wish/pages/Wish'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/api/wish" element={<Wish />}/>
      </Routes>
    </div>
  )
}

export default App