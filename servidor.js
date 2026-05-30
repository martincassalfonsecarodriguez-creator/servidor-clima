const express = require('express');
const cors = require('cors');
const app = express();

// Puerto dinámico para Render
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Aquí se acumulan los datos temporalmente
let registrosMeteorologicos = [];

// Página de inicio
app.get('/', (req, res) => {
    res.send('El servidor meteorológico está activo. Para ver los datos ve a /api/ver-registros');
});

// NUEVA RUTA (Opción A): Aquí puedes ver la lista de coordenadas desde tu navegador
app.get('/api/ver-registros', (req, res) => {
    // Te devuelve la lista completa de datos en formato limpio
    res.json({
        total_registros: registrosMeteorologicos.length,
        datos: registrosMeteorologicos
    });
});

// Ruta POST para recibir los datos de tu página web
app.post('/api/registro-coordenadas', (req, res) => {
    const { latitud, longitud } = req.body;

    const nuevoRegistro = {
        id: registrosMeteorologicos.length + 1,
        latitud: latitud || 40.4167, // Si falla la red usa la de prueba
        longitud: longitud || -3.7037,
        fecha: new Date().toLocaleString("es-ES", { timeZone: "America/Montevideo" }) // Guarda la hora del registro
    };

    registrosMeteorologicos.push(nuevoRegistro);
    console.log(`[Base de Datos] Guardado: ${nuevoRegistro.latitud}, ${nuevoRegistro.longitud}`);

    res.status(201).json({ mensaje: "Registrado con éxito", id: nuevoRegistro.id });
});

app.listen(PORT, () => {
    console.log(`Servidor activo en el puerto ${PORT}`);
});
