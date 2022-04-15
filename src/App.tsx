import React, { useEffect } from 'react';
import './Styles/css/App.css';
import {MainPage} from "./MainPage";

function App() {
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    useEffect(() => {
        setScreenSize();
    });
    
  return (
    <div className="App">
       <MainPage />
    </div>
  );
}

export default App;
