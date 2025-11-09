// Define la fecha y hora final de la cuenta regresiva: 07-02-2026 a las 21:00:00
    // NOTA: Los meses en JavaScript van de 0 (Enero) a 11 (Diciembre). Febrero es el mes 1.
    const finalDate = new Date("Feb 7, 2026 21:00:00").getTime();

    // Función que actualiza el contador cada segundo
    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = finalDate - now;
        
        // CÁLCULOS PARA DÍAS, HORAS, MINUTOS Y SEGUNDOS
        const days = Math.floor(distance / (1000 * 60 * 60 * 24)); // Días restantes
        // Se utiliza el módulo (resto) de la división por días para calcular las horas
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); 
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Función para agregar un '0' inicial si el número es menor a 10
        const formatTime = (time) => time < 10 ? "0" + time : time;
        
        // Actualiza los elementos HTML
        document.getElementById("days").innerHTML = days; // Los días no necesitan '0' inicial a menos que sean 0-9
        document.getElementById("hours").innerHTML = formatTime(hours);
        document.getElementById("minutes").innerHTML = formatTime(minutes);
        document.getElementById("seconds").innerHTML = formatTime(seconds);
        
        // Comprueba si la cuenta regresiva ha terminado
        if (distance < 0) {
            clearInterval(updateCountdown);
            document.getElementById("countdown-timer").innerHTML = "<p class='text-2xl text-pink-400'>¡LLEGÓ EL DÍA!</p>";
        }
    }, 1000); // Se actualiza cada 1 segundo




     // 1. Crea el elemento de audio y establece la ruta
    const audio = new Audio('./sound/Kool-&-The-Gang-Get-Down-On-It.mp3'); 
    
    // Configura el audio para que se repita (opcional)
    audio.loop = true; 

    // Obtiene el botón y los íconos
    const musicButton = document.getElementById('music-button');
    const musicIcon = document.getElementById('music-icon');
    const pauseIcon = document.getElementById('pause-icon');

    // Variable de estado
    let isPlaying = false;

    // 2. Define la función para alternar la reproducción y los íconos
    function toggleMusic() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            // Muestra el ícono de Música y oculta el de Pausa
            musicIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            console.log('Música pausada.');
        } else {
            // Se usa .play() que devuelve una promesa. .catch evita errores si el navegador bloquea la reproducción automática.
            audio.play().catch(error => {
                console.error("La reproducción de audio fue bloqueada por el navegador.", error);
                alert("Para escuchar la música, haz clic nuevamente. El navegador bloqueó la reproducción automática.");
            });
            isPlaying = true;
            // Muestra el ícono de Pausa y oculta el de Música
            musicIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            console.log('Música en reproducción.');
        }
    }

    // 3. Asigna la función al evento 'click' del botón
    musicButton.addEventListener('click', toggleMusic);
    
    // BONUS: Resetear el ícono si el audio termina por alguna razón (aunque esté en loop)
    audio.addEventListener('ended', () => {
        isPlaying = false;
        musicIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    });