import React, { useState } from 'react';
import './Autenticacion.css';
function InicioSesion({ alCambiarARegistro, alIniciarSesionExitoso }) {

const [correo, setCorreo] = useState('');
const [contrasena, setContrasena] = useState('');
const [error, setError] = useState('');
const manejarInicioSesion = (e) => {
e.preventDefault();
setError('');
if (!correo || !contrasena) {
setError('Por favor, llena todos los campos.');
return;
}
// Buscar en localStorage si el correo y contraseña coinciden
const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios'))
|| [];
const usuarioEncontrado = usuariosExistentes.find(
u => u.correo === correo && u.contrasena === contrasena
);
if (usuarioEncontrado) {
// Guardar la sesión activa
localStorage.setItem('usuarioActivo',
JSON.stringify(usuarioEncontrado));
// Avisar al componente padre que el login fue exitoso
alIniciarSesionExitoso(usuarioEncontrado);
} else {
setError('Correo o contraseña incorrectos.');
}
};
return (
<div className="tarjeta-auth">
<h2>Iniciar Sesión</h2>
<p className="subtitulo-auth">Ingresa a tu panel de CECyT-Eats</p>
<form onSubmit={manejarInicioSesion}>
<div className="grupo-campo">
<label>Correo Electrónico</label>
<input type="email" value={correo}
onChange={(e) => setCorreo(e.target.value)}
placeholder="usuario@correo.com" />
</div>
<div className="grupo-campo">
<label>Contraseña</label>

<input type="password" value={contrasena}
onChange={(e) => setContrasena(e.target.value)}
placeholder="Tu contraseña" />
</div>
<div className="enlaces-ux">
<span className="olvide-contrasena">¿Olvidaste tu
contraseña?</span>
</div>
{error && <p className="mensaje-error">{error}</p>}
<button type="submit" className="btn-auth">Entrar</button>
</form>
<p className="texto-cambio-auth">
¿No tienes cuenta?{" "}
<span onClick={alCambiarARegistro}>Regístrate aquí</span>
</p>
</div>
);
}
export default InicioSesion;