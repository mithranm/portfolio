// generate-thumbnail.mjs
import puppeteer from 'puppeteer';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 8888; // Use an uncommon port

async function generateThumbnail() {
  const app = express();
  // Serve the 'public' directory statically
  app.use(express.static(path.join(__dirname, 'public')));
  
  const server = app.listen(PORT, () => {
    console.log(`[Thumbnailer] Server running on http://localhost:${PORT}`);
  });

  console.log('[Thumbnailer] Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set a standard viewport size for consistent screenshots
  await page.setViewport({ width: 1200, height: 800 });

  const targetUrl = `http://localhost:${PORT}/githubissues.html`;
  console.log(`[Thumbnailer] Navigating to ${targetUrl}`);
  
  await page.goto(targetUrl, { waitUntil: 'networkidle0' }); // Wait for all assets to load

  const outputPath = path.join(__dirname, 'public/images/github-issue-analysis.png');
  console.log(`[Thumbnailer] Taking screenshot and saving to ${outputPath}`);
  
  // Take a screenshot of the entire page body
  const bodyHandle = await page.$('body');
  if (bodyHandle) {
    await bodyHandle.screenshot({ path: outputPath });
  } else {
    console.error('[Thumbnailer] Could not find body element to screenshot.');
  }
  await bodyHandle?.dispose();

  console.log('[Thumbnailer] Closing browser and server...');
  await browser.close();
  server.close();
  console.log('[Thumbnailer] Done.');
}

generateThumbnail();