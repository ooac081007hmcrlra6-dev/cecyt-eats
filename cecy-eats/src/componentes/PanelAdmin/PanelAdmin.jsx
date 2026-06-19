import React, { useState, useEffect } from 'react';
import TablaOrdenes from './TablaOrdenes';
import FormularioProducto from './FormularioProducto';
import './PanelAdmin.css';
function PanelAdmin({ usuarioActivo, alCerrarSesion }) {
    const [pestanaActiva, setPestanaActiva] = useState('dashboard');
    const [pedidos, setPedidos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [productoEditando, setProductoEditando] = useState(null);
    // Cargar datos del localStorage al montar el panel
    useEffect(() => {
        const p = JSON.parse(localStorage.getItem('pedidos')) || [];
        const r = JSON.parse(localStorage.getItem('productos')) || [];
        setPedidos(p); setProductos(r);
    }, []);
    // ── Métricas para el Dashboard ────────────────────────────────────
    const pedidosPendientes = pedidos.filter(
        p => p.estado_pedido === 'Pendiente'
    ).length;
    const pedidosHoy = pedidos.filter(p => {
        const fecha = new Date(p.fecha_hora);
        const hoy = new Date();
        return fecha.toDateString() === hoy.toDateString();
    }).length;
    const ingresosTotales = pedidos.reduce((acc, p) => acc + p.total, 0);
    const productosAgotados = productos.filter(p =>
        !p.estado_disponible).length;
    // ── CRUD Productos ────────────────────────────────────────────────
    const guardarProducto = (datosProducto) => {
        let lista;
        if (datosProducto.id_producto) {
            // EDITAR: reemplazar el producto existente
            lista = productos.map(p =>
                p.id_producto === datosProducto.id_producto ? datosProducto : p
            );

        } else {
            // CREAR: asignar nuevo ID y agregar
            const nuevoProducto = { ...datosProducto, id_producto: Date.now() };
            lista = [...productos, nuevoProducto];
        }
        setProductos(lista);
        localStorage.setItem('productos', JSON.stringify(lista));
        setProductoEditando(null); // cerrar formulario
    };
    const eliminarProducto = (id_producto) => {
        if (!window.confirm('¿Eliminar este producto del inventario?')) return;
        const lista = productos.filter(p => p.id_producto !== id_producto);
        setProductos(lista);
        localStorage.setItem('productos', JSON.stringify(lista));
    };
    // ── Cambio de estado de pedido ────────────────────────────────────
    const actualizarEstadoPedido = (id_pedido, nuevoEstado) => {
        const lista = pedidos.map(p =>
            p.id_pedido === id_pedido
                ? { ...p, estado_pedido: nuevoEstado }
                : p
        );
        setPedidos(lista);
        localStorage.setItem('pedidos', JSON.stringify(lista));
    };
    return (
        <div className='contenedor-panel'>
            {/* ── BARRA SUPERIOR ── */}
            <header className='header-panel'>
                <span className='titulo-panel'>
                    🍽️ CECyT-Eats — Panel de Administrador
                </span>
                <div className='info-admin'>
                    <span>👤 {usuarioActivo?.nombre}</span>
                    <button className='btn-salir-admin' onClick={alCerrarSesion}>
                        Cerrar Sesión
                    </button>
                </div>
            </header>
            {/* ── NAVEGACIÓN POR PESTAÑAS ── */}
            <nav className='pestanas-panel'>
                {['dashboard', 'ordenes', 'inventario'].map(tab => (

                    <button
                        key={tab}
                        className={`btn-pestana ${pestanaActiva === tab ? 'activa' :
                            ''}`}
                        onClick={() => setPestanaActiva(tab)}
                    >
                        {{
                            dashboard: '📊 Dashboard', ordenes: '📋 Órdenes',
                            inventario: '🥗 Inventario'
                        }[tab]}
                    </button>
                ))}
            </nav>
            <main className='cuerpo-panel'>
                {/* ── PESTAÑA DASHBOARD ── */}
                {pestanaActiva === 'dashboard' && (
                    <section>
                        <h2 className='subtitulo-seccion'>Resumen del Día</h2>
                        <div className='cuadricula-metricas'>
                            <div className='tarjeta-metrica'>
                                <span className='numero-metrica'>{pedidosHoy}</span>
                                <span className='etiqueta-metrica'>Pedidos hoy</span>
                            </div>
                            <div className='tarjeta-metrica alerta'>
                                <span className='numero-metrica'>{pedidosPendientes}</span>
                                <span className='etiqueta-metrica'>Pendientes</span>
                            </div>
                            <div className='tarjeta-metrica'>

                                <span className='numero-
metrica'>${ingresosTotales.toFixed(2)}</span>

                                <span className='etiqueta-metrica'>Ingresos totales</span>
                            </div>
                            <div className='tarjeta-metrica advertencia'>
                                <span className='numero-metrica'>{productosAgotados}</span>
                                <span className='etiqueta-metrica'>Productos
                                    agotados</span>
                            </div>
                        </div>
                    </section>
                )}
                {/* ── PESTAÑA ÓRDENES ── */}
                {pestanaActiva === 'ordenes' && (
                    <TablaOrdenes
                        pedidos={pedidos}
                        alActualizarEstado={actualizarEstadoPedido}
                    />
                )}

                {/* ── PESTAÑA INVENTARIO / CRUD ── */}
                {pestanaActiva === 'inventario' && (
                    <section>
                        <div className='cabecera-inventario'>
                            <h2 className='subtitulo-seccion'>Gestión de Productos</h2>
                            <button
                                className='btn-nuevo-producto'
                                onClick={() => setProductoEditando({})}
                            >
                                + Nuevo producto
                            </button>
                        </div>
                        {productoEditando !== null && (
                            <FormularioProducto
                                productoInicial={productoEditando}
                                alGuardar={guardarProducto}
                                alCancelar={() => setProductoEditando(null)}
                            />
                        )}
                        <table className='tabla-inventario'>
                            <thead>
                                <tr>
                                    <th>ID</th><th>Producto</th><th>Precio</th>
                                    <th>Stock</th><th>Disponible</th><th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map(prod => (
                                    <tr key={prod.id_producto}>
                                        <td>{prod.id_producto}</td>
                                        <td>{prod.nombre_producto}</td>
                                        <td>${parseFloat(prod.precio).toFixed(2)}</td>
                                        <td>{prod.stock}</td>
                                        <td>

                                            <span className={prod.estado_disponible
                                                ? 'badge-disponible' : 'badge-agotado'}>
                                                {prod.estado_disponible ? 'Sí' : 'No'}
                                            </span>
                                        </td>

                                        <td className='celda-acciones'>
                                            <button className='btn-editar'
                                                onClick={() => setProductoEditando(prod)}>

                                                Editar
                                            </button>

                                            <button className='btn-eliminar'

                                                onClick={() => eliminarProducto(prod.id_producto)}>

                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </main>
        </div>
    );
}
export default PanelAdmin;