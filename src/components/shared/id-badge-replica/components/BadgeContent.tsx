export const BadgeContent = () => {
  return (
    <div className="w-full h-full p-5 flex relative">
      {/* Left content area */}
      <div className="flex-1 flex flex-col pr-4">
        {/* Title section */}
        <div className="mb-2">
          <h1 className="text-4xl font-black tracking-tighter leading-none text-neutral-900">
            THE
          </h1>
          <h1 className="text-5xl font-black tracking-tighter leading-none text-neutral-900">
            PERFORMER
          </h1>
        </div>

        {/* Dashed separator */}
        <div className="border-t-2 border-dashed border-neutral-400 mb-2" />

        {/* Subtitle row */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold tracking-wide text-neutral-800 uppercase">
            SKIN-FIRST FOUNDATION
          </span>
          <span className="text-sm font-bold text-neutral-900">about me</span>
        </div>

        {/* Info fields */}
        <div className="space-y-3 flex-1">
          {/* Name */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-bold tracking-wider text-neutral-700 uppercase w-16">
                NAME
              </span>
              <span className="text-2xl text-neutral-900" style={{ fontFamily: "'Caveat', cursive" }}>
                Minjoo
              </span>
            </div>
            <div className="border-t-2 border-dashed border-neutral-400 mt-0.5" />
          </div>

          {/* Occupation */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-bold tracking-wider text-neutral-700 uppercase w-16">
                OCCUPATION
              </span>
              <span className="text-xl text-neutral-900" style={{ fontFamily: "'Caveat', cursive" }}>
                AI driven engineer
              </span>
            </div>
            <div className="border-t-2 border-dashed border-neutral-400 mt-0.5" />
          </div>

          {/* Focus */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-bold tracking-wider text-neutral-700 uppercase w-16">
                FOCUS
              </span>
              <div className="flex flex-col">
                <span className="text-xl text-neutral-900" style={{ fontFamily: "'Caveat', cursive" }}>
                  Pursues productivity
                </span>
                <span className="text-xl text-neutral-900 -mt-1" style={{ fontFamily: "'Caveat', cursive" }}>
                  and efficiency
                </span>
              </div>
            </div>
            <div className="border-t-2 border-dashed border-neutral-400 mt-0.5" />
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-end mt-2">
          <div className="max-w-[140px]">
            <p className="text-[7px] font-bold tracking-wider text-neutral-700 uppercase leading-tight">
              THE HOLDER OF THIS CARD IS AN OFFICIAL PERFORMER FOR ABOUT-ME
            </p>
          </div>
          <span className="text-3xl font-black text-neutral-900 tracking-tight">
            45-12H
          </span>
        </div>
      </div>

      {/* Right photo area */}
      <div className="w-36 flex flex-col items-end">
        <span className="text-xs font-medium text-neutral-800 mb-2">DROP : 23</span>
        <div className="w-36 h-44 bg-neutral-200 rounded-sm overflow-hidden">
          <img
            src="https://csspicker.dev/api/image/?q=professional+portrait&image_type=photo"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
