//import './App.css'
import 'crudashx/dist/index.css'
import { createDataProvider, createResourceDataProvider, CrudashxAdmin, Resource } from 'crudashx'
import { userViewConfig } from './crudashx/configs/users'
import { postViewConfig } from './crudashx/configs/posts'


function App() {

  const dataProvider = createDataProvider("https://jsonplaceholder.typicode.com")
  const usersProvider = createResourceDataProvider("https://jsonplaceholder.typicode.com","/users")
  const postsProvider = createResourceDataProvider("https://jsonplaceholder.typicode.com","/posts")

  return (
    <CrudashxAdmin title='Crudashx' dataProvider={dataProvider} >
        <Resource name='users' title='Utilisateurs' config={userViewConfig}/>
        <Resource name='posts' title='Publications' config={postViewConfig}/>
    </CrudashxAdmin>

  )
}

export default App
