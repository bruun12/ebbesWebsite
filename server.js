import { serve } from 'bun';
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";


const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


serve({
  port: PORT,
  
  fetch(request) {
    const url = new URL(request.url);
    let filePath = path.join(__dirname, "/public", url.pathname);
    
    // If path is root, serve index.html
    if (url.pathname === "/") {
      filePath = path.join(__dirname, "/public/index.html");
    }
    
    // Check if file exists and is not a directory
    try {
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        // Try to serve index.html from directory
        const indexPath = path.join(filePath, "index.html");
        if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
          return new Response(Bun.file(indexPath));
        }
        return new Response("Not Found", { status: 404 });
      }
      
      return new Response(Bun.file(filePath));
      
    } catch (error) {
      return new Response("Not Found", { status: 404 });
    }
  },
});

console.log(`✨ Server started on port ${PORT}`);