// "use client";
// import React, { useState } from "react";
// import ContentList from "./searchItunes";

// function SearchBarAndContent() {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleInputChange = (event) => {
//     const newSearchTerm = event.target.value;
//     setSearchTerm(newSearchTerm);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Trigger the API request by passing the searchTerm to ContentList
//     // You can do this by updating the state or triggering a re-render
//     // For simplicity, let's just log the searchTerm for now
//     console.log("Search submitted with term:", searchTerm);
//   };

//   return (
//     <div className="max-w-xl mx-auto">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-8">
//           <input
//             type="search"
//             placeholder="Search for podcasts..."
//             className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
//             value={searchTerm}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit">Search</button>
//       </form>
//       <div className="text-black">Debug: {searchTerm}</div>
//       <ContentList searchTerm={searchTerm} />
//     </div>
//   );
// }

// export default SearchBarAndContent;
