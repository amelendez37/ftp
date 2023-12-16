import axios from "axios";
import { saveAs } from "file-saver";
import crypto from "crypto-js";

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

// TODO: image is rendered properly meaning base64 encoding worked
// Downloading function is not working still though
document.addEventListener("DOMContentLoaded", function () {
  const loadBtn = document.getElementById("load-btn");
  const textInput = document.getElementById("text-input");
  const imagesContainer = document.getElementById("images");

  loadBtn.addEventListener("click", async () => {
    const imageName = textInput.value;
    const image = await axios.get(`http://localhost:3001/images/${imageName}`, {
      responseType: "arraybuffer",
    });
    console.log(image);
    const base64String = arrayBufferToBase64(image.data);
    // const byteArray = crypto.enc.Hex.parse(image.data);
    // const base64String = crypto.enc.Base64.stringify(image.data);
    const baseImage = new Image();
    baseImage.src = "data:image/png;base64," + base64String;
    imagesContainer.appendChild(baseImage);
    // baseImage.src = "data:image/png;base64," + image.data;
    // const canvas = document.createElement("canvas");
    // const context = canvas.getContext("2d");
    // context.drawImage(baseImage, 0, 0);
    // canvas.toBlob(function (blob) {
    //   saveAs(blob, imageName);
    // }, "image/png");
  });
});
