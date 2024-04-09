import Image from "next/image";

export default function ContentList({ content }) {
  return (
    <ul>
      {content.map((contentItem, index) => (
        <a href={contentItem.link}>
          <li
            key={index}
            className="rounded-lg p-4 mb-6 bg-white shadow-lg transition-transform transform duration-500 hover:scale-105"
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
                <b className="block text-lg font-medium text-indigo-800">
                  {contentItem.name}
                </b>
                <p className="mt-1 text-sm text-gray-600">
                  {contentItem.author}
                </p>
              </div>
            </div>
          </li>
        </a>
      ))}
    </ul>
  );
}
