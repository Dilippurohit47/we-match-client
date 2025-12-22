
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Login from "./Pages/Auth/Login"
import SignUp from "./Pages/Auth/SignUp"
import MainPage from "./Pages/MainPage"
const App = ()=>{

  return <BrowserRouter>
  <Routes>
<Route element={<Homepage />} path="/" />
<Route element={<Login />} path="/login" />
<Route element={<SignUp/>} path="/sign-up" />
<Route element={<MainPage/>} path="/mathcing" />
  </Routes>
  </BrowserRouter>
}

export default App