const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    
    // Wait for the page to load
    await page.waitForSelector('button[aria-label="Toggle menu"]', { timeout: 5000 });
    
    // Check if hamburger button exists
    const button = await page.$('button[aria-label="Toggle menu"]');
    console.log('Hamburger button found:', !!button);
    
    if (button) {
      // Get the current aria-expanded value
      const ariaExpanded = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Toggle menu"]');
        return btn ? btn.getAttribute('aria-expanded') : null;
      });
      console.log('Initial aria-expanded:', ariaExpanded);
      
      // Click the button
      await button.click();
      await page.waitForTimeout(1000);
      
      // Check aria-expanded after click
      const ariaExpandedAfter = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Toggle menu"]');
        return btn ? btn.getAttribute('aria-expanded') : null;
      });
      console.log('aria-expanded after click:', ariaExpandedAfter);
      
      // Check if mobile menu is visible
      const menuVisible = await page.evaluate(() => {
        const menu = document.querySelector('div[ref]');
        return menu && menu.style.display !== 'none' && menu.offsetHeight > 0;
      });
      console.log('Mobile menu visible:', menuVisible);
      
      // Check for any console errors
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
