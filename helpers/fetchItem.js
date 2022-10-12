const fetchItem = async (ItemID) => {
  try {
    const URL = `https://api.mercadolibre.com/items/${ItemID}`;
    const promisseFetch = await fetch(URL);
    const results = await promisseFetch.json();
    return results;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};
// fetchItem('MLB1615760527').then((el) => console.log(el));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
