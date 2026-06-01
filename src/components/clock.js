"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export default function Clock() {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);
    const [lastSeen, setLastSeen] = useState(null);
    const [isOffline, setIsOffline] = useState(true);

    useEffect(() => {
        setMounted(true);

        const clockInterval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        const deviceRef = ref(db, "device/lastSeen");

        const unsubscribe = onValue(deviceRef, (snapshot) => {
            if (snapshot.exists()) {
                setLastSeen(Number(snapshot.val()));
            } else {
                setLastSeen(null);
                setIsOffline(true);
            }
        });

        const statusInterval = setInterval(() => {
            if (!lastSeen) {
                setIsOffline(true);
                return;
            }

            const now = Math.floor(Date.now() / 1000);
            const diff = now - lastSeen;

            setIsOffline(diff > 6);
        }, 1000);

        return () => {
            clearInterval(clockInterval);
            clearInterval(statusInterval);
            unsubscribe();
        };
    }, [lastSeen]);

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
            <div
                className={`px-3 py-1 rounded-md bg-[#081423] border transition-all duration-300 flex items-center justify-center gap-2 mb-2 ${
                    isOffline
                        ? "border-red-500 text-red-500"
                        : "border-cyan-500/30 text-green-400"
                }`}
            >
                <span
                    className={`w-2 h-2 rounded-full ${
                        isOffline
                            ? "bg-red-500"
                            : "bg-green-400 animate-pulse"
                    }`}
                />

                <span className="text-[8px] font-black tracking-[0.2em] uppercase">
                    {mounted
                        ? isOffline
                            ? "Offline"
                            : "Connected"
                        : "Checking"}
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