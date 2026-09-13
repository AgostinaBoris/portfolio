import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Skills from "./pages/Skills.jsx";
import Work from "./pages/Work.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  useEffect(() => {
    document.title = "Agostina Boris";
    // The browser's own scroll-restoration can otherwise re-apply a stale
    // scroll offset on load/navigation, fighting the hash-anchor scrolling
    // Home manages itself.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/work" element={<Work />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
