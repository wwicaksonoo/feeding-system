"use client";

export default function Stats({ level, temp, isOffline, isAuto, setIsAuto }) {
   
    const radius = 70;
    const circumference = Math.PI * radius;
    const progress = circumference - (level / 100) * circumference;

    const handleManualFeed = async () => {
        if (isAuto) return;
        console.log("Tombol FEED ditekan!"); 
        try {
            const res = await fetch("/api/feed");
            const data = await res.json();
            console.log("Respon dari ESP:", data);
        } catch (err) {
            console.error("Gagal fetch ke /api/feed:", err);
        }
    };

    return (
        <div className="flex gap-5 relative bottom-6">
            <div className="flex flex-col gap-5">
                
                <div className="w-45 h-40 p-6 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] shadow-[0_0_25px_rgba(0,200,255,0.08)]">
                    <p className="text-xs text-gray-400 tracking-widest uppercase font-bold">Suhu Air</p>
                    <div className="text-5xl font-bold text-white mt-3">
                        {isOffline ? "--" : temp}<span className="text-lg ml-1 opacity-50">°C</span>
                    </div>
                    <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] tracking-widest transition-all duration-300 ${
                        isOffline ? "border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : 
                        temp < 24 ? "border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]" : 
                        temp <= 29 ? "border-cyan-500 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]" : 
                        "border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                            isOffline ? "bg-red-500" : temp < 24 ? "bg-blue-500" : temp <= 29 ? "bg-cyan-400 animate-pulse" : "bg-red-500 animate-ping"
                        }`}></span>
                        {isOffline ? "OFFLINE" : temp < 24 ? "DINGIN" : temp <= 29 ? "NORMAL" : "PANAS"}
                    </div>
                </div>

               
             <div 
                    onClick={() => setIsAuto(!isAuto)}
                    className="w-45 min-h-2 p-6 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] shadow-[0_0_25px_rgba(0,200,255,0.08)] cursor-pointer hover:border-cyan-500/50 transition-all group"
                >
                    <p className="text-xs text-gray-400 tracking-widest relative bottom-3 uppercase">Mode</p>
                    <div className="flex items-center justify-between relative bottom-1">
                        <div className={`text-2xl font-semibold transition-colors ${isAuto ? "text-green-500" : "text-blue-400"}`}>
                            {isAuto ? "AUTO" : "MANUAL"}
                        </div>
                        <div className={`w-2 h-2 rounded-full ${isAuto ? "bg-green-400 animate-pulse" : "bg-blue-400"}`}></div>
                    </div>
                    {!isAuto && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleManualFeed(); }}
                            className="mt-4 w-full py-2 bg-orange-500/10 border border-blue-500/50 text-blue-400 text-[10px] font-bold tracking-widest rounded-xl hover:border-blue-900 hover:text-white transition-all active:scale-95"
                        >
                            BERI PAKAN
                        </button>
                    )}
                </div>
            </div>

          
            <div className="w-55 p-6 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] shadow-[0_0_25px_rgba(0,200,255,0.08)] flex flex-col items-center">
                <p className="text-xs tracking-widest text-gray-400 uppercase font-bold self-start">Ketinggian Air</p>
                <div className="flex justify-center mt-6 relative">
                    <svg width="180" height="110">
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
                    <div className="absolute bottom-0 text-white font-black text-2xl font-mono">{isOffline ? "--" : `${level}%`}</div>
                </div>
                <div className="w-full flex justify-between text-[10px] text-gray-500 mt-2 font-bold px-2">
                    <span>0%</span>
                    <span>100%</span>
                </div>
                <div className={`mt-6 w-full text-center py-2 rounded-xl border text-[10px] tracking-widest font-black transition-all ${
                    isOffline ? "border-red-500 text-red-500" : level > 90 ? "border-orange-500 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.2)]" : "border-cyan-500 text-cyan-400"
                }`}>
                    {isOffline ? "SENSOR OFFLINE" : level > 90 ? "TANGKI PENUH" : "KONDISI NORMAL"}
                </div>
            </div>
        </div>
    );
}