// scrape.js
const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=61',
  'https://sanand0.github.io/tdsdata/js_table/?seed=62',
  'https://sanand0.github.io/tdsdata/js_table/?seed=63',
  'https://sanand0.github.io/tdsdata/js_table/?seed=64',
  'https://sanand0.github.io/tdsdata/js_table/?seed=65',
  'https://sanand0.github.io/tdsdata/js_table/?seed=66',
  'https://sanand0.github.io/tdsdata/js_table/?seed=67',
  'https://sanand0.github.io/tdsdata/js_table/?seed=68',
  'https://sanand0.github.io/tdsdata/js_table/?seed=69',
  'https://sanand0.github.io/tdsdata/js_table/?seed=70',
];

(async () => {
  // Launch a headless (invisible) browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);

    // Wait until the table actually appears on the page
    // (JS needs time to render it)
    await page.waitForSelector('table');

    // Grab every cell in every table and parse numbers
    const pageSum = await page.evaluate(() => {
      const cells = document.querySelectorAll('table td');
      let sum = 0;
      for (const cell of cells) {
        const val = parseFloat(cell.innerText.trim());
        if (!isNaN(val)) {
          sum += val;
        }
      }
      return sum;
    });

    console.log(`Seed URL: ${url} → Sum: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`Total sum across all pages: ${grandTotal}`);

  await browser.close();
})();
