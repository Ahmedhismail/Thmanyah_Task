const fetch = require("node-fetch");
const DynamoDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamoDB.DocumentClient({
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
      id: item.trackId, // Ensure ID is a string
      logoSrc: item.artworkUrl600,
      link: item.collectionViewUrl,
    }));

    // Save each item to DynamoDB
    for (const item of returnResponse) {
      await documentClient
        .put({
          TableName: "thmanyahTable",
          Item: item,
        })
        .promise();
    }

    return returnResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from iTunes Search API");
  }
}

module.exports = searchHandler;
