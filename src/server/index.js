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

// TODO: look for a way to view file data being passed in req to validate it looks right at time of save
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    cb(null, originalname);
  },
});

const upload = multer({ storage }).single("file-upload");

// upload an image
app.post("/file-upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send("Error uploading file. Try again.");
      return;
    } else if (err) {
      console.log("Error: ", err);
      res.send("Something went wrong.");
      return;
    }
    res.redirect("http://localhost:3000");
  });
});

app.get("/images/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "uploads", filename);
  res.setHeader("Content-Type", "image/png");
  fs.createReadStream(imagePath).pipe(res);
});
