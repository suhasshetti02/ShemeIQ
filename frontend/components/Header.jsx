"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./ui/MobileNav";
import ThemeToggle from "./ThemeToggle";
import { FiSearch } from "react-icons/fi";
import { TbLanguageHiragana } from 'react-icons/tb';
import axios from "axios";
import api from "./lib/app";

const Header = ({ searchQuery, setSearchQuery, setSearchResults }) => {
  const [language, setLanguage] = useState("EN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const languages = [
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "HI", label: "Hindi", flag: "🇮🇳" },
    { code: "KA", label: "Kannada", flag: "🇮🇳" },
  ];

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <header className="py-4 xl:py-4 top-0 z-50 dark:bg-black text-black bg-opacity-80">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 dark:text-white">
          <span className="font-bold text-xl">SchemeIQ</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-8">
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full p-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <FiSearch
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 cursor-pointer"
                size={20}
                onClick={handleSearch}
              />
            </div>

            {/* Search results dropdown */}
            

            {loading && <p className="text-gray-500 dark:text-gray-400 mt-2">Searching...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <Button variant="outline" className="hidden md:inline-flex">
            <Link href="/signin">Sign In</Link>
          </Button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 cursor-pointer">
            <TbLanguageHiragana size={40} className="dark:text-white"/>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="ml-1 bg-transparent border-none outline-none cursor-pointer text-black dark:text-white"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code} className="dark:bg-gray-800 text-black dark:text-white">
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile nav */}
        <div className="xl:hidden my-1 p-0">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
