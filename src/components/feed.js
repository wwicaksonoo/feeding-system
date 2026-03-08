"use client";

import { useState } from "react";

export default function FeedSchedule() {
    const [schedule, setSchedule] = useState([
        { time: "07:00", active: true },
        { time: "12:00", active: true },
    ]);

    const [editingIndex, setEditingIndex] = useState(null);
    const [tempTime, setTempTime] = useState("");

    const toggle = (index) => {
        const data = [...schedule];
        data[index].active = !data[index].active;
        setSchedule(data);
    };

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

    const addSchedule = () => {
        setSchedule([...schedule, { time: "18:00", active: false }]);
    };

    return (
        <div className="bg-[#071826] flex items-center justify-center">
            <div className="w-105 p-8 rounded-3xl border border-white/10 bg-linear-to-b from-[#0b1b2b] to-[#081423]">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-xs text-gray-400 tracking-widest">JADWAL PAKAN</p>
                        <h2 className="text-xl text-white font-semibold">Jam Pemberian</h2>
                    </div>

                    <div className="text-3xl animate-fish">🐟</div>
                </div>

                <div className="space-y-4">
                    {schedule.map((item, index) => (
                        <div key={index} onClick={() => openEdit(index)} className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-[#081423] cursor-pointer">
                            <span className="text-white text-lg font-semibold">{item.time}</span>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggle(index);
                                }}
                                className={`w-14 h-8 flex items-center rounded-full p-1 transition
                ${item.active ? "bg-cyan-500" : "bg-gray-600"}`}
                            >
                                <div
                                    className={`bg-white w-6 h-6 rounded-full transform transition
                  ${item.active ? "translate-x-6" : ""}`}
                                />
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={addSchedule} className="mt-6 w-full py-3 rounded-xl bg-cyan-500 text-black font-semibold">
                    + Tambah Jadwal
                </button>
            </div>

            {editingIndex !== null && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-[#081423] p-6 rounded-2xl border border-white/10">
                        <h3 className="text-white mb-4">Set Jam</h3>

                        <input type="time" value={tempTime} onChange={(e) => setTempTime(e.target.value)} className="bg-slate-800 text-white px-13.5 py-2 font-bold rounded outline-none" />

                        <div className="flex gap-3 mt-4">
                            <button onClick={saveTime} className="bg-cyan-500 px-6 py-2 rounded text-black font-semibold">
                                OK
                            </button>

                            <button onClick={() => setEditingIndex(null)} className="bg-gray-600 px-4 py-2 rounded text-white">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
