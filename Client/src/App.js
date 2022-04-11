import Welcome from "./views/Welcome";
import Drawing from "./views/Drawing";
import Guessing from "./views/Guessing";

import {BrowserRouter} from "react-router-dom";
import { Route, Routes} from "react-router";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-center"/>
        <Routes>
          <Route exact path="/" element={<Welcome/>}/>
          <Route path="/draw" element={<Drawing/>}/>
          <Route path="/guess" element={<Guessing/>}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

      {/* <AddPatient/>
      <HomePage/> */}

export default App;