const express = require('express');
const cors = require('cors');
const app = express();

// Asignación automática del puerto requerida por Render
const PORT = process.env.PORT || 3000;

// Configuración de seguridad y lectura de datos
app.use(cors());
app.use(express.json());

// Base de datos en memoria para almacenar las consultas
let registrosMeteorologicos = [];

// Ruta de diagnóstico para verificar que el servidor funciona en internet
app.get('/', (req, res) => {
    res.send('El servidor meteorológico está activo y funcionando correctamente.');
});

// Ruta POST para recibir y registrar los parámetros geográficos del cliente
app.post('/api/registro-coordenadas', (req, res) => {
    const { latitud, longitud, timestamp } = req.body;

    // Validación básica de parámetros obligatorios
    if (!latitud || !longitud) {
        return res.status(400).json({ error: "Faltan parámetros geográficos requeridos." });
    }

    // Estructura del objeto que se guardará en el historial
    const nuevoRegistro = {
        id: registrosMeteorologicos.length + 1,
        latitud: latitud,
        longitud: longitud,
        creado_el: timestamp || new Date().toISOString()
    };

    registrosMeteorologicos.push(nuevoRegistro);
    console.log(`[Base de Datos] Nuevo registro guardado para coordenadas: ${latitud}, ${longitud}`);

    // Respuesta de éxito en formato JSON para el navegador
    res.status(201).json({
        mensaje: "Coordenadas registradas de manera persistente.",
        id: nuevoRegistro.id
    });
});

// Inicialización del servidor web
app.listen(PORT, () => {
    console.log(`Servidor backend ejecutándose en el puerto ${PORT}`);
});
