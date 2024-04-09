import Head from "next/head";
// import ContentList from "./searchItunes";
import SearchBarAndContent from "./searchItunes";
export default function main() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Head>
        <title>Podcast Search Results</title>
      </Head>
      <SearchBarAndContent />
    </div>
  );
}
