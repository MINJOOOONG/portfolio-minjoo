const PROFILE = {
  name: "서민주",
  title: "QA Engineer | Backend Developer",
  status: "구직 중",
  phone: "+82 10-4948-5089",
  email: "zzz1577@naver.com",
  birthday: "1999.09.21",
  location: "경기도 고양시",
  hobby: "바이브 코딩, 새로운 기술 탐색 및 실험",
  github: "https://github.com/MINJOOOONG",
  linkedin: "https://www.linkedin.com/in/minjooooo",
  blog: "https://joodev-sandy.vercel.app/",
  summary:
    "코드를 이해하고 직접 다루며 품질을 검증하는 QA Engineer입니다. 고객의 불편을 기능 단위가 아닌 구조와 코드 관점에서 분석하고, 제품이 왜 그렇게 동작해야 하는지를 끝까지 질문합니다.",
};

export function Hero() {
  return (
    <section className="pt-16 pb-4 sm:pt-18">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div className="resume-card rounded-lg overflow-hidden">
          {/* Card Body */}
          <div className="px-6 py-5 flex flex-col sm:flex-row gap-5">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-muted border border-border flex items-center justify-center text-3xl text-muted-foreground">
                {PROFILE.name.charAt(0)}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold">{PROFILE.name}</h1>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-[rgba(74,222,128,0.1)] text-[#4ade80] border border-[rgba(74,222,128,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                  {PROFILE.status}
                </span>
              </div>
              <p className="text-sm text-primary font-medium mb-3">{PROFILE.title}</p>

              {/* Summary */}
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                {PROFILE.summary}
              </p>

              {/* Contact */}
              <div className="flex flex-col gap-1.5 text-[13px] text-muted-foreground">
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <a href={`mailto:${PROFILE.email}`} className="hover:text-foreground transition-colors">
                    {PROFILE.email}
                  </a>
                  <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, "")}`} className="hover:text-foreground transition-colors">
                    {PROFILE.phone}
                  </a>
                </div>
                <div className="flex gap-4">
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    GitHub ↗
                  </a>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    LinkedIn ↗
                  </a>
                  <a href={PROFILE.blog} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    Blog ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Info bar */}
          <div className="bg-[var(--muted)] border-t border-border px-6 py-2.5 flex flex-wrap gap-x-8 gap-y-1 text-xs">
            <div>
              <span className="text-muted-foreground">Birth</span>
              <span className="ml-2 text-foreground">{PROFILE.birthday}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Location</span>
              <span className="ml-2 text-foreground">{PROFILE.location}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Interests</span>
              <span className="ml-2 text-foreground">{PROFILE.hobby}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
