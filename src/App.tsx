
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Login from "./Pages/Auth/Login"
import SignUp from "./Pages/Auth/SignUp"
import MainPage from "./Pages/MainPage"
import { AuthProvider } from "./AuthContext"
import {ProtectedRoute} from  "./components/ProtectedRoute"
import { PublicRoute } from "./components/PublicRoute"
const App = ()=>{
  return   <AuthProvider>
  <BrowserRouter>
  <Routes>
<Route element={<Homepage />} path="/" />

<Route element={
  <PublicRoute>
  <Login />
  </PublicRoute>
  } path="/login" />
<Route element={<SignUp/>} path="/sign-up" />
<Route element={
  <ProtectedRoute>
  <MainPage/>
  </ProtectedRoute>
  } path="/matching" />
  </Routes>
  </BrowserRouter>
  </AuthProvider>
}

export default App