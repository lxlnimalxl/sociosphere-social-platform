const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIST_DIR = path.join(__dirname, 'dist');
const OUTPUT_DIR = path.join(__dirname, 'screenshots');
const PORT = 4173;

function startServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
  };

  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url.split('?')[0]);
    if (filePath.endsWith(path.sep) || fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Static server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function run() {
  const server = await startServer();
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // 1. Executive Canvas View (1440x980)
    console.log('Capturing 04-executive-canvas.png...');
    await page.setViewport({ width: 1440, height: 980, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
    
    // Switch to Executive Canvas mode
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(el => el.textContent.includes('Figma Canvas'));
      if (b) b.click();
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04-executive-canvas.png'), fullPage: false });

    // 2. Simulator Mode (540x1060)
    await page.setViewport({ width: 540, height: 1060, deviceScaleFactor: 2 });
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(el => el.textContent.includes('Device Simulator'));
      if (b) b.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Helper to screenshot the phone frame
    async function screenshotPhone(filename) {
      const phone = await page.$('#phone-simulator');
      if (phone) {
        await phone.screenshot({ path: path.join(OUTPUT_DIR, filename) });
      } else {
        await page.screenshot({ path: path.join(OUTPUT_DIR, filename) });
      }
    }

    // 01 - Home Screen
    console.log('Capturing 01-home-screen.png...');
    await screenshotPhone('01-home-screen.png');

    // 02 - Profile Screen
    console.log('Capturing 02-profile-screen.png...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(el => el.textContent.trim() === 'Profile' || el.textContent.trim() === 'profile');
      if (b) b.click();
    });
    await new Promise(r => setTimeout(r, 700));
    await screenshotPhone('02-profile-screen.png');

    // 03 - Chat Room Screen
    console.log('Capturing 03-chat-room.png...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const b = btns.find(el => el.textContent.trim() === 'Chat' || el.textContent.trim() === 'chat');
      if (b) b.click();
    });
    await new Promise(r => setTimeout(r, 700));
    await screenshotPhone('03-chat-room.png');

    // Return to Feed
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const homeBtn = btns.find(el => el.textContent.trim() === 'Feed');
      if (homeBtn) homeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 05 - Create Post Modal
    console.log('Capturing 06-create-post-modal.png...');
    await page.evaluate(() => {
      const btn = document.querySelector('button[title="Create Post"]');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06-create-post-modal.png') });

    // Close create post modal
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));

    // 06 - Story Viewer
    console.log('Capturing 05-story-viewer.png...');
    await page.evaluate(() => {
      const stories = Array.from(document.querySelectorAll('#phone-simulator .group.cursor-pointer'));
      if (stories.length > 1) stories[1].click();
      else if (stories.length > 0) stories[0].click();
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05-story-viewer.png') });

    console.log('All screenshots refreshed successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
