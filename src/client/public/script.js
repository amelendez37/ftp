import axios from "axios";

function arrayBufferToBlob(arrayBuffer) {
  return new Blob([arrayBuffer], { type: "image/png" });
}

document.addEventListener("DOMContentLoaded", function () {
  const loadBtn = document.getElementById("load-btn");
  const textInput = document.getElementById("text-input");

  loadBtn.addEventListener("click", async () => {
    const imageName = textInput.value;
    // get image from server. Keep data as an ArrayBuffer
    const image = await axios.get(`http://localhost:3001/images/${imageName}`, {
      responseType: "arraybuffer",
    });
    const blob = arrayBufferToBlob(image.data);
    // convert blob to object url and programmatically click to download
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = imageName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
