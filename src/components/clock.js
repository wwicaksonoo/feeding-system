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

    const clock = `${h}:${m}:${s}`;

    return (
        <div className="py-2 ">
<div className={`w-24 h-6 rounded bg-linear-to-b from-[#0b1b2b] to-[#081423] border shadow-[0_0_25px_rgba(0,200,255,0.08)] relative bottom-4 transition-all duration-300 flex items-center justify-center ${
                isOffline ? "border-red-500 text-red-500 shadow-red-500/20" : "border-[#1c3a52] text-green-400"
            }`}>
                <span className="text-[10px] font-bold tracking-widest uppercase">
                    {isOffline ? "Offline" : "Connected"}
                </span>
            </div>

            <div className="text-md font-semibold tabular-nums text-right">{clock}</div>
            <div className="text-[12px] opacity-50 text-right">{date}</div>
        </div>
    );
}
