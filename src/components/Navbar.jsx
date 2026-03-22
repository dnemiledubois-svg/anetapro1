
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-center items-center py-6 bg-black/40 backdrop-blur-md text-white">

      {/* 🔹 Título visible */}
      
<p className="text-2xl md:text-3xl tracking-[0.15em] font-light font-serif normal-case">
  Página en construcción
</p>





      {/* 🔹 Links ocultos (se mantienen en el DOM) */}
      <div className="hidden gap-8">
        <Link to="/">Home</Link>
        <Link to="/artistas">Artistas</Link>
        <Link to="/estudio">Estudio</Link>
        <Link to="/portafolio">Portafolio</Link>
        <Link to="/contacto">Contacto</Link>
      </div>

    </nav>
  );
}

