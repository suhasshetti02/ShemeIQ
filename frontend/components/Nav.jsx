"use client";
import React, { use } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { Link as ScrollLink } from "react-scroll";

const links = [
  { name: "home", path: "/" }, 
  { name: "resume", path: "resume" }, 
] 
const Nav = () => {
    const pathname = usePathname();
    console.log(pathname);
  return (
    <nav className="flex gap-8 dark:text-white dark:bg-gray-900 text-black">
      {links.map((link, index) =>
        link.name === "resume"  ? (
          <ScrollLink
            key={index}
            to={link.path}
            smooth={true}
            duration={1000}
            offset={-20} // adjust if you have a fixed header
            className="capitalize font-medium cursor-pointer hover:text-accent transition-all"
            activeClass="text-accent border-b-2 border-accent"
          >
            {link.name}
          </ScrollLink>
        ) : (
          <Link
            key={index}
            href={link.path}
            className="capitalize font-medium hover:text-accent transition-all"
          >
            {link.name}
          </Link>
        )
      )}
    </nav>
  )
}

export default Nav