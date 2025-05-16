import fs from 'fs';
import path, { dirname } from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

import tweets from './tweets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`📊 Toplam tweet sayısı: ${tweets.length}`);

const filtrePath = path.join(__dirname, 'filtre.json');
const filtre = JSON.parse(fs.readFileSync(filtrePath, 'utf-8'));

const kelimeler = filtre.kelimeler || [];
const likeAltLimit = filtre.like_alt_limit || 0;
const baslangicTarihi = filtre.baslangic_tarihi ? new Date(filtre.baslangic_tarihi) : new Date('1970-01-01');
const bitisTarihi = filtre.bitis_tarihi ? new Date(filtre.bitis_tarihi) : new Date();

const parseTweetDate = (dateStr) => new Date(dateStr);

const uygunTweetler = tweets.filter(tweetObj => {
  const tweet = tweetObj.tweet;
  if (!tweet) return false;

  const text = tweet.full_text || tweet.text || '';
  const likeSayisi = parseInt(tweet.favorite_count) || 0;
  const tweetTarihi = parseTweetDate(tweet.created_at);

  const tarihUygun = tweetTarihi >= baslangicTarihi && tweetTarihi <= bitisTarihi;
  const likeUygun = likeSayisi < likeAltLimit;
  const kelimeUygun = kelimeler.length === 0 || kelimeler.some(kelime => text.toLowerCase().includes(kelime.toLowerCase()));

  const isRT = text.startsWith('RT ');
  if (isRT) return false;

  return tarihUygun && likeUygun && kelimeUygun;
});

console.log(`🔎 Toplam uygun tweet sayısı: ${uygunTweetler.length}`);

if (uygunTweetler.length === 0) {
  console.log('⚠️ Uygun tweet bulunamadı. İşlem sonlandırılıyor.');
  process.exit(0);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForEnter() {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Twitter tarayıcınızda giriş yapıp Enter tuşuna basınız...\n', () => {
      rl.close();
      resolve();
    });
  });
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--start-maximized'],
  });

  const context = await browser.newContext({
    viewport: null
  });

  const page = await context.newPage();

  await page.goto('https://twitter.com/home', { waitUntil: 'networkidle' });

  await waitForEnter();

  for (const tweetObj of uygunTweetler) {
    const tweet = tweetObj.tweet;
    const tweetUrl = `https://twitter.com/rauinks/status/${tweet.id_str}`;

    console.log(`▶️ Açılıyor: ${tweetUrl}`);

    await page.goto(tweetUrl, { waitUntil: 'load', timeout: 60000 });

    try {
      // Tweet article elementini seç (tweetin kendisini kapsayan)
      const tweetElement = await page.locator(`article:has(a[href*="/status/${tweet.id_str}"])`).first();

      // "Daha fazla" (caret) butonuna tıklama
      const moreButton = tweetElement.locator('button[data-testid="caret"]');
      await moreButton.waitFor({ state: 'visible', timeout: 5000 });
      await moreButton.click();

      await sleep(1000);

      // Silme butonlarını al
      const menuItems = await page.locator('div[role="menuitem"]');
      const count = await menuItems.count();

      if (count > 0) {
        await menuItems.first().click();

        const confirmDeleteButton = page.locator('button[data-testid="confirmationSheetConfirm"]');
        await confirmDeleteButton.waitFor({ timeout: 7000 });
        await confirmDeleteButton.click();

        console.log(`✅ Tweet silindi: ${tweetUrl}`);
      } else {
        console.log(`⚠️ Silme butonu bulunamadı: ${tweetUrl}`);
      }

    } catch (error) {
      console.error(`❌ Silme işlemi başarısız: ${tweetUrl}`, error);
    }

    await sleep(2000);
  }

  await browser.close();
  console.log('✅ Tüm uygun tweetler silindi.');
})();
