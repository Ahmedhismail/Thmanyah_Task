import Head from "next/head";
import Image from "next/image";

export default function SearchPage() {
  const podcasts = [
    {
      id: 1,
      title: "The Joe Rogan Experience",
      description: "Joe Rogan",
      imageUrl:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/a6/36/c6/a636c689-ad3a-a71c-3486-a5f51ae7a9f5/mza_13284170885507902541.jpg/600x600bb.jpg",
    },
    {
      id: 2,
      title: "Podcast Title 2",
      description: "Description for Podcast 2",
      imageUrl:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/ed/1d/bd/ed1dbd32-343e-54a1-ae7f-7e08842cb07b/mza_13062616068522634290.jpg/600x600bb.jpg",
    },
  ];

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
        <ul>
          {podcasts.map((podcast) => (
            <li
              key={podcast.id}
              className="mb-4 rounded-lg bg-white p-6 shadow-lg"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={podcast.imageUrl}
                  alt={podcast.title}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
                <div>
                  <p className="block text-lg font-medium text-indigo-600 hover:underline">
                    {podcast.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {podcast.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
