const countdown = () => {
    const eventDate = new Date("2026-11-15T00:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
};

setInterval(countdown, 1000);

function toggleMusic() {
    const music = document.getElementById("music");
    const icon = document.getElementById("music-icon")

    // Si la música está en pausa
    if (music.paused) {
        music.play();
        // Cambia el ícono a "sonido"
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
    } else {
        music.pause();
        // Cambia el icono a "silencio"
        icon.classList.remove("fa-pause")
        icon.classList.add("fa-play")
    }

    // Ajuste de volumen
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('music').volume = 0.4;
    })
}

// Funcion para abrir el mapa
function openMap() {
    const lat = 27.95214;
    const lng = -111.04714;
    const locationName = "San+Carlos,+Sonora,+Mexico";

    // Detectar si el dispositivo es iOS
    if (
        navigator.platform.indexOf("iPhone") !== -1 ||
        navigator.platform.indexOf("iPad") !== -1
    ) {
        // Abrir Apple Maps
        window.open(`maps://maps.apple.com/?q=${lat},${lng}`);
    } else {
        // Abrir Google Maps
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${locationName}`)
    }
}

// Ajuste de volumen al cargar y generación de enlaces dinámicos para Google Flights
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('music').volume = 0.4;

    // Función para generar fechas dinámicas para Google Flights
    const weddingDate = new Date("2026-11-15T00:00:00");
    const today = new Date();
    const maxBookingDays = 330; // Aproximadamente 11 meses
    const maxBookingDate = new Date(today.getTime() + maxBookingDays * 24 * 60 * 60 * 1000);
    
    // Si la fecha de la boda ya está dentro del rango reservable, usa 14-17 Nov 2026
    let outboundDate, returnDate;
    if (weddingDate <= maxBookingDate) {
        outboundDate = "2026-11-14";
        returnDate = "2026-11-17";
    } else {
        // Usa la fecha más lejana disponible (hoy + 330 días)
        outboundDate = maxBookingDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        returnDate = new Date(maxBookingDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    }

    // Actualiza los enlaces de Google Flights con orígenes y destinos específicos
    document.getElementById("flight-bog").href = `https://www.google.com/flights?hl=es#flt=BOG.HMO.${outboundDate}*HMO.BOG.${returnDate}`;
    document.getElementById("flight-usa").href = `https://www.google.com/flights?hl=es#flt=MIA.HMO.${outboundDate}*HMO.MIA.${returnDate}`;
    document.getElementById("flight-mex").href = `https://www.google.com/flights?hl=es#flt=MEX.HMO.${outboundDate}*HMO.MEX.${returnDate}`;
    document.getElementById("flight-gdl").href = `https://www.google.com/flights?hl=es#flt=GDL.HMO.${outboundDate}*HMO.GDL.${returnDate}`;
});