'use client';
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

import Hero from "@/components/Hero";
import UploadPolicy from "@/components/UploadPolicy";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import SearchResults from "@/components/SearchResults"; 
import Header from "@/components/Header";


export default function Home() {
  // By default, UploadPolicy is visible
  const [showUpload, setShowUpload] = useState(true);
  const [showRecommend, setShowRecommend] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUploadClick = () => {
    setShowUpload(true);
    setShowRecommend(false);
  };

  const handleRecommendClick = () => {
    setShowUpload(false);
    setShowRecommend(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-black text-black dark:text-white transition-colors min-h-screen">
     <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
      />

     {searchResults.length === 0 ? (
        <>
      <Hero
        title="Welcome to SchemeIQ"
        description="Discover and understand government schemes easily. Upload policies, get summaries, and personalized recommendations!"
      />

      <div className="flex justify-center items-center">
        <Button variant="outline" className="m-4" onClick={handleUploadClick}>Upload File</Button>
        <Button variant="outline" className="m-4" onClick={handleRecommendClick}>Recommend Scheme</Button>
      </div>

      {/* Conditional rendering */}
      {showUpload && <UploadPolicy />}
      {showRecommend && <Recommendations  />}
      </>
      ):(
        <SearchResults results={searchResults} />
      )

      }
      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-accent text-white shadow-lg hover:bg-accent/80 transition-all duration-300 z-50 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
}
