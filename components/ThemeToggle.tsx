"use client";
import { useEffect, useState } from "react";

/** Explicit light/dark choice, remembered per browser. Defaults to the OS setting. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("vc-theme"); } catch { /* private mode */ }
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      setTheme(window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
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
