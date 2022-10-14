// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

// Pegando classes do index
const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

const setInfo = () => {
  const textList = cartItems.childNodes;
  const infoItems = [];
  textList.forEach((item) => infoItems.push(item.innerText));
  console.log(infoItems[0]);
  saveCartItems(infoItems);
};

const cartItemClickListener = (event) => {
  const li = document.querySelector('.cart__item');
  event.target.remove(li);
  setInfo();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// Trabalhando no requisito 4 => Adicionando ao carrinho de compras
const addToCart = async (id) => {
  const result = await fetchItem(id);
  const criacao = createCartItemElement(result);
  cartItems.appendChild(criacao);
  setInfo();
};

const createCustomElement = (element, className, innerText, id) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', () => addToCart(id));
  }
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', id));

  return section;
};

const loading = () => {
  const charging = document.createElement('h1');
  charging.innerText = 'carregando...';
  charging.classList = 'loading';
  return charging;
};

// Trabalhando no Requisito 2 => Listando os produtos
const productsFetch = async (parametro) => {
  items.appendChild(loading());
  const returned = await fetchProducts(parametro);
  const { results } = returned;
  results.forEach((element) => {
    const criacao = createProductItemElement(element);
    items.appendChild(criacao);
  });
  const getCharging = document.querySelector('.loading');
  items.removeChild(getCharging);
};

// Btn esvaziando carrinho
const cartEmpty = () => { 
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.addEventListener('click', () => {
    cartItems.innerHTML = '';
    setInfo();
  });
};

const getItem = () => {
  const storageItems = getSavedCartItems() || [];
  storageItems.forEach((itemText) => {
    const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = itemText;
  li.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(li);
  });
};

window.onload = () => { 
  productsFetch('computador');
  cartEmpty();
  getItem();
};
