import axios from "axios";
import { saveAs } from "file-saver";

document.addEventListener("DOMContentLoaded", function () {
  const loadBtn = document.getElementById("load-btn");
  const textInput = document.getElementById("text-input");
  loadBtn.addEventListener("click", async () => {
    const imageName = textInput.value;
    const image = await axios.get(`http://localhost:3001/images/${imageName}`);
    const blob = new Blob([image.data], { type: "image/png" });
    saveAs(blob, `${imageName}`); // figure out why it's in the wrong format and can't be opened
  });
});
