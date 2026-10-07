const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.html');

  // Check karein ki index.html exist karti hai ya nahi
  if (!fs.existsSync(filePath)) {
    console.log("❌ Error: index.html file folder mein nahi mili!");
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end('<h1 style="color:red">Error: index.html file nahi mili! Check karein file folder mein hai ya nahi.</h1>');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log("❌ File read karne mein error:", err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
    } else {
      console.log("✅ index.html successfully load ho gayi!");
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server live hai: http://localhost:${PORT}`);
});