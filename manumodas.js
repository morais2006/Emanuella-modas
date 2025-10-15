import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Vestido Floral', price: 129.9, category: 'Feminino', sizes: ['P','M','G'], colors: ['Azul','Branco'], img: 'https://via.placeholder.com/420x560?text=Vestido+Floral' },
  { id: 2, name: 'Camisa Social', price: 89.9, category: 'Masculino', sizes: ['M','G','GG'], colors: ['Branco','Cinza'], img: 'https://via.placeholder.com/420x560?text=Camisa+Social' },
  { id: 3, name: 'Calça Jeans', price: 149.9, category: 'Masculino', sizes: ['M','G'], colors: ['Azul'], img: 'https://via.placeholder.com/420x560?text=Calca+Jeans' },
  { id: 4, name: 'Blusa de Tricô', price: 79.9, category: 'Feminino', sizes: ['P','M','G'], colors: ['Branco','Azul'], img: 'https://via.placeholder.com/420x560?text=Blusa+Trico' },
  { id: 5, name: 'Bolsa Tiracolo', price: 199.0, category: 'Acessórios', sizes: [], colors: ['Marrom','Branco'], img: 'https://via.placeholder.com/420x560?text=Bolsa+Tiracolo' },
  { id: 6, name: 'Tênis Casual', price: 219.9, category: 'Masculino', sizes: ['40','41','42'], colors: ['Branco'], img: 'https://via.placeholder.com/420x560?text=Tenis+Casual' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ['Todos','Feminino','Masculino','Acessórios'];

  const filtered = PRODUCTS.filter(p => {
    if (category !== 'Todos' && p.category !== category) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (minPrice && p.price < parseFloat(minPrice)) return false;
    if (maxPrice && p.price > parseFloat(maxPrice)) return false;
    return true;
  });

  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  }

  function updateQty(id, delta) {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    );
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[color:var(--brand)] flex items-center justify-center shadow-sm" style={{backgroundColor: '#1E90FF'}}>
              <span className="text-white font-bold">EM</span>
            </div>
            <div>
              <h1 className="text-xl font-extralight leading-tight">Emanuella <span className="font-semibold">Modas</span></h1>
              <p className="text-xs text-gray-500">Moda com elegância</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar produtos..."
              className="hidden md:inline-block border rounded-full px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

            <button className="hidden md:inline-block text-sm px-3 py-2 rounded-full">Entrar</button>
            <button onClick={() => setIsCartOpen(true)} className="relative bg-blue-600 text-white px-3 py-2 rounded-full shadow-sm">
              Carrinho
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold shadow">{cart.length}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-gradient-to-r from-blue-50 to-white rounded-lg p-8 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold" style={{color: '#1E90FF'}}>Coleção Primavera • 2025</h2>
            <p className="mt-3 text-gray-600">Peças selecionadas com cortes elegantes e materiais de alta qualidade. Frete grátis acima de R$ 199,00.</p>
            <div className="mt-6 flex gap-4">
              <button className="px-5 py-3 rounded-full bg-[#1E90FF] text-white shadow">Ver Coleção</button>
              <button className="px-5 py-3 rounded-full border border-gray-200">Mais Vendidos</button>
            </div>
          </div>

          <div className="bg-[#F5F5F5] rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-medium">Promoção</h3>
              <p className="text-sm text-gray-600 mt-2">Até 30% off em peças selecionadas — por tempo limitado.</p>
            </div>
            <img src="https://via.placeholder.com/360x260?text=Promo" alt="promo" className="mt-4 rounded-md" />
          </div>
        </section>

        {/* Filters & Sections */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1 bg-white border rounded-lg p-4 shadow-sm">
            <h4 className="font-semibold">Filtrar</h4>

            <div className="mt-4">
              <label className="text-sm font-medium">Categoria</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="mt-2 w-full rounded-md border px-3 py-2 text-sm">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Preço</label>
              <div className="flex gap-2 mt-2">
                <input placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-1/2 rounded-md border px-2 py-2 text-sm" />
                <input placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-1/2 rounded-md border px-2 py-2 text-sm" />
              </div>
            </div>

            <div className="mt-4">
              <button onClick={() => { setMinPrice(''); setMaxPrice(''); setCategory('Todos'); setQuery(''); }} className="text-sm text-blue-600">Limpar filtros</button>
            </div>

            <div className="mt-6">
              <h5 className="font-medium text-sm">Novidades</h5>
              <ul className="mt-2 text-sm text-gray-600">
                <li>- Vestidos com novos cortes</li>
                <li>- Linha de acessórios premium</li>
                <li>- Novas estampas e cores</li>
              </ul>
            </div>
          </aside>

          <div className="md:col-span-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Produtos</h3>
              <div className="text-sm text-gray-600">Mostrando {filtered.length} itens</div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(product => (
                <article key={product.id} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                  <img src={product.img} alt={product.name} className="w-full h-56 object-cover" />
                  <div className="p-4">
                    <h4 className="font-medium text-lg">{product.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <div className="text-blue-600 font-semibold">R$ {product.price.toFixed(2).replace('.',',')}</div>
                        <div className="text-xs text-gray-500">Tamanhos: {product.sizes.join(', ') || 'Único'}</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => addToCart(product)} className="px-3 py-2 rounded-full bg-[#1E90FF] text-white text-sm">Adicionar</button>
                        <button className="px-3 py-2 rounded-full border text-sm">Detalhes</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination placeholder */}
            <div className="mt-6 flex items-center justify-center">
              <button className="px-4 py-2 rounded-l-md border">◀</button>
              <div className="px-6 py-2 border-t border-b">1</div>
              <button className="px-4 py-2 rounded-r-md border">▶</button>
            </div>
          </div>
        </section>

      </main>

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
        <div className="h-full bg-white shadow-lg border-l">
          <div className="p-4 flex items-center justify-between border-b">
            <h4 className="font-semibold">Seu Carrinho</h4>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500">Fechar</button>
          </div>

          <div className="p-4 h-[70%] overflow-auto">
            {cart.length === 0 ? (
              <div className="text-gray-500">Carrinho vazio. Adicione produtos!</div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-3 border-b">
                  <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">R$ {item.price.toFixed(2).replace('.',',')}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 border rounded">-</button>
                      <div className="px-3 py-1 border rounded">{item.qty}</div>
                      <button onClick={() => updateQty(item.id, +1)} className="px-2 py-1 border rounded">+</button>
                      <button onClick={() => removeItem(item.id)} className="ml-4 text-sm text-red-500">Remover</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-500">Subtotal</div>
              <div className="font-semibold">R$ {subtotal.toFixed(2).replace('.',',')}</div>
            </div>
            <button className="w-full py-3 rounded-full bg-[#1E90FF] text-white">Finalizar compra</button>
            <button onClick={() => { setCart([]); setIsCartOpen(false); }} className="w-full mt-3 py-3 rounded-full border">Limpar carrinho</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-semibold">Emanuella Modas</h5>
            <p className="text-sm text-gray-600 mt-2">Moda, estilo e confiança — peças selecionadas para você.</p>
          </div>

          <div>
            <h6 className="font-medium">Contato</h6>
            <p className="text-sm text-gray-600 mt-2">contato@emanuellamodas.com</p>
            <p className="text-sm text-gray-600">(99) 99450-48459</p>
          </div>

          <div>
            <h6 className="font-medium">Siga-nos</h6>
            <div className="flex gap-3 mt-2">
              <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm">IG</div>
              <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm">FB</div>
              <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm">WA</div>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 py-4">© {new Date().getFullYear()} Emanuella Modas — Política de Privacidade</div>
      </footer>
    </div>
  );
}
