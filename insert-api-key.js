const fs = require('fs');
const path = require('path');

// Ruta al archivo index.html
const indexPath = path.join(__dirname, 'index.html');

// Leer el contenido del archivo index.html
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Reemplazar el marcador de posición con la variable de entorno
const apiKey = process.env.TMDB_API_KEY;
indexContent = indexContent.replace('TMDB_API_KEY', apiKey);

// Escribir el contenido actualizado de nuevo en index.html
fs.writeFileSync(indexPath, indexContent);

console.log('Clave API insertada correctamente en index.html');
