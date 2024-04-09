const fetch = require("node-fetch"); // using node-fetch package because fetch is not present in aws enviroment

async function searchHandler(searchQuery, app) {
  try {
    const rawResponse = await fetch(
      // making api request on itunes search api with request query
      `https://itunes.apple.com/search?term=${searchQuery}&entity=podcast`
    );

    const jsonResponse = await rawResponse.json(); // format response as a json object for ease of formatting

    const items = jsonResponse.results.map((item) => ({
      PutRequest: {
        Item: {
          id: { S: item.trackId.toString() }, // DynamoDB requires specifying the type (S for string, N for number, etc.)
          name: { S: item.trackName },
          author: { S: item.artistName },
          logoSrc: { S: item.artworkUrl600 },
          link: { S: item.collectionViewUrl },
        },
      },
    }));

    // Save each item to DynamoDB
    for (const item of items) {
      await fastify.dynamo
        .put({
          TableName: "thmanyahTable",
          Item: item.PutRequest.Item,
        })
        .promise();
    }

    const returnResponse = jsonResponse.results.map((item) => {
      // map every item found in the search to an array of formatted information
      const returnItem = {
        author: item.artistName,
        name: item.trackName,
        id: item.trackId,
        logoSrc: item.artworkUrl600,
        link: item.collectionViewUrl,
      };
      return returnItem;
    });

    console.log(jsonResponse); // log for debugging

    return returnResponse;
  } catch (error) {
    // if it fails we throw an error
    console.error(error);
    throw new Error("Failed to fetch data from iTunes Search API");
  }
}

module.exports = searchHandler;
