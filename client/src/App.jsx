import Header from './Header.jsx'
import Template from './Template.jsx'
import {Route,Routes} from 'react-router-dom'
import Layout from './Layout.jsx'
import IndexPage from './pages/IndexPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Register from './pages/Register.jsx'
import CreatePost from './pages/CreatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import EditPage from './pages/EditPage.jsx'
import { UserContextProvider } from './UserContext.jsx'
function App() {
  return (
    <>
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={
          <IndexPage/>
          }/>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='register' element={<Register/>}></Route>
          <Route path='/create' element={<CreatePost/>}></Route>
          <Route path='/post/:id' element={<PostPage/>}></Route>
          <Route path='/edit/:id' element={<EditPage/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
    </>
  )
}

export default App
