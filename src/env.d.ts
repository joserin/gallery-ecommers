/// <reference types="astro/client" />

interface Product {
  codigo: string;
  codigo_oem: string;
  nombre: string;
  categoria: string;
  precio: number;
  imagen_url: string;
}

interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface NavActionProps {
  onSearch: () => void;
  onFilter: () => void;
}