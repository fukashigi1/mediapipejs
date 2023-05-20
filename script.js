let videoElement;
// Función para solicitar permiso de acceso a la webcam
function requestWebcamPermission() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      videoElement.srcObject = stream;
      mediaStream = stream;
    })
    .catch((error) => {
      console.error('Error al acceder a la webcam:', error);
    });
}

// Función para detener la transmisión de la cámara
function stopWebcamStream() {
  if (mediaStream) {
    const tracks = mediaStream.getTracks();
    tracks.forEach(track => track.stop());
  }
}

// Función principal para inicializar la página
function initializePage() {
  videoElement = document.getElementById('webcam');
  requestWebcamPermission();

  // Event listener para el evento 'beforeunload' (antes de cerrar la ventana)
  window.addEventListener('beforeunload', stopWebcamStream);
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', initializePage);