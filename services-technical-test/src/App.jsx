import { BrowserRouter , Routes, Route } from 'react-router-dom';
import RoomList from './pages/RoomList'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<RoomList />}></Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
