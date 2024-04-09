import Head from "next/head";
import SearchBar from "./searchBar";
export default function main() {
  return (
    <div className="min-h-screen bg-dark py-10 px-4">
      <Head>
        <title>Podcast Search Results</title>
      </Head>
      <SearchBar />
    </div>
  );
}
