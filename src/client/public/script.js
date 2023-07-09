import axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
  const loadBtn = document.getElementById("load-btn");
  loadBtn.addEventListener("click", async () => {
    const images = await axios.get("http://localhost:3001/images");
    console.log("!!!!: ", images);
    const imagesContainer = document.getElementById("images");
    const imageNode = document.createElement("image");
    imageNode.setAttribute("src", images.data);
    imagesContainer.appendChild(imageNode);
  });
});
