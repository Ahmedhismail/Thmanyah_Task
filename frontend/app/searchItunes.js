import Image from "next/image";

async function SearchHandler() {
  const response = await fetch(
    `https://h8m6si5pb3.execute-api.us-east-2.amazonaws.com/dev/search?search=فنجان`
  );
  const data = await response.json();
  return data.results; // Access the results property
}

export default async function ContentList() {
  const content = await SearchHandler();

  return (
    <ul>
      {content.map((contentItem, index) => (
        <li
          //   key={contentItem.id}
          className="mb-4 rounded-lg bg-gray-50 p-6 shadow-lg"
          id={index} // Use the index as the key
        >
          <div className="flex items-center space-x-4">
            <Image
              src={contentItem.logoSrc}
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
