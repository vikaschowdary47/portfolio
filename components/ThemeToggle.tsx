"use client";
import { useEffect, useState } from "react";

/** Light is the default for everyone; dark is opt-in and remembered per browser. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("vc-theme"); } catch { /* private mode */ }
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      setTheme("light");
    }
  }, []);

  function flip() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("vc-theme", next); } catch { /* private mode */ }
  }

  return (
    <button
      className="tt"
      type="button"
      onClick={flip}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
    >
      {theme === null ? "◐" : theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
