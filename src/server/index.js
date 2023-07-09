const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3001;

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is allowed or if it is undefined (usually for server-to-server or curl requests)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      // Reject the request if the origin is not allowed
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const upload = multer({ dest: "uploads/" }).single("file-upload");

// get all saved images
app.get("/images", (req, res) => {
  const options = {
    root: `${path.join(__dirname)}/uploads`,
  };

  fs.readdir("./uploads", (err, files) => {
    if (err) {
      res.send("Error getting images.");
    }
    files.forEach((file) => {
      res.sendFile(file, options);
    });
  });
});

// upload an image
app.post("/file-upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send("Error uploading file. Try again.");
    } else if (err) {
      res.send("Something went wrong.");
    }

    res.redirect("http://localhost:3000");
  });
});
