import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 1024 }
  });
  
  await page.goto('http://localhost:5174/');
  await page.waitForTimeout(2000); // Wait for animations

  // Hero section - It's inside a main > div.relative, we can just grab the first main element child or crop it.
  const heroLocator = page.locator('main').first().locator('> div').first();
  await heroLocator.screenshot({ path: 'public/screenshot_hero.png' });

  // Tech Stack
  await page.locator('#stack').screenshot({ path: 'public/screenshot_stack.png' });

  // Experience
  await page.locator('#experience').screenshot({ path: 'public/screenshot_experience.png' });

  // Certifications
  await page.locator('#certifications').screenshot({ path: 'public/screenshot_certifications.png' });

  // Projects
  await page.locator('#work').screenshot({ path: 'public/screenshot_projects.png' });

  // Contact
  await page.locator('#about').screenshot({ path: 'public/screenshot_contact.png' });

  // Project Detail Page
  await page.goto('http://localhost:5174/project/apotek-saddasa');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'public/screenshot_project_detail.png', fullPage: true });

  await browser.close();
  console.log("Screenshots captured successfully.");
})();
