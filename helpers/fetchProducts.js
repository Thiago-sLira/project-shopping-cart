const fetchProducts = async (string) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${string}`;
    const promisseFetch = await fetch(URL);
    const results = await promisseFetch.json();
    return results;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
