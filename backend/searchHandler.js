const fetch = require("node-fetch");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const dynamoDBClient = new DynamoDBClient({
  region: "us-east-2",
});

async function searchHandler(searchQuery) {
  try {
    const rawResponse = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        searchQuery
      )}&entity=podcast`
    );
    const jsonResponse = await rawResponse.json();

    const returnResponse = jsonResponse.results.map((item) => ({
      author: item.artistName,
      name: item.trackName,
      id: item.trackId.toString(), // Ensure ID is a string
      logoSrc: item.artworkUrl600,
      link: item.collectionViewUrl,
    }));

    // Save each item to DynamoDB
    for (const item of returnResponse) {
      const input = {
        Item: {
          podcastID: {
            S: item.id,
          },
          author: {
            S: item.author,
          },
          name: {
            S: item.name,
          },
          logoSrc: {
            S: item.logoSrc,
          },
          link: {
            S: item.link,
          },
        },
        TableName: "thmanyahTable",
      };
      await dynamoDBClient.send(new PutItemCommand(input));
    }

    return returnResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from iTunes Search API");
  }
}

module.exports = searchHandler;
