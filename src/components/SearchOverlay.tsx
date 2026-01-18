
import { useEffect, useState } from 'react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  productos: Product[];
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, searchTerm, setSearchTerm, productos }) => {
  
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    
    const handler = setTimeout(() => {

      if (searchTerm.trim() === '') {
        setFilteredProducts([]);
      } else {
        const results = productos.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, productos]);

  const handleProductClick = (productId: string | number) => {
    const element = document.getElementById(`product-${productId}`);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onClose();
      setSearchTerm('');
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-center pointer-events-none">
      <div className="w-full max-w-xl bg-black/80 backdrop-blur-md flex flex-col p-6 
        animate-fade-in pointer-events-auto shadow-2xl">
        <section className="flex items-center justify-between mb-5">
          <h3 className="text-white text-2xl font-bold">Buscar en Catalogo</h3>
          <button onClick={onClose} className="text-white">
            <span className="material-symbols-outlined text-xl">Cerrar</span>
          </button>
        </section>
        <section className="relative">
          <input 
            autoFocus
            type="text"
            placeholder="¿Qué estás buscando?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white
             placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </section>
        {/* Lista de Resultados */}
        <section className="mt-5 overflow-y-auto flex-1">
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
            Resultados - ({filteredProducts.length})
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {filteredProducts.map(product => (
              <button
                onClick={() => handleProductClick(product.id)}
                key={product.id} className="flex items-center gap-4 bg-white/10 p-2 rounded-xl">
                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="text-white font-medium">{product.name}</p>
                  <p className="text-white/40 text-sm">{product.category}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchOverlay;
