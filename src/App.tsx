
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Login from "./Pages/Auth/Login"
import SignUp from "./Pages/Auth/SignUp"
import MainPage from "./Pages/MainPage"
import { AuthProvider } from "./AuthContext"
import {ProtectedRoute} from  "./components/ProtectedRoute"
import { PublicRoute } from "./components/PublicRoute"
import SidebarLayout from "./layouts/SidebarLayout"
import Matches from "./Pages/Matches"
import NotFound from "./Pages/NotFound"
import MessagePage from "./Pages/MessagePage"
import MapView from "./Pages/MapView"
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
          <SidebarLayout />
        </ProtectedRoute>
      }>
        <Route path="/matching" element={<MainPage />} />
        <Route path="/matches" element={ <Matches /> } />
        <Route path="/chat-box" element={<MessagePage />} />
        <Route path="/map" element={<MapView  />} />
      </Route>
      <Route path="*" element={<NotFound/>} />
  </Routes>
  </BrowserRouter>
  </AuthProvider>
}

export default App