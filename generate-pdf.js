const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const launchOptions = {};
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  const htmlPath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Get the full page height
  const bodyHeight = await page.evaluate(() => {
    return document.body.scrollHeight;
  });

  // Set viewport with higher device scale for better quality
  await page.setViewport({
    width: 1200,
    height: bodyHeight,
    deviceScaleFactor: 2
  });

  await page.pdf({
    path: 'october-newsletter.pdf',
    width: '1200px',
    height: `${bodyHeight}px`,
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });

  await browser.close();
  console.log('PDF generated: october-newsletter.pdf');
  console.log(`Page height: ${bodyHeight}px`);
})();
