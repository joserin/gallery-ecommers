
import React, { useState } from 'react';

interface FiltersOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  brands: string[];
  models: string[];
  onApplyFilters: (filters: { category: string, brand: string, model: string }) => void;
}

const FiltersOverlay: React.FC<FiltersOverlayProps> = ({ isOpen, onClose, categories, brands, models, onApplyFilters}) => {

  const [selCat, setSelCat] = useState('');
  const [selBrand, setSelBrand] = useState('');
  const [selModel, setSelModel] = useState('');

  if (!isOpen) return null;

  // Función para asegurar que solo uno esté activo
  const handleSelectChange = (type: 'cat' | 'brand' | 'model', value: string) => {
    setSelCat(type === 'cat' ? value : '');
    setSelBrand(type === 'brand' ? value : '');
    setSelModel(type === 'model' ? value : '');
  };

  const resetFilters = () => {
    setSelCat('');
    setSelBrand('');
    setSelModel('');
    onApplyFilters({ category: '', brand: '', model: '' });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-100 flex justify-center pointer-events-none">    
      <div className="w-full max-w-xl bg-black/80 backdrop-blur-md flex flex-col p-6 
        animate-fade-in pointer-events-auto shadow-2xl justify-between">
        <header className="flex items-center justify-between mb-8">
          <h3 className="text-white text-2xl font-bold">Filtrar Productos</h3>
          <button onClick={onClose} className="text-white">
            <span className="material-symbols-outlined text-xl">Cerrar</span>
          </button>
        </header>

        <section className="space-y-4">
          <div className='flex flex-col'>
            <label htmlFor="category-select"
              className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
                Categories
            </label>

            <select value={selCat} onChange={(e) => handleSelectChange('cat', e.target.value)}
              className='flex-1 bg-white/5 border border-white/10 rounded-xl p-3
              text-white text-center'>
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={`cat-${cat}-${index}`} value={cat}>{cat}</option>
                ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="brand-select"
              className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
                Brands
            </label>

            <select value={selBrand} onChange={(e) => handleSelectChange('brand', e.target.value)}
              className='flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-center'>
                <option value="">Select a brand</option>
                {brands.map((brand, index) => (
                  <option key={`brand-${brand}-${index}`} value={brand}>{brand}</option>
                ))}
            </select>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="model-select"
              className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
                Models
            </label>

            <select value={selModel} onChange={(e) => handleSelectChange('model', e.target.value)}
              className='flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-center'>
              <option value="">Select a model</option>
              {models.map((model, index) => (
                <option key={`model-${model}-${index}`} value={model}>{model}</option>
              ))}
            </select>
          </div>
        </section>

        <footer className='text-white font-bold text-lg flex flex-row justify-between items-center'>
          <button 
            onClick={() => { onApplyFilters({ category: selCat, brand: selBrand, model: selModel }); onClose(); }}
            className="bg-primary py-4 rounded-2xl "
          >
            Mostrar Resultados
          </button>
          <button onClick={resetFilters} className="material-symbols-outlined">
            Limpiar Filtros
          </button>
        </footer>
      </div>
    </div>
  );
};

export default FiltersOverlay;
