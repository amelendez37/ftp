const path = require("path");

module.exports = {
  entry: "./src/client/public/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "src", "client", "public"),
  },
};
