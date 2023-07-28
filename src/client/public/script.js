import axios from "axios";
import { saveAs } from "file-saver";

document.addEventListener("DOMContentLoaded", function () {
  const loadBtn = document.getElementById("load-btn");
  loadBtn.addEventListener("click", async () => {
    const images = await axios.get("http://localhost:3001/images");
    console.log(images);
    const blob = new Blob([images.data], { type: "image/png" }); // figure out why this image data is in wrong format
    saveAs(blob, `${images.headers["last-modified"]}.png`);
  });
});
