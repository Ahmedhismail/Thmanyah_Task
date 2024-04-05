async function searchHandler(searchQeury) {
  try {
    const rawResponse = await fetch(
      `https://itunes.apple.com/search?term=${searchQeury}&entity=podcast` // dont forget to modify limit when finalizing
    );

    const jsonResponse = await rawResponse.json();

    const returnResponse = jsonResponse.results.map((item) => {
      const returnItem = {
        author: item.artistName,
        name: item.trackName,
        logoSrc: item.artworkUrl600,
      };
      return returnItem;
    });

    console.log(jsonResponse); // don't forget to remove this

    return returnResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from iTunes Search API");
  }
}

module.exports = searchHandler;
