import axios from "axios";
import { saveAs } from "file-saver";

document.addEventListener("DOMContentLoaded", function () {
  const loadBtn = document.getElementById("load-btn");
  const textInput = document.getElementById("text-input");
  const imageName = textInput.value;
  loadBtn.addEventListener("click", async () => {
    const image = await axios.get(`http://localhost:3001/images/${imageName}`);
    const blob = new Blob([image.data], { type: "image/png" }); // figure out why this image data is in wrong format
    saveAs(blob, `${imageName}.png`);
  });
});
