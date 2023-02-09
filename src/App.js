// import logo from './logo.svg';
import './App.css';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path='/addUser' element={<AddUser />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
