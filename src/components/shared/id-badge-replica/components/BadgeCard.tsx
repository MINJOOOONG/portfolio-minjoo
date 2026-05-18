import { BadgeContent } from './BadgeContent';

export const BadgeCard = () => {
  return (
    <div className="relative -mt-2">
      {/* Outer clear plastic holder */}
      <div className="relative">
        {/* Main holder body - realistic clear plastic */}
        <div
          className="rounded-3xl p-3 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(230,230,230,0.4) 50%, rgba(255,255,255,0.3) 100%)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: `
              0 25px 50px -12px rgba(0,0,0,0.25),
              0 0 0 1px rgba(255,255,255,0.2) inset,
              0 2px 4px rgba(255,255,255,0.3) inset
            `,
          }}
        >
          {/* Inner bevel - plastic thickness */}
          <div
            className="rounded-2xl p-1"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(220,220,220,0.3) 100%)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05) inset',
            }}
          >
            {/* Card slot - recessed area */}
            <div
              className="rounded-xl p-2"
              style={{
                background: 'linear-gradient(180deg, rgba(200,200,200,0.3) 0%, rgba(240,240,240,0.2) 100%)',
                boxShadow: `
                  0 2px 4px rgba(0,0,0,0.1) inset,
                  0 1px 0 rgba(255,255,255,0.5)
                `,
              }}
            >
              {/* The actual ID card */}
              <div className="bg-[#f8f6f1] rounded-lg w-[420px] h-[280px] relative overflow-hidden shadow-sm">
                <BadgeContent />
              </div>
            </div>
          </div>
        </div>

        {/* Top slot for lanyard - realistic punch hole */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="w-28 h-7 rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(220,220,220,0.5) 100%)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(255,255,255,0.5) inset',
            }}
          />
        </div>

        {/* Corner rivets - realistic metal studs */}
        <div
          className="absolute top-8 left-6 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(200,200,200,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.5) inset',
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(180,180,180,0.7))',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2) inset',
            }}
          />
        </div>
        <div
          className="absolute top-8 right-6 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(200,200,200,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15), 0 1px 1px rgba(255,255,255,0.5) inset',
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(180,180,180,0.7))',
              boxShadow: '0 1px 2px rgba(0,0,0,0.2) inset',
            }}
          />
        </div>

        {/* Plastic edge highlights - adds realism */}
        <div
          className="absolute -inset-px rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)',
          }}
        />
      </div>
    </div>
  );
};
