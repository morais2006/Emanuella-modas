const PRODUCTS = [
  { id: 1, name: 'Vestido Floral', price: 129.9, category: 'Feminino', img: 'https://via.placeholder.com/420x560?text=Vestido+Floral' },
  { id: 2, name: 'Camisa Social', price: 89.9, category: 'Masculino', img: 'https://via.placeholder.com/420x560?text=Camisa+Social' },
  { id: 3, name: 'Calça Jeans', price: 149.9, category: 'Masculino', img: 'https://via.placeholder.com/420x560?text=Calca+Jeans' },
  { id: 4, name: 'Blusa de Tricô', price: 79.9, category: 'Feminino', img: 'https://via.placeholder.com/420x560?text=Blusa+Trico' },
  { id: 5, name: 'Bolsa Tiracolo', price: 199.0, category: 'Acessórios', img: 'https://via.placeholder.com/420x560?text=Bolsa+Tiracolo' },
  { id: 6, name: 'Tênis Casual', price: 219.9, category: 'Masculino', img: 'https://via.placeholder.com/420x560?text=Tenis+Casual' },
];

let cart = [];

function renderProducts(list) {
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  list.forEach(prod => {
    const item = document.createElement('div');
    item.className = 'product';
    item.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>${prod.category}</p>
      <strong>R$ ${prod.price.toFixed(2).replace('.', ',')}</strong><br>
      <button onclick="addToCart(${prod.id})">Adicionar</button>
    `;
    container.appendChild(item);
  });
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cart-count').innerText = cart.length;
  alert(`${product.name} adicionado ao carrinho!`);
}

function applyFilters() {
  const category = document.getElementById('category').value;
  const min = parseFloat(document.getElementById('minPrice').value) || 0;
  const max = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  const query = document.getElementById('search').value.toLowerCase();

  const filtered = PRODUCTS.filter(p =>
    (category === 'Todos' || p.category === category) &&
    p.price >= min &&
    p.price <= max &&
    p.name.toLowerCase().includes(query)
  );
  renderProducts(filtered);
}

document.getElementById('clearFilters').addEventListener('click', () => {
  document.getElementById('minPrice').value = '';
  document.getElementById('maxPrice').value = '';
  document.getElementById('category').value = 'Todos';
  document.getElementById('search').value = '';
  renderProducts(PRODUCTS);
});

document.getElementById('search').addEventListener('input', applyFilters);
document.getElementById('category').addEventListener('change', applyFilters);
document.getElementById('minPrice').addEventListener('input', applyFilters);
document.getElementById('maxPrice').addEventListener('input', applyFilters);

renderProducts(PRODUCTS);

