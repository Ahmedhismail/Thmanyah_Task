async function searchHandler() {
  const resp = await fetch(
    "https://itunes.apple.com/search?term=Joe+Rogan&limit=2"
  );
  console.log(await resp.json());
}
searchHandler();
// const resp = ;
