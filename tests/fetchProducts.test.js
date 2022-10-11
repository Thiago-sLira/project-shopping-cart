require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Verifica se fetchProdutcs é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifica se fetchProducts com o argumento "computador" testa se fetch foi chamada', () => {
    fetchProducts('computador');
    // expect(fetchProducts).toHaveBeenCalledWith('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se ao chamar fetchProducts com o argumento "computador", a fetch utiliza o EP "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Verifica se o retorno da função fetchProducts com argumento "computador" é uma estrutura de dados igual a computadorSearch', async () => {
    const expects = await fetchProducts('computador');
    expect(expects).toMatchObject(computadorSearch);
  });
  it('Verifica se ao chamar fetchProducts sem argumento, retorna um erro com "You must provide an url"', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
