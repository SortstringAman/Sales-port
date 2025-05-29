import './App.css';
import Routing from './Routing/Routing';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Routing />
    </BrowserRouter>
  );
}

export default App;
