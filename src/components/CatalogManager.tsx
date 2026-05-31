import { useState, useMemo, useEffect, useRef } from 'react';
import SearchOverlay from './SearchOverlay';
import FiltersOverlay from './FiltersOverlay';
import BottomNav from './BottomNav';
import {ProductCard} from './ProductCard';


interface CatalogManagerProps {
  productos: Product[];
}

export function CatalogManager({ productos }: CatalogManagerProps) {
  // Estados de modales
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados de filtros aplicados
  const [currentFilters, setCurrentFilters] = useState({ category: '', marca: '', modelo: '' });
  
  // Límite de carga local (Infinite Scroll de Cliente)
  const [visibleCount, setVisibleCount] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Filtrado ultra rápido en memoria cliente (No toca base de datos)
  const filteredProducts = useMemo(() => {
    return productos.filter((producto) => {
      if (currentFilters.category && producto.categoria !== currentFilters.category) return false;
      if (currentFilters.marca && producto.marca !== currentFilters.marca) return false;
      if (currentFilters.modelo && producto.modelo !== currentFilters.modelo) return false;
      return true;
    });
  }, [productos, currentFilters]);

  // 2. Extraer categorías/marcas/modelos únicos para los selectores
  const categories = useMemo(() => Array.from(new Set(productos.map(p => p.categoria))), [productos]);
  const brands = useMemo(() => Array.from(new Set(productos.map(p => p.marca))), [productos]);
  const models = useMemo(() => Array.from(new Set(productos.map(p => p.modelo))), [productos]);

  // 3. Detectar scroll para cargar más nodos al DOM (Infinite Scroll)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Si el usuario se acerca al final del scroll, renderizamos 10 más
      if (scrollHeight - scrollTop <= clientHeight + 300) {
        setVisibleCount((prev) => Math.min(prev + 10, filteredProducts.length));
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [filteredProducts]);

  // Resetear el scroll view al cambiar de filtros
  const applyFilters = (filters: { category: string, marca: string, modelo: string }) => {
    setCurrentFilters(filters);
    setVisibleCount(10); // Reseteamos la vista al principio
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  // Reducimos la lista a renderizar solo los visibles actualmente
  const productsToRender = filteredProducts.slice(0, visibleCount);

  const handleJumpToProduct = (productId: string) => {
    // 1. Encontrar el índice real del producto dentro de la lista actualmente filtrada
    const productIndex = filteredProducts.findIndex(p => p.codigo === productId);
    
    if (productIndex !== -1) {
      // 2. Si el producto está más allá del límite visible actual, expandimos el límite
      if (productIndex >= visibleCount) {
        setVisibleCount(productIndex + 1); // Expandimos lo justo y necesario para que exista en el DOM
      }

      // 3. Le damos un microsegundo a React para que inyecte el HTML al DOM antes de mover la pantalla
      setTimeout(() => {
        const element = document.getElementById(`product-${productId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <>
      {/* Contenedor del Carrusel optimizado */}
      <div 
        ref={containerRef}
        className="snap-container no-scrollbar w-full h-full overflow-y-scroll snap-y snap-mandatory bg-white"
      >
        {productsToRender.map((producto) => (
          <ProductCard key={producto.codigo} producto={producto} />
        ))}
      </div>

      {/* Modales y Navegación */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        productos={productos}
        onJumpToProduct={handleJumpToProduct}
      />
      <FiltersOverlay 
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        categories={categories}
        marcas={brands}
        modelos={models}
        onApplyFilters={applyFilters}
      />
      <BottomNav 
        onSearch={() => setIsSearchOpen(true)}
        onFilter={() => setIsFiltersOpen(true)}
      />
    </>
  );
}