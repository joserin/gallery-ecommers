import SearchOverlay from './SearchOverlay';
import FiltersOverlay from './FiltersOverlay';
import BottomNav from './BottomNav';
import { useMemo, useState } from 'react';

interface BarActionProps {
  productos: Product[];
}

export function BarAction( {productos} : BarActionProps ) {

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Derive categories from products
  const categories = useMemo(() => {
    const cats = Array.from(new Set(productos.map((p: { category: string; }) => p.category)));
    return cats;
  }, []);
  const brands = useMemo(() => {
    const cats = Array.from(new Set(productos.map((p: { brand: string; }) => p.brand)));
    return cats;
  }, []);
  const models = useMemo(() => {
    const cats = Array.from(new Set(productos.map((p: { model: string; }) => p.model)));
    return cats;
  }, []);

  const applyFilters = (filters: { category: string, brand: string, model: string }) => {
    productos.forEach((producto) => {
      const element = document.getElementById(`product-${producto.id}`);
      if (!element) return;

      // Lógica: Solo un filtro a la vez. 
      // Si el usuario eligió algo en una categoría, ignoramos las demás.
      let isVisible = true;

      if (filters.category) {
        isVisible = producto.category === filters.category;
      } else if (filters.brand) {
        isVisible = producto.brand === filters.brand;
      } else if (filters.model) {
        isVisible = producto.model === filters.model;
      }

      // Aplicamos CSS directamente
      element.style.display = isVisible ? 'block' : 'none';
    });
  };

  return (
    <footer>
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        productos={productos}
      />
      <FiltersOverlay 
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        categories={categories}
        brands={brands}
        models={models}
        onApplyFilters={applyFilters}
      />

      {/* Persistent Navigation */}
      <BottomNav 
        onSearch={() => setIsSearchOpen(true)}
        onFilter={() => setIsFiltersOpen(true)}
      />

      {/* Custom Styles for animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
      
    </footer>
  );
}