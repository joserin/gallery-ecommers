interface ProductCardProps {
  producto: Product;
}

export function ProductCard({ producto }: ProductCardProps) {
  // Toda la lógica interna de la tarjeta se queda aquí de forma aislada
  const waMessage = encodeURIComponent(
    `Hola, me interesa el repuesto: ${producto.nombre} (Ref: ${producto.codigo})`
  );
  const waLink = `https://wa.me/?text=${waMessage}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Repuesto: ${producto.nombre}`,
          text: `Mira este repuesto que encontré: ${producto.nombre} (Ref: ${producto.codigo})`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error al compartir", err);
      }
    } else {
      alert("Tu navegador no soporta compartir directamente.");
    }
  };
  const fallbackImage = "https://placehold.co/600x800/111111/FFFFFF?text=Sin+Imagen";
  const imageSrc = producto.imagen_url && producto.imagen_url.trim() !== "" 
    ? producto.imagen_url 
    : fallbackImage;

  return (
    <section 
      id={`product-${producto.codigo}`} 
      className="h-screen w-full snap-start relative overflow-hidden"
    >
      {/* Fondo de la imagen */}
      <picture className="absolute inset-0">
        <img 
          alt={producto.nombre} 
          className="h-full w-full object-contain" 
          src={imageSrc}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
      </picture>

      {/* Cabecera superior: Detalles del repuesto */}
      <div className="absolute top-4 left-4 right-4 bg-black/50 backdrop-blur-md p-3 border border-white/10 rounded-xl text-white">
        <h2 className="md:text-xl font-extrabold tracking-tight drop-shadow-sm">
          {producto.nombre.toUpperCase()}
        </h2>
        <div className="flex justify-between flex-wrap gap-2 mt-1">
          <p className="text-xs font-medium text-white/80">
            {producto.categoria} - Ref: {producto.codigo_oem}
          </p>
          <p className="text-xs font-medium text-white/80">
            Marca: {producto.marca} - Modelo: {producto.modelo}
          </p>
        </div>
      </div>

      {/* Etiqueta del Precio lateral */}
      <div className="absolute bottom-36 right-4 border border-white/20 rounded-2xl p-1 w-20 h-fit bg-black/60 backdrop-blur-md flex items-center justify-center shadow-lg">
        <span className="text-xl font-bold text-white/95 drop-shadow-sm">
          ${Number(producto.precio || 0).toFixed(2)}
        </span>
      </div>

      {/* TUS BOTONES COLOCADOS A UN LADO, UNO DEBAJO DEL OTRO */}
      <div className="absolute bottom-40 left-4 flex flex-col gap-4 z-10 w-fit">
        
        {/* Botón WhatsApp */}
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 group rounded-2xl p-1"
        >
          <div className="flex size-12 items-center justify-center rounded-2xl bg-green-400 text-white shadow-lg shadow-green-400/20 group-active:scale-90 transition-transform">
            <svg className="size-6 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
            </svg>
          </div>
          <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Botón Compartir */}
        <button 
          onClick={handleShare}
          className="flex flex-col items-center gap-1 group p-1 rounded-2xl cursor-pointer"
        >
          <picture className="flex size-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white transition-transform group-active:scale-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M8.7 10.7l6.6 -3.4" />
              <path d="M8.7 13.3l6.6 3.4" />
            </svg>
          </picture>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">Compartir</span>
        </button>

      </div>
    </section>
  );
}