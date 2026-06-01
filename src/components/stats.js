"use client";

export default function Stats({ 
    level, 
    isOffline, 
    isAuto, 
    setIsAuto,
    isPumpOn,
    setIsPumpOn
}) {

    const radius = 70;
    const circumference = Math.PI * radius;
    const progress = circumference - (level / 100) * circumference;

    // =========================
    // MANUAL FEED
    // =========================
    const handleManualFeed = async () => {

        if (isAuto) return;

        try {

            await fetch("/api/feed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "feed"
                })
            });

        } catch (err) {

            console.error("Error:", err);
        }
    };

    // =========================
    // PUMP TOGGLE
    // =========================
    const handlePumpToggle = async () => {

        try {

            const nextState = !isPumpOn;

            await fetch("/api/feed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "pump",
                    active: nextState
                })
            });

            setIsPumpOn(nextState);

        } catch (err) {

            console.error(err);
        }
    };

    return (
      
        <div className="flex gap-4 w-full max-w-105 mx-auto overflow-hidden">
            
            <div className="flex flex-col gap-4 w-[40%]">

                {/* PUMP */}
                <div
                    onClick={handlePumpToggle}
                    className="p-5 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] cursor-pointer hover:border-cyan-500/50 transition-all group active:scale-95"
                >

                    <p className="text-[10px] text-gray-400 tracking-widest uppercase font-bold mb-2">
                        Pompa Air
                    </p>

                    <div className="flex items-center justify-between">

                        <div className={`text-xl font-bold ${
                            isPumpOn
                                ? "text-cyan-400"
                                : "text-gray-500"
                        }`}>
                            {isPumpOn ? "ON" : "OFF"}
                        </div>

                        <div className={`w-3 h-3 rounded-full ${
                            isPumpOn
                                ? "bg-cyan-400 animate-pulse"
                                : "bg-gray-600"
                        }`} />

                    </div>

                    <div className={`mt-3 w-full py-2 rounded-xl border text-center text-[8px] font-bold tracking-widest transition-all ${
                        isPumpOn
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                            : "bg-white/5 border-white/10 text-gray-500"
                    }`}>
                        TAP TO {isPumpOn ? "TURN OFF" : "TURN ON"}
                    </div>
                </div>

                {/* MODE */}
                <div 
                    onClick={() => setIsAuto(!isAuto)}
                    className="p-5 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] cursor-pointer hover:border-cyan-500/50 transition-all group"
                >

                    <p className="text-[10px] text-gray-400 tracking-widest uppercase font-bold mb-2">
                        Mode
                    </p>

                    <div className="flex items-center justify-between">

                        <div className={`text-xl font-bold ${
                            isAuto
                                ? "text-green-500"
                                : "text-blue-400"
                        }`}>
                            {isAuto ? "AUTO" : "MANUAL"}
                        </div>

                        <div className={`w-2 h-2 rounded-full ${
                            isAuto
                                ? "bg-green-400 animate-pulse"
                                : "bg-transparent"
                        }`} />

                    </div>

                    {!isAuto && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleManualFeed();
                            }}
                            className="mt-3 w-full py-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95"
                        >
                            FEED
                        </button>
                    )}
                </div>
            </div>

            {/* WATER LEVEL */}
            <div className="w-[60%] p-5 rounded-3xl bg-linear-to-b from-[#0b1b2b] to-[#081423] border border-[#1c3a52] flex flex-col items-center justify-between">

                <p className="text-[10px] tracking-widest text-gray-400 uppercase font-bold self-start">
                    Ketinggian
                </p>
                
                <div className="flex justify-center mt-4 relative">

                    <svg width="150" height="90" viewBox="0 0 180 110">

                        <path
                            d="M20 90 A70 70 0 0 1 160 90"
                            stroke="#0f3a4f"
                            strokeWidth="14"
                            fill="none"
                            strokeLinecap="round"
                        />

                        <path 
                            d="M20 90 A70 70 0 0 1 160 90"
                            stroke={
                                isOffline
                                    ? "#334155"
                                    : level > 90
                                    ? "#f97316"
                                    : "#22d3ee"
                            }
                            strokeWidth="14"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={
                                isOffline
                                    ? circumference
                                    : progress
                            }
                            style={{
                                transition: "stroke-dashoffset 0.8s ease"
                            }}
                        />

                    </svg>

                    <div className="absolute bottom-1 text-white font-black text-xl">
                        {isOffline ? "--" : `${level}%`}
                    </div>

                </div>

                <div className={`mt-4 w-full text-center py-2 rounded-xl border text-[9px] tracking-widest font-black ${
                    isOffline
                        ? "border-red-500 text-red-500"
                        : level > 90
                        ? "border-orange-500 text-orange-400"
                        : "border-cyan-500 text-cyan-400"
                }`}>
                    {isOffline
                        ? "OFFLINE"
                        : level > 90
                        ? "FULL"
                        : "NORMAL"}
                </div>

            </div>
        </div>
    );
}