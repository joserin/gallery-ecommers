/// <reference types="astro/client" />

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  model: string;
  // Agrega otros campos que necesites de tu JSON
}

interface NavActionProps {
  onSearch: () => void;
  onFilter: () => void;
}