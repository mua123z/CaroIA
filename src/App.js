import Home from './page/home';
//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NgvsMay from './page/nguoivsmay';
import MayvsMay from './page/mayvsmay';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='ng-vs-may' element={<NgvsMay/>}></Route>
        <Route path='may-vs-may' element={<MayvsMay/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
