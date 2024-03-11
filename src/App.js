import Home from './pages/home';
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Verify from './pages/Verify';
import NotFound from './Notfoundpage';
import Detail from './pages/[id]'
import 'react-toastify/dist/ReactToastify.css'
import MyBlogs from './pages/myblogs';

function App() {
  console.log(process.env.REACT_APP_API_KEY)
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='detail/:id' element={<Detail />} />
        <Route path='SignIn' element={<SignIn />} />
        <Route path='SignUp' element={<SignUp />} />
        <Route path='Verify' element={<Verify />} />
        <Route path='myblogs' element={<MyBlogs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
