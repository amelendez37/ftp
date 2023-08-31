import axios from "axios";
import { saveAs } from "file-saver";
import crypto from "crypto-js";

// todo: find library to accurately convert hex to base64
document.addEventListener("DOMContentLoaded", function () {
  const loadBtn = document.getElementById("load-btn");
  const textInput = document.getElementById("text-input");
  loadBtn.addEventListener("click", async () => {
    const imageName = textInput.value;
    const image = await axios.get(`http://localhost:3001/images/${imageName}`);
    const byteArray = crypto.enc.Hex.parse(image.data);
    const base64String = crypto.enc.Base64.stringify(byteArray);
    const baseImage = new Image();
    baseImage.src = "data:image/png;base64," + base64String;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.drawImage(baseImage, 0, 0);
    canvas.toBlob(function (blob) {
      saveAs(blob, imageName);
    }, "image/png");
  });
});
