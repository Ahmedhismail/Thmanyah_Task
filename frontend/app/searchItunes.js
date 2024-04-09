"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function SearchBarAndContent() {
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
        <div className="mb-8">
          <input
            type="search"
            placeholder="Search for podcasts..."
            className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div className="text-black">Debug: {searchTerm}</div>
      <ContentList content={content} /> {/* Updated to use the content state */}
    </div>
  );
}

async function SearchHandler(searchTerm) {
  console.log("Search submitted with term:", searchTerm);
  const response = await fetch(
    `http://localhost:5000/search?search=${encodeURIComponent(searchTerm)}`
  );

  const data = await response.json();
  return data.results; // Access the results property
}

function ContentList({ content }) {
  // Adjusted to accept content as props
  return (
    <ul>
      {content.map((contentItem, index) => (
        <li key={index} className="mb-4 rounded-lg bg-gray-50 p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <Image
              src={contentItem.logoSrc} // Make sure this URL is correct and accessible
              alt={contentItem.name}
              width={200}
              height={200}
              className="rounded-md"
            />
            <div>
              <p className="block text-lg font-medium text-indigo-600">
                {contentItem.name}
              </p>
              <p className="mt-1 text-sm text-gray-600">{contentItem.author}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
