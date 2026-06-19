import React from 'react';
import './PaginaInicial.css';
import { FaCheckCircle, FaClock, FaRunning } from 'react-icons/fa';

function PaginaInicial({alNavegararInicioSesion, alNavegararRegistro}) {
    return (
        
        
        <div className="contenedor-landing">
            {/* 1. ENCABEZADO (NAVBAR) */}
            <header className="barra-navegacion">
                <div className="logotipo">

                    <span className="texto-logo">CECyT<span className="resalte-
logo">-Eats</span></span>

                </div>
                <nav className="botones-navegacion">
                    <button className="btn-entrar" onClick={alNavegararInicioSesion}>
Entrar
</button>
<button className="btn-registrarme" onClick={alNavegararRegistro}>
Registrarme
</button>
                </nav>
            </header>
            {/* 2. SECCIÓN HERO */}
            <h1></h1>
            <section className="seccion-hero">
                <div className="capa-oscura">
                    <div className="contenido-hero">
                        <h1>¡Tu comida escolar sin filas y a tiempo!</h1>
                        <p>Explora el menú de la cafetería y ordena desde tu
                            celular.</p>
                      </div>
                </div>
            </section>
            {/* 3. SECCIÓN INFORMATIVA */}
            <section className="seccion-informativa">
                <h2>¿Por qué usar CECyT-Eats?</h2>
                <div className="cuadricula-info">
                    <div className="tarjeta-info">
                        <FaCheckCircle className="icono-info" />
                        <h3>Fácil</h3>
                        <p>Selecciona tus platillos favoritos en un par de clics.</p>
                    </div>
                    <div className="tarjeta-info">
                        <FaClock className="icono-info" />
                        <h3>Rápido</h3>
                        <p>Tu orden se prepara de inmediato para evitar retrasos.</p>

                    </div>
                    <div className="tarjeta-info">
                        <FaRunning className="icono-info" />
                        <h3>Sin Filas</h3>
                        <p>Llega directo a la ventanilla a recoger tu comida.</p>
                    </div>
                </div>
            </section>
            {/* 4. PIE DE PÁGINA (FOOTER) */}
            <footer className="pie-pagina">
                <div className="contenido-pie">
                    <p>&copy; 2026 CECyT-Eats. Todos los derechos reservados.</p>
                    <div className="enlaces-pie">
                        <a href="#privacidad">Aviso de Privacidad</a>
                        <a href="#redes">Redes Sociales </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default PaginaInicial;