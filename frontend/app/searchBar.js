"use client";
import React, { useState, useEffect } from "react";
import ContentList from "./Contentlist";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState([]); // New state to hold fetched content

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // The actual fetch is moved to useEffect
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (searchTerm) {
        const content = await SearchHandler(searchTerm);
        setContent(content); // Update the content state with fetched data
      }
    };

    fetchContent();
  }, [searchTerm]); // This effect depends on searchTerm

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search for podcasts..."
            className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          {searchTerm && <b>Top Podcasts for: {searchTerm} 🎙️!</b>}
        </div>
      </form>
      <ContentList content={content} /> {/* Updated to use the content state */}
    </div>
  );
}

async function SearchHandler(searchTerm) {
  console.log("Search submitted with term:", searchTerm);
  const response = await fetch(
    // `http://localhost:5000/search?search=${encodeURIComponent(searchTerm)}`
    `https://h8m6si5pb3.execute-api.us-east-2.amazonaws.com/dev/search?search=${encodeURIComponent(
      searchTerm
    )}`
  );

  const data = await response.json();
  return data.results; // Access the results property
}
