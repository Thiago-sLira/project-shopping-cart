require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se chamada a função fetchItem, fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se ao chamar fetchItem com o argumento "MLB1615760527", a fetch utiliza o EP "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Verifica se o retorno da função fetchItem com argumento "computador" é uma estrutura de dados igual a computadorSearch', async () => {
    const expects = await fetchItem('MLB1615760527');
    expect(expects).toMatchObject(item);
  });
  it('Verifica se ao chamar fetchItem sem argumento, retorna um erro com "You must provide an url"', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});
