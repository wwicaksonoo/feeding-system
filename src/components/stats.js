"use client";

export default function Stats() {
    const level = 63;

    const radius = 70;
    const circumference = Math.PI * radius;
    const progress = circumference - (level / 100) * circumference;

    return (
        <div className="flex gap-5">
            <div
                className="w-65 h-45 p-6 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52]
                shadow-[0_0_25px_rgba(0,200,255,0.08)]
"
            >
                <p className="text-xs text-gray-400 tracking-widest">SUHU AIR</p>

                <div className="text-5xl font-bold text-white mt-3">
                    28.4<span className="text-lg ml-1">°C</span>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500 text-white text-xs">● NORMAL</div>
            </div>

            <div
                className="w-55 p-6 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52]
                shadow-[0_0_25px_rgba(0,200,255,0.08)]
"
            >
                <p className="text-xs tracking-widest text-gray-400">KETINGGIAN AIR</p>

                <div className="flex justify-center mt-6 relative">
                    <svg width="180" height="110">
                        <path d="M20 90 A70 70 0 0 1 160 90" stroke="#0f3a4f" strokeWidth="14" fill="none" strokeLinecap="round" />

                        <path d="M20 90 A70 70 0 0 1 160 90" stroke="#22d3ee" strokeWidth="14" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={progress} style={{ transition: "0.7s" }} />
                    </svg>

                    <div className="absolute bottom-0 text-white font-semibold text-lg">{level}%</div>
                </div>

                <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>0%</span>
                    <span>100%</span>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-500 text-white text-xs">● NORMAL</div>
            </div>
        </div>
    );
}
