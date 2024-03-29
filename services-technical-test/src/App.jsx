import { BrowserRouter , Routes, Route } from 'react-router-dom';
import RoomList from './pages/RoomList'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupLogin from './pages/Login';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignupLogin />}></Route>
        <Route exact path="/rooms" element={<RoomList />}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
