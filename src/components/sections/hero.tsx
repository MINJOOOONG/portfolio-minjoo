import Image from "next/image";

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
    "QA 실무와 백엔드 개발 경험을 바탕으로 사용자 불편을 로그, 데이터, 코드, 제품 흐름까지 함께 분석합니다. AI를 적극적으로 활용해 반복 업무를 줄이고, 더 정확한 검증과 빠른 실행이 가능한 서비스를 만드는 데 집중합니다.",
};

export function Hero() {
  return (
    <section className="pt-20 pb-6 sm:pt-24">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div className="resume-card rounded-2xl overflow-hidden">
          {/* Card Body */}
          <div className="px-6 py-5 flex flex-col sm:flex-row gap-5">
            {/* Avatar */}
            <div className="shrink-0">
              <Image
                src="/profile.jpeg"
                alt={PROFILE.name}
                width={112}
                height={112}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold">{PROFILE.name}</h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-medium bg-[rgba(49,130,246,0.1)] text-[#3182f6]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3182f6]" />
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
          <div className="bg-secondary/50 border-t border-border/50 px-6 py-3 flex flex-wrap gap-x-8 gap-y-1 text-xs">
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
