import Link from "next/link";
import { ME } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <div className="bar">
      <div className="wrap">
        <Link href="/" style={{ textDecoration: "none" }}><b>{ME.name.toUpperCase()}</b></Link>
        <span className="sep hide-sm">/</span>
        <Link href="/#projects" className="hide-sm">Projects</Link>
        <span className="sep hide-sm">/</span>
        <Link href="/#experience" className="hide-sm">Experience</Link>
        <span className="sep hide-sm">/</span>
        <a href={ME.github} target="_blank" rel="noopener noreferrer" className="hide-sm">GitHub</a>
        <span className="sep hide-sm">/</span>
        <a href={ME.linkedin} target="_blank" rel="noopener noreferrer" className="hide-sm">LinkedIn</a>
        <span className="stat"><span className="blip" />OPEN TO WORK</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
