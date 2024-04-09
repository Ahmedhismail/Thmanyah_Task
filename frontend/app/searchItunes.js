import Image from "next/image";

export default function ContentList({ content }) {
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
