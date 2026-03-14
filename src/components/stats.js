"use client";

export default function Stats({ level, temp, isOffline, isAuto, setIsAuto }) {
    const radius = 70;
    const circumference = Math.PI * radius;
    const progress = circumference - (level / 100) * circumference;

    const handleManualFeed = async () => {
        if (isAuto) return;
        try {
            const res = await fetch("/api/feed", { method: "POST" });
            const data = await res.json();
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
      
        <div className="flex gap-4 w-full max-w-105 mx-auto overflow-hidden">
            
            <div className="flex flex-col gap-4 w-[40%]">
                
            
                <div className="p-5 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] shadow-lg">
                    <p className="text-[10px] text-gray-400 tracking-widest uppercase font-bold whitespace-nowrap">Suhu Air</p>
                    <div className="text-4xl font-bold text-white mt-2">
                        {isOffline ? "--" : temp}<span className="text-lg ml-0.5 opacity-50">°C</span>
                    </div>
                    <div className={`mt-4 inline-flex items-center gap-2 px-2 py-1 rounded-full border text-[9px] tracking-tighter transition-all ${
                        isOffline ? "border-red-500 text-red-500" : 
                        temp < 24 ? "border-blue-500 text-blue-400" : 
                        temp <= 29 ? "border-cyan-500 text-white" : "border-red-500 text-red-400"
                    }`}>
                        <span className={`w-1 h-1 rounded-full ${isOffline ? "bg-red-500" : "bg-cyan-400 animate-pulse"}`}></span>
                        <span className="whitespace-nowrap">{isOffline ? "OFFLINE" : temp < 24 ? "DINGIN" : temp <= 29 ? "NORMAL" : "PANAS"}</span>
                    </div>
                </div>

                <div 
                    onClick={() => setIsAuto(!isAuto)}
                    className="p-5 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] cursor-pointer hover:border-cyan-500/50 transition-all group"
                >
                    <p className="text-[10px] text-gray-400 tracking-widest uppercase font-bold mb-2">Mode</p>
                    <div className="flex items-center justify-between">
                        <div className={`text-xl font-bold ${isAuto ? "text-green-500" : "text-blue-400"}`}>
                            {isAuto ? "AUTO" : "MANUAL"}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${isAuto ? "bg-green-400 animate-pulse" : "bg-blue-400"}`}></div>
                    </div>
                    {!isAuto && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleManualFeed(); }}
                            className="mt-3 w-full py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all"
                        >
                            FEED
                        </button>
                    )}
                </div>
            </div>

            <div className="w-[60%] p-5 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] flex flex-col items-center justify-between">
                <p className="text-[10px] tracking-widest text-gray-400 uppercase font-bold self-start">Ketinggian</p>
                
                <div className="flex justify-center mt-4 relative">
                    <svg width="150" height="90" viewBox="0 0 180 110">
                        <path d="M20 90 A70 70 0 0 1 160 90" stroke="#0f3a4f" strokeWidth="14" fill="none" strokeLinecap="round" />
                        <path 
                            d="M20 90 A70 70 0 0 1 160 90" 
                            stroke={isOffline ? "#334155" : (level > 90 ? "#f97316" : "#22d3ee")} 
                            strokeWidth="14" fill="none" strokeLinecap="round" 
                            strokeDasharray={circumference} 
                            strokeDashoffset={isOffline ? circumference : progress} 
                            style={{ transition: "stroke-dashoffset 0.8s ease" }} 
                        />
                    </svg>
                    <div className="absolute bottom-1 text-white font-black text-xl">{isOffline ? "--" : `${level}%`}</div>
                </div>

                <div className={`mt-4 w-full text-center py-2 rounded-xl border text-[9px] tracking-widest font-black ${
                    isOffline ? "border-red-500 text-red-500" : level > 90 ? "border-orange-500 text-orange-400" : "border-cyan-500 text-cyan-400"
                }`}>
                    {isOffline ? "OFFLINE" : level > 90 ? "FULL" : "NORMAL"}
                </div>
            </div>
        </div>
    );
}