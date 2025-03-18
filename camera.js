const captureButton = document.getElementById("capture_image")

async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById('videoElement');
      videoElement.srcObject = stream;
    } catch (error) {
      console.error('Error accessing the camera', error);
    }
  }

function captureImage() {
  const videoElement = document.getElementById('videoElement');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  // Set the canvas size to match the video size
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

    // Mirror the video frame on the canvas
    context.save();
    context.scale(-1, 1);
    context.drawImage(videoElement, -canvas.width, 0, canvas.width, canvas.height);
    context.restore();

  // Draw the current frame from the video onto the canvas
  // context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Get the data URL of the image
  const dataUrl = canvas.toDataURL('image/png');

  // Set the src attribute of the img element to display the captured image
  const capturedImage = document.getElementById('capturedImage');
  capturedImage.src = dataUrl;
  window.electronAPI.sendImage(dataUrl); 
  
  new Notification("Image Captured", {
    body: "Image is successfully captured from live video."
  })
  
};

// console.log(window.electronAPI);

window.addEventListener('load', startCamera);
document.getElementById('captureButton').addEventListener('click', captureImage);