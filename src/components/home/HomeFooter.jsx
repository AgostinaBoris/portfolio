import React from "react";

export default function HomeFooter() {
  return (
    <footer
      id="site-footer"
      className="flex items-center justify-between border-t border-border px-4 py-6 md:px-6 text-[15px]"
    >
      <p>© 2026 Agostina Boris</p>
      <a href="#intro" className="hover:underline underline-offset-4">
        Back to top ↑
      </a>
    </footer>
  );
}
