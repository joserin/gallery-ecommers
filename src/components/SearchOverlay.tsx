
import { useEffect, useState } from 'react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  productos: Product[];
  onJumpToProduct: (productId: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, searchTerm, setSearchTerm, productos, onJumpToProduct }) => {
  
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    
    const handler = setTimeout(() => {

      if (searchTerm.trim() === '') {
        setFilteredProducts([]);
      } else {
        const results = productos.filter(p => 
          p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, productos]);

  const handleProductClick = (productId: string) => {
    onJumpToProduct(productId); // Le dice al padre: "Oye, renderiza hasta aquí si es necesario"
    onClose();
    setSearchTerm('');
  };
  
  if (!isOpen) return null;
  const fallbackImage = "https://placehold.co/100x100/111111/FFFFFF?text=Sin+Foto";

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
          <div className="grid grid-cols-1 gap-2 justify-center">
            {filteredProducts.map(product => {
              const finalImageSrc = product.imagen_url && product.imagen_url.trim() !== "" 
                ? product.imagen_url 
                : fallbackImage;
              return (
                <button
                  onClick={() => handleProductClick(product.codigo)}
                  key={product.codigo} className="flex items-center gap-4 bg-white/10 p-2 rounded-xl">

                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-900/50 shrink-0 border border-white/10 flex items-center justify-center">
                    <img src={finalImageSrc} alt={product.nombre} loading="lazy"
                      className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-white font-semibold text-sm tracking-wide uppercase line-clamp-1 group-hover:text-primary transition-colors">
                      {product.nombre}
                    </h3>
                    <p className="text-white/50 text-xs mt-0.5 truncate font-medium">
                      {product.categoria} <span className="text-white/20 mx-1">•</span> {product.marca}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchOverlay;
