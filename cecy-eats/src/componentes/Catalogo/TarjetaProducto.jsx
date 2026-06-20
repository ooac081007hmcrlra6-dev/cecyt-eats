import React from 'react';
function TarjetaProducto({ producto, alAgregarAlCarrito }) {
    // Desestructuramos las propiedades del objeto producto
    const {
        nombre_producto, descripcion,
        precio, stock, estado_disponible, imagen
    } = producto;
    return (
        <div className='tarjeta-producto'>
            {/* Imagen del platillo */}
            <img
                src={imagen}
                alt={nombre_producto}
                className='imagen-producto'
            />
            <div className='cuerpo-tarjeta'>
                <h3 className='nombre-producto'>{nombre_producto}</h3>
                <p className='descripcion-producto'>{descripcion}</p>
                {/* Precio y badge de stock en la misma fila */}
                <div className='fila-precio-stock'>
                    <span className='precio-producto'>
                        ${parseFloat(precio).toFixed(2)}
                    </span>
                    <span className={
                        `etiqueta-stock ${estado_disponible
                            ? 'stock-disponible'
                            : 'stock-agotado'}`
                    }>
                        {estado_disponible ? `✔ Hay (${stock})` : '✖ Agotado'}
                    </span>

                </div>
                {/* Botón desactivado si está agotado */}
                <button
                    className='btn-agregar'
                    onClick={() => alAgregarAlCarrito(producto)}
                    disabled={!estado_disponible}
                >
                    {estado_disponible ? '+ Añadir al carrito' : 'Sin existencias'}
                </button>
            </div>
        </div>
    );
}
export default TarjetaProducto;