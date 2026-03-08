const container = document.getElementById('gallery-container');

async function cargarGaleria() {
    try {
        // 1. Efecto visual de carga
        container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Cargando nuevas imágenes...</p>';

        // 2. Llamada a la API
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/photos');
        const datos = await respuesta.json();
        
        // 3. Generar aleatoriedad
        // Elegimos un punto de inicio al azar entre 0 y 4990
        const inicioAleatorio = Math.floor(Math.random() * (datos.length - 10));
        const misFotos = datos.slice(inicioAleatorio, inicioAleatorio + 10);

        // 4. Limpiar contenedor y renderizar
        container.innerHTML = '';

        misFotos.forEach(foto => {
            const cardHtml = `
                <div class="card">
                    <img src="https://picsum.photos/seed/${foto.id}/600/400" 
                         alt="${foto.title}" 
                         loading="lazy">
                    <div class="info">
                        <h3>${foto.title}</h3>
                        <p><strong>ID de Foto:</strong> ${foto.id}</p>
                        <p><strong>Álbum:</strong> ${foto.albumId}</p>
                    </div>
                </div>
            `;
            container.innerHTML += cardHtml;
        });

    } catch (error) {
        console.error("Error al obtener datos:", error);
        container.innerHTML = "<h3>Error de conexión. Inténtalo de nuevo.</h3>";
    }
}

// Cargar la galería por primera vez al abrir la página
cargarGaleria();