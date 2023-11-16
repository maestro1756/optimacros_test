const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
  const page = await browser.newPage();

  await page.goto('https://google.com', { waitUntil: 'domcontentloaded' });

  try {
    // Попробуйте добавить задержку перед использованием селектора
    await page.waitForTimeout(2000);

    // Перейти к поисковой форме средствами клавиатуры
    await page.keyboard.press('t');

    // Ввести текст в поисковую форму
    await page.keyboard.type('qa engineering');

    // Нажать Enter
    await page.keyboard.press('Enter');

    // Даем время на загрузку результатов поиска
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 });

    await page.screenshot({ path: 'google_search.png' });
  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    await browser.close();
  }
})();

