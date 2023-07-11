import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Contact from "./components/Contact";



function App() {
  useEffect(() => {
    document.title = "Agostina Boris";
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/about" element={ <About />} />
          <Route path="/skills" element={ <Skills />} />
          <Route path="/work" element={ <Work />} />
          <Route path="/contact" element={ <Contact/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
