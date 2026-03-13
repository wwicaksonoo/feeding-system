"use client";

import { useState, useEffect, useRef } from "react";

export default function FeedSchedule({isAuto}) {
    const [schedule, setSchedule] = useState([
        { time: "07:00", active: true },
        { time: "12:00", active: true },
    ]);
    
    const [lastFed, setLastFed] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempTime, setTempTime] = useState("");
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const checkSchedule = async () => {
            if (!isAuto) return;
            
            const now = new Date();
            const currentTime = now.toLocaleTimeString('en-GB', { 
                hour: '2-digit', minute: '2-digit', hour12: false 
            });

            const isTimetoFeed = schedule.some(item => 
                item.active && 
                item.time === currentTime
            );

            if (isTimetoFeed && lastFed !== currentTime) {
                setLastFed(currentTime); 
                try { 
                    await fetch("/api/feed", {
                        method: "POST"
                    }); 
                    console.log("Auto Feed Success at: " + currentTime);
                } catch (err) { 
                    console.error("Auto Feed Error:", err); 
                }
            }
        };
        
        const timer = setInterval(checkSchedule, 1000);
        return () => clearInterval(timer);
    }, [schedule, lastFed, isAuto]); 

    const openEdit = (index) => {
        setEditingIndex(index);
        setTempTime(schedule[index].time);
    };

    const saveTime = () => {
        const data = [...schedule];
        data[editingIndex].time = tempTime;
        setSchedule(data);
        setEditingIndex(null);
    };

    const deleteSchedule = (index) => {
        setSchedule(schedule.filter((_, i) => i !== index));
        setOpenMenuIndex(null);
    };

    return (
        <div className="bg-[#071826] flex items-center justify-center p-4 relative bottom-10">
            <div className="w-105 p-8 rounded-3xl border border-white/10 bg-linear-to-b from-[#0b1b2b] to-[#081423] shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-[10px] text-gray-400 tracking-widest uppercase font-bold">Jadwal Pakan</p>
                        <h2 className="text-xl text-white font-semibold tracking-tight">Jam Pemberian</h2>
                    </div>
                    <div className="text-3xl animate-bounce">🐟</div>
                </div>

                <div className="space-y-4">
                    {schedule.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-[#081423] transition-all hover:border-white/20">
                            <div 
                                onClick={() => openEdit(index)} 
                                className="flex-1 cursor-pointer group"
                            >
                                <span className="text-white text-lg font-mono font-semibold group-hover:text-cyan-400 transition-colors">
                                    {item.time}
                                </span>
                                <p className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${item.active ? "text-cyan-400" : "text-gray-500"}`}>
                                    {item.active ? "● Aktif" : "○ Nonaktif"}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => {
                                        const data = [...schedule];
                                        data[index].active = !data[index].active;
                                        setSchedule(data);
                                    }}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${item.active ? "bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : "bg-gray-600"}`}
                                >
                                    <div className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${item.active ? "translate-x-6" : ""}`} />
                                </button>

                                <div className="relative">
                                    <button 
                                        onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                                        className="p-2 text-gray-500 hover:text-white transition-colors"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                        </svg>
                                    </button>

                                    {openMenuIndex === index && (
                                        <div ref={menuRef} className="absolute right-0 mt-2 w-28 bg-[#0b1b2b] border border-white/10 rounded-xl shadow-2xl z-10 py-1 overflow-hidden">
                                            <button 
                                                onClick={() => deleteSchedule(index)} 
                                                className="w-full px-4 py-2 text-left text-[10px] text-red-400 hover:bg-red-400/10 font-bold tracking-widest"
                                            >
                                                HAPUS
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={() => setSchedule([...schedule, { time: "18:00", active: false }])} 
                    className="mt-6 w-full py-4 rounded-2xl bg-cyan-500 text-black font-bold text-[11px] tracking-[0.2em] hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-95 uppercase"
                >
                    + Tambah Jadwal
                </button>
            </div>

            {editingIndex !== null && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0b1b2b] p-8 rounded-4xl border border-cyan-500/30 w-full max-w-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <h3 className="text-white text-center text-[10px] tracking-[0.3em] mb-8 uppercase font-bold opacity-60">Atur Waktu Pakan</h3>
                        <input 
                            type="time" 
                            value={tempTime} 
                            onChange={(e) => setTempTime(e.target.value)} 
                            className="bg-[#081423] text-cyan-400 text-5xl px-4 py-6 font-mono font-bold rounded-2xl border border-white/5 outline-none block mx-auto w-full text-center focus:border-cyan-500 transition-all shadow-inner" 
                        />
                        <div className="flex gap-4 mt-10">
                            <button onClick={saveTime} className="flex-1 bg-cyan-500 py-4 rounded-2xl text-black font-bold text-xs tracking-widest hover:bg-cyan-400 transition-all shadow-lg">SIMPAN</button>
                            <button onClick={() => setEditingIndex(null)} className="flex-1 bg-white/5 py-4 rounded-2xl text-white font-bold text-xs tracking-widest hover:bg-white/10 transition-all">BATAL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}