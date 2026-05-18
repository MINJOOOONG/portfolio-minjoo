"use client";

const PROFILE_SRC = "/profile.jpeg";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  1. Lanyard Strap — 검정 직물 스트랩 + 금속 하드웨어
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LanyardStrap() {
  return (
    <div className="relative z-10 flex flex-col items-center">
      {/* ── 직물 스트랩 ── */}
      <div
        className="relative w-[72px] h-[100px] max-[520px]:w-[52px] max-[520px]:h-[72px]"
        style={{
          background:
            "linear-gradient(90deg, #141414 0%, #222 18%, #181818 36%, #252525 54%, #181818 72%, #222 90%, #141414 100%)",
        }}
      >
        {/* 가로 직조 텍스처 */}
        <div className="absolute inset-0 flex flex-col justify-evenly opacity-25">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.35) 50%, transparent 95%)",
              }}
            />
          ))}
        </div>
        {/* 세로 직조 */}
        <div className="absolute inset-0 flex justify-evenly opacity-[0.07]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`v${i}`} className="h-full w-px bg-white" />
          ))}
        </div>
        {/* 양쪽 엣지 그림자 */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-l from-black/50 to-transparent" />
      </div>

      {/* ── U자형 금속 클립 ── */}
      <div className="-mt-[2px] relative w-[88px] h-[44px] max-[520px]:w-[64px] max-[520px]:h-[32px]">
        <svg viewBox="0 0 96 48" className="w-full h-full">
          <defs>
            <linearGradient id="uClip" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0e0e0" />
              <stop offset="25%" stopColor="#a0a0a0" />
              <stop offset="50%" stopColor="#d0d0d0" />
              <stop offset="75%" stopColor="#888" />
              <stop offset="100%" stopColor="#bbb" />
            </linearGradient>
          </defs>
          <path
            d="M14 4 L14 30 Q14 44 28 44 L68 44 Q82 44 82 30 L82 4"
            fill="none"
            stroke="url(#uClip)"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M17 5 L17 29 Q17 40 28 40 L68 40 Q79 40 79 29 L79 5"
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line x1="14" y1="4" x2="82" y2="4" stroke="url(#uClip)" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="16" y1="2" x2="80" y2="2" stroke="white" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── 스위블 커넥터 ── */}
      <div className="-mt-[2px] relative w-[28px] h-[36px] max-[520px]:w-[20px] max-[520px]:h-[26px]">
        <svg viewBox="0 0 32 40" className="w-full h-full">
          <defs>
            <linearGradient id="swivel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#999" />
              <stop offset="30%" stopColor="#ddd" />
              <stop offset="50%" stopColor="#aaa" />
              <stop offset="70%" stopColor="#ccc" />
              <stop offset="100%" stopColor="#888" />
            </linearGradient>
          </defs>
          <rect x="8" y="0" width="16" height="22" rx="3" fill="url(#swivel)" />
          <rect x="9" y="1" width="5" height="20" rx="2" fill="white" opacity="0.25" />
          <line x1="16" y1="3" x2="16" y2="19" stroke="#888" strokeWidth="0.6" />
          <path d="M9 18 L9 30 Q9 38 16 38 Q23 38 23 30 L23 18" fill="none" stroke="url(#swivel)" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M11 18 L11 29 Q11 35 16 35 Q21 35 21 29 L21 18" fill="none" stroke="white" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── 원형 링 ── */}
      <div className="-mt-[2px] relative w-[48px] h-[48px] max-[520px]:w-[36px] max-[520px]:h-[36px]">
        <svg viewBox="0 0 56 56" className="w-full h-full">
          <defs>
            <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c8c8c8" />
              <stop offset="25%" stopColor="#e8e8e8" />
              <stop offset="50%" stopColor="#a0a0a0" />
              <stop offset="75%" stopColor="#d8d8d8" />
              <stop offset="100%" stopColor="#909090" />
            </linearGradient>
          </defs>
          <circle cx="28" cy="28" r="22" fill="none" stroke="url(#ring)" strokeWidth="5" />
          <circle cx="28" cy="28" r="20.5" fill="none" stroke="white" strokeWidth="1.2" opacity="0.45" />
          <circle cx="28" cy="28" r="18" fill="none" stroke="#777" strokeWidth="0.8" opacity="0.25" />
        </svg>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  2. Plastic Holder — 투명 플라스틱 케이스
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PlasticHolder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative -mt-[6px]">
      {/* 외곽 드롭 섀도우 */}
      <div
        className="relative rounded-[18px] max-[520px]:rounded-[14px]"
        style={{
          padding: "10px",
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.42) 0%, rgba(245,245,243,0.28) 25%, rgba(255,255,255,0.12) 50%, rgba(250,250,248,0.32) 75%, rgba(255,255,255,0.38) 100%)",
          border: "2px solid rgba(0,0,0,0.06)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.03), inset 1px 0 0 rgba(255,255,255,0.3), inset -1px 0 0 rgba(255,255,255,0.3)",
        }}
      >
        {/* 상단 반사 하이라이트 */}
        <div
          className="pointer-events-none absolute left-[2px] right-[2px] top-[2px] rounded-t-[16px]"
          style={{
            height: "40%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 40%, transparent 100%)",
          }}
        />

        {/* 좌측 엣지 굴절 */}
        <div
          className="pointer-events-none absolute left-[2px] top-[12px] bottom-[12px] rounded-l-[16px]"
          style={{
            width: "12px",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.22) 0%, transparent 100%)",
          }}
        />

        {/* 우측 엣지 굴절 */}
        <div
          className="pointer-events-none absolute right-[2px] top-[12px] bottom-[12px] rounded-r-[16px]"
          style={{
            width: "8px",
            background:
              "linear-gradient(270deg, rgba(255,255,255,0.15) 0%, transparent 100%)",
          }}
        />

        {/* 상단 좌우 원형 구멍 */}
        <div className="pointer-events-none absolute left-[16px] top-[14px] max-[520px]:left-[12px] max-[520px]:top-[10px]">
          <div
            className="h-[7px] w-[7px] rounded-full max-[520px]:h-[5px] max-[520px]:w-[5px]"
            style={{
              background: "rgba(0,0,0,0.04)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.12), 0 0.5px 0 rgba(255,255,255,0.5)",
            }}
          />
        </div>
        <div className="pointer-events-none absolute right-[16px] top-[14px] max-[520px]:right-[12px] max-[520px]:top-[10px]">
          <div
            className="h-[7px] w-[7px] rounded-full max-[520px]:h-[5px] max-[520px]:w-[5px]"
            style={{
              background: "rgba(0,0,0,0.04)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.12), 0 0.5px 0 rgba(255,255,255,0.5)",
            }}
          />
        </div>

        {/* 상단 중앙 슬롯 */}
        <div
          className="pointer-events-none absolute left-1/2 top-[6px] -translate-x-1/2 max-[520px]:top-[4px]"
          style={{
            width: "80px",
            height: "6px",
            background: "rgba(0,0,0,0.03)",
            borderRadius: "0 0 6px 6px",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
          }}
        />

        {/* 내부 테두리 */}
        <div
          className="pointer-events-none absolute rounded-[14px] max-[520px]:rounded-[10px]"
          style={{
            inset: "6px",
            border: "1px solid rgba(0,0,0,0.03)",
          }}
        />

        {/* 내부 종이 카드 */}
        {children}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  3. Paper Card — 내부 흰색 종이 카드
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PaperCard() {
  return (
    <div
      className="relative overflow-hidden rounded-lg max-[520px]:rounded-md"
      style={{
        background: "#faf9f7",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
        aspectRatio: "600 / 380",
      }}
    >
      <div className="flex h-full w-full">
        {/* ── 좌측 텍스트 ── */}
        <div className="flex flex-1 flex-col p-[clamp(14px,3.5vw,24px)] pr-[clamp(8px,2vw,16px)]">
          {/* THE PERFORMER 타이틀 */}
          <div className="mb-[clamp(4px,1vw,8px)]">
            <h1
              className="text-[clamp(1.3rem,4.2vw,2.3rem)] font-black leading-[0.93] tracking-[-0.03em] text-neutral-900"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              THE
            </h1>
            <h1
              className="text-[clamp(1.6rem,5.6vw,3.1rem)] font-black leading-[0.93] tracking-[-0.03em] text-neutral-900"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              PERFORMER
            </h1>
          </div>

          {/* 점선 divider */}
          <div className="mb-[clamp(2px,0.6vw,4px)] border-t-[1.5px] border-dashed border-neutral-300" />

          {/* 부제 행 */}
          <div className="mb-[clamp(6px,1.4vw,12px)] flex items-center justify-between">
            <span className="text-[clamp(0.42rem,1.1vw,0.65rem)] font-bold uppercase tracking-[0.06em] text-neutral-700">
              AI-DRIVEN PORTFOLIO
            </span>
            <span className="text-[clamp(0.48rem,1.2vw,0.75rem)] font-bold text-neutral-900">
              about me
            </span>
          </div>

          {/* 필드 영역 */}
          <div className="flex flex-1 flex-col space-y-[clamp(4px,1vw,8px)]">
            {/* NAME */}
            <div>
              <div className="flex items-baseline gap-[clamp(4px,1vw,10px)]">
                <span className="w-[clamp(32px,7vw,54px)] text-[clamp(0.35rem,0.9vw,0.5rem)] font-bold uppercase tracking-[0.08em] text-neutral-600">
                  NAME
                </span>
                <span
                  className="text-[clamp(1rem,3vw,1.6rem)] text-neutral-900"
                  style={{ fontFamily: "'Caveat', var(--font-display), cursive" }}
                >
                  Minjoo
                </span>
              </div>
              <div className="mt-[1px] border-t-[1.5px] border-dashed border-neutral-300" />
            </div>

            {/* OCCUPATION */}
            <div>
              <div className="flex items-baseline gap-[clamp(4px,1vw,10px)]">
                <span className="w-[clamp(32px,7vw,54px)] text-[clamp(0.35rem,0.9vw,0.5rem)] font-bold uppercase tracking-[0.08em] text-neutral-600">
                  OCCUPATION
                </span>
                <span
                  className="text-[clamp(0.8rem,2.4vw,1.3rem)] text-neutral-900"
                  style={{ fontFamily: "'Caveat', var(--font-display), cursive" }}
                >
                  AI driven engineer
                </span>
              </div>
              <div className="mt-[1px] border-t-[1.5px] border-dashed border-neutral-300" />
            </div>

            {/* FOCUS */}
            <div>
              <div className="flex items-baseline gap-[clamp(4px,1vw,10px)]">
                <span className="w-[clamp(32px,7vw,54px)] text-[clamp(0.35rem,0.9vw,0.5rem)] font-bold uppercase tracking-[0.08em] text-neutral-600">
                  FOCUS
                </span>
                <div className="flex flex-col leading-tight">
                  <span
                    className="text-[clamp(0.8rem,2.4vw,1.3rem)] text-neutral-900"
                    style={{ fontFamily: "'Caveat', var(--font-display), cursive" }}
                  >
                    Pursues productivity
                  </span>
                  <span
                    className="-mt-[2px] text-[clamp(0.8rem,2.4vw,1.3rem)] text-neutral-900"
                    style={{ fontFamily: "'Caveat', var(--font-display), cursive" }}
                  >
                    and efficiency
                  </span>
                </div>
              </div>
              <div className="mt-[1px] border-t-[1.5px] border-dashed border-neutral-300" />
            </div>
          </div>

          {/* 하단 */}
          <div className="mt-[clamp(4px,0.8vw,8px)] flex items-end justify-between">
            <div className="max-w-[clamp(80px,18vw,130px)]">
              <p className="text-[clamp(0.25rem,0.6vw,0.4rem)] font-bold uppercase leading-[1.3] tracking-[0.06em] text-neutral-600">
                THE HOLDER OF THIS CARD IS AN OFFICIAL PERFORMER FOR ABOUT-ME
              </p>
            </div>
            <span
              className="text-[clamp(1.1rem,3.2vw,2rem)] font-black tracking-tight text-neutral-900"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              45-12H
            </span>
          </div>
        </div>

        {/* ── 우측 사진 영역 ── */}
        <div className="flex w-[36%] flex-col pr-[clamp(12px,3vw,20px)] pt-[clamp(12px,2.5vw,18px)] pb-[clamp(12px,2.5vw,18px)]">
          {/* DROP 라벨 */}
          <span className="mb-[clamp(4px,0.8vw,8px)] self-end text-[clamp(0.45rem,1vw,0.65rem)] font-medium text-neutral-700">
            DROP : 23
          </span>
          {/* 프로필 사진 */}
          <div
            className="flex-1 overflow-hidden rounded-[2px]"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
            }}
          >
            <img
              src={PROFILE_SRC}
              alt="Profile"
              draggable={false}
              className="pointer-events-none h-full w-full select-none object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  4. Root — 전체 조립
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function BadgeReplicaApp() {
  return (
    <>
      {/* Caveat 폰트 */}
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* 배경 + 중앙 배치 */}
      <div
        className="flex min-h-screen w-full items-center justify-center p-6 max-[520px]:p-3"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #f5f4f2 0%, #eae9e6 70%, #e2e1de 100%)",
        }}
      >
        <div className="flex flex-col items-center w-[clamp(340px,78vw,580px)]">
          <LanyardStrap />
          <PlasticHolder>
            <PaperCard />
          </PlasticHolder>
        </div>
      </div>
    </>
  );
}
