
import React, { useState } from 'react';

interface FiltersOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  marcas: string[];
  modelos: string[];
  onApplyFilters: (filters: { category: string, marca: string, modelo: string }) => void;
}

const FiltersOverlay: React.FC<FiltersOverlayProps> = ({ isOpen, onClose, categories, marcas, modelos, onApplyFilters}) => {

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
    onApplyFilters({ category: '', marca: '', modelo: '' });
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
                Categorias
            </label>
            {categories.length === 0 ? (
              <option value="" className='bg-black'>No hay filtro de categorias disponibles</option>
            ) : (

              <select value={selCat} onChange={(e) => handleSelectChange('cat', e.target.value)}
                className='flex-1 bg-white/5 border border-white/10 rounded-xl p-3
                text-white text-center'>
                  <option className='bg-black' value="">Selecione una categoria</option>
                  {categories.map((cat, index) => (
                    <option className='bg-black'
                      key={`cat-${cat}-${index}`} value={cat}>{cat}</option>
                  ))}
              </select>
            )}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="brand-select"
              className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
                Marca
            </label>
            {marcas.length === 0 ? (
              <option value="" className='bg-black'>No hay filtro de marcas disponibles</option>
            ) : (
              <select value={selBrand} onChange={(e) => handleSelectChange('brand', e.target.value)}
                className='flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-center'>
                  <option value="" className='bg-black'>Selecione una marca</option>
                  {marcas.map((marca, index) => (
                    <option className='bg-black'
                      key={`marca-${marca}-${index}`} value={marca}>{marca}</option>
                  ))}
              </select>
            )}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="model-select"
              className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
                Modelos
            </label>
            {modelos.length === 0 ? (
              <option value="" className='bg-black'>No hay filtro de modelos disponibles</option>
            ) : (
              <select value={selModel} onChange={(e) => handleSelectChange('model', e.target.value)}
                className='flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-center'>
                <option value="" className='bg-black'>Selecione un modelo</option>
                {modelos.map((modelo, index) => (
                  <option className='bg-black'
                    key={`model-${modelo}-${index}`} value={modelo}>{modelo}</option>
                ))}
              </select>
            )}
          </div>
        </section>

        <footer className='text-white font-bold text-lg flex flex-row justify-between items-center'>
          <button 
            onClick={() => { onApplyFilters({ category: selCat, marca: selBrand, modelo: selModel }); onClose(); }}
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
