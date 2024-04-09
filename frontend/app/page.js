import Head from "next/head";
import ContentList from "./searchItunes";
export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Head>
        <title>Podcast Search Results</title>
      </Head>
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <input
            type="search"
            placeholder="Search for podcasts..."
            className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <ContentList />
      </div>
    </div>
  );
}
