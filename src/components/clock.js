"use client";

import { useEffect, useState } from "react";

export default function Clock({ isOffline }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const date = time.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const h = String(time.getHours()).padStart(2, "0");
    const m = String(time.getMinutes()).padStart(2, "0");
    const s = String(time.getSeconds()).padStart(2, "0");

    return (
   
        <div className="flex flex-col items-end">
            
          
            <div className={`px-3 py-1 rounded-md bg-[#081423] border transition-all duration-300 flex items-center justify-center mb-2 ${
                isOffline 
                ? "border-red-500 text-red-500" 
                : "border-cyan-500/30 text-green-400"
            }`}>
                <span className="text-[8px] font-black tracking-[0.2em] uppercase">
                    {isOffline ? "Offline" : "Connected"}
                </span>
            </div>

            
            <div className="text-right">
                <div className="text-md font-bold tabular-nums text-white leading-none">
                    {h}:{m}:{s}
                </div>
                <div className="text-[10px] uppercase tracking-widest opacity-40 text-gray-300 mt-2">
                    {date}
                </div>
            </div>
        </div>
    );
}