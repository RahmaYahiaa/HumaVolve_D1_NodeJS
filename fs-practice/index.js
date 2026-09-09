const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "File.txt");
fs.writeFile(filePath, "Hello, World!", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }
  console.log("File written successfully!");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log("File contents:", data);
    fs.appendFile(filePath, "\nAppended text.", (err) => {
      if (err) {
        console.error("Error appending to file:", err);
        return;
      }
      console.log("Text appended successfully!");
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file after append:", err);
          return;
        }
        console.log("File contents after append:", data);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }
          console.log("File deleted successfully!");
        });
      });
    });
  });
});
