/**
 * Puppeteer 자동 스크린샷 캡처 스크립트
 *
 * 사용법:
 *   1. 로컬 dev 서버 실행: npm run dev
 *   2. 새 터미널에서: node scripts/capture-project-screenshots.mjs
 *
 * 결과:
 *   public/images/projects/portfolio-website/  에 포트폴리오 사이트 캡처
 *   public/images/projects/joodev-blog/        에 JooDev 블로그 캡처
 */

import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMG_BASE = path.join(ROOT, "public/images/projects");

const VIEWPORT = { width: 1440, height: 900 };

// ─── 캡처 대상 정의 ───
const portfolioPages = [
  { name: "01-entry", url: "http://localhost:3000/", waitFor: 2000, description: "진입 페이지" },
  { name: "02-about", url: "http://localhost:3000/portfolio#about", waitFor: 2000, description: "About 섹션" },
  { name: "03-experience", url: "http://localhost:3000/portfolio#experience", waitFor: 2000, description: "경력 섹션" },
  { name: "04-projects", url: "http://localhost:3000/portfolio#projects", waitFor: 2000, description: "프로젝트 섹션" },
  { name: "05-skills", url: "http://localhost:3000/portfolio#skills", waitFor: 2000, description: "기술 스택 섹션" },
  { name: "06-contact", url: "http://localhost:3000/portfolio#contact", waitFor: 2000, description: "Contact 섹션" },
];

const joodevPages = [
  { name: "01-home", url: "https://joodev-sandy.vercel.app/home", waitFor: 3000, description: "블로그 홈" },
  { name: "02-explore", url: "https://joodev-sandy.vercel.app/explore", waitFor: 3000, description: "글 목록 (Explore)" },
  { name: "03-post-techblog", url: "https://joodev-sandy.vercel.app/blog/techblog", waitFor: 4000, description: "블로그 개발 후기 포스트" },
  { name: "04-post-tdd", url: "https://joodev-sandy.vercel.app/blog/tdd", waitFor: 4000, description: "TDD 포스트" },
  { name: "05-post-kafka", url: "https://joodev-sandy.vercel.app/blog/kafka", waitFor: 4000, description: "Kafka 포스트" },
  { name: "06-post-ai-music", url: "https://joodev-sandy.vercel.app/blog/ai", waitFor: 4000, description: "AI 노래 만들기 포스트" },
  { name: "07-post-mcp", url: "https://joodev-sandy.vercel.app/blog/mcp-playwright", waitFor: 4000, description: "MCP Playwright 포스트" },
  { name: "08-post-4layer", url: "https://joodev-sandy.vercel.app/blog/4", waitFor: 4000, description: "4계층 설계 포스트" },
  { name: "09-admin-editor", url: "https://joodev-sandy.vercel.app/admin/posts/new", waitFor: 4000, description: "글 작성 에디터 (Admin)" },
];

async function capturePages(browser, pages, outDir, label) {
  await mkdir(outDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  console.log(`\n📸 ${label} 캡처 시작 (${pages.length}페이지)`);

  for (const entry of pages) {
    const filePath = path.join(outDir, `${entry.name}.png`);
    try {
      console.log(`  → ${entry.description} (${entry.url})`);
      await page.goto(entry.url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, entry.waitFor));

      // 섹션 앵커가 있으면 해당 위치로 스크롤
      const hash = new URL(entry.url).hash;
      if (hash) {
        await page.evaluate((selector) => {
          const el = document.querySelector(selector);
          if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
        }, hash);
        await new Promise((r) => setTimeout(r, 800));
      }

      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`    ✓ ${entry.name}.png 저장 완료`);
    } catch (err) {
      console.error(`    ✗ ${entry.name} 실패: ${err.message}`);
    }
  }

  // 풀페이지 캡처 (전체 스크롤 한 장)
  try {
    const firstUrl = pages[0].url.split("#")[0];
    console.log(`  → 전체 페이지 풀 캡처`);
    await page.goto(firstUrl, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 3000));
    await page.screenshot({
      path: path.join(outDir, "00-fullpage.png"),
      fullPage: true,
    });
    console.log(`    ✓ 00-fullpage.png 저장 완료`);
  } catch (err) {
    console.error(`    ✗ fullpage 실패: ${err.message}`);
  }

  await page.close();
}

async function main() {
  console.log("🚀 Puppeteer 스크린샷 캡처 시작\n");
  console.log(`   뷰포트: ${VIEWPORT.width}x${VIEWPORT.height}`);
  console.log(`   저장 경로: ${IMG_BASE}`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    // 포트폴리오 사이트 (localhost)
    await capturePages(
      browser,
      portfolioPages,
      path.join(IMG_BASE, "portfolio-website"),
      "포트폴리오 웹사이트"
    );

    // JooDev 블로그 (Vercel)
    await capturePages(
      browser,
      joodevPages,
      path.join(IMG_BASE, "joodev-blog"),
      "JooDev 블로그"
    );
  } finally {
    await browser.close();
  }

  console.log("\n✅ 모든 캡처 완료!");
  console.log(`   결과 확인: ls ${IMG_BASE}/portfolio-website/ ${IMG_BASE}/joodev-blog/`);
}

main().catch((err) => {
  console.error("❌ 스크립트 실행 실패:", err);
  process.exit(1);
});
