import axios from "axios";
import { saveAs } from "file-saver";
import crypto from "crypto-js";

function arrayBufferToBlob(arrayBuffer) {
  return new Blob([arrayBuffer], { type: "image/png" });
}

// TODO: write comments about what code is doing to solidify understanding
document.addEventListener("DOMContentLoaded", function () {
  const loadBtn = document.getElementById("load-btn");
  const textInput = document.getElementById("text-input");

  loadBtn.addEventListener("click", async () => {
    const imageName = textInput.value;
    const image = await axios.get(`http://localhost:3001/images/${imageName}`, {
      responseType: "arraybuffer",
    });
    const blob = arrayBufferToBlob(image.data);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = imageName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
