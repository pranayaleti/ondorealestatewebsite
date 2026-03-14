const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('button[aria-label="Toggle menu"]', { timeout: 5000 });

    const button = page.locator('button[aria-label="Toggle menu"]').first();
    console.log('Hamburger button found:', (await button.count()) > 0);

    if ((await button.count()) > 0) {
      const ariaExpanded = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Toggle menu"]');
        return btn ? btn.getAttribute('aria-expanded') : null;
      });
      console.log('Initial aria-expanded:', ariaExpanded);

      await button.click();
      await page.waitForTimeout(1000);

      const ariaExpandedAfter = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Toggle menu"]');
        return btn ? btn.getAttribute('aria-expanded') : null;
      });
      console.log('aria-expanded after click:', ariaExpandedAfter);

      const menuVisible = await page.evaluate(() => {
        const menu = document.querySelector('div[ref]');
        return menu && menu.style.display !== 'none' && menu.offsetHeight > 0;
      });
      console.log('Mobile menu visible:', menuVisible);

      const logs = await page.evaluate(() => {
        return window.consoleErrors || [];
      });
      if (logs.length > 0) {
        console.log('Console errors:', logs);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
