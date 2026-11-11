import React from "react";
import { Link } from "react-router-dom";

// Fixed, transparent header. White + mix-blend-difference so it reads on both
// light sections and dark images.
export default function Header({ menuOpen, onToggleMenu }) {
  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 md:px-6 md:py-5 text-[15px] text-white mix-blend-difference"
    >
      <Link to="/" className="hover:underline underline-offset-4">
        agostina.boris
      </Link>
      <div className="flex items-center gap-6">
        {/* Language switch: not wired up yet */}
        <span aria-label="Language (coming soon)">ES / EN</span>
        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-controls="menu"
          className="hover:underline underline-offset-4"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
