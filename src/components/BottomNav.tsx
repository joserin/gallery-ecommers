
import React from 'react';

const BottomNav: React.FC<NavActionProps> = ({ onSearch, onFilter }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 nav-glass border-t
     border-gray-200/20 dark:border-white/10 px-6 pb-1 w-52 mx-auto">
      <div className="flex items-center justify-center w-fit mx-auto gap-10 pt-1">
        <button 
          onClick={onSearch}
          className="flex flex-col items-center gap-1 group"
        >
          <picture className='rounded-2xl bg-gray-100 flex size-12 items-center justify-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </picture>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">Buscar</span>
        </button>

        <button 
          onClick={onFilter}
          className="flex flex-col items-center gap-1 group"
        >
          <picture className='flex size-12 items-center justify-center rounded-2xl bg-gray-100'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 6l8 0" />
              <path d="M16 6l4 0" />
              <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 12l2 0" />
              <path d="M10 12l10 0" />
              <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M4 18l11 0" />
              <path d="M19 18l1 0" />
            </svg>
          </picture>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white
           dark:text-gray-400">Filtrar</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
