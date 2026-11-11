import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HamburgerMenu from "./components/Menu/HamburgerMenu.jsx";
import SiteName from "./components/Menu/SiteName.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import Expertise from "./pages/Expertise.jsx";
import About from "./pages/About.jsx";
import HomeNew from "./pages/HomeNew.jsx";
import Contact from "./pages/Contact.jsx";
import Process from "./pages/Process.jsx";

// /new (temporary new-home skeleton) has its own header and footer.
function ClassicChrome({ children }) {
  const { pathname } = useLocation();
  return pathname === "/new" ? null : children;
}

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
        <ClassicChrome>
          <SiteName />
          <HamburgerMenu />
        </ClassicChrome>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/expertise" element={<Expertise />} />
          {/* Old Skills URL now goes to Expertise. */}
          <Route path="/skills" element={<Navigate to="/expertise" replace />} />
          <Route path="/work" element={<Work />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/new" element={<HomeNew />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
