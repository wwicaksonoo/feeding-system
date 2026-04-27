"use client";

import { useState, useEffect, useRef } from "react";
import { ref, get, set } from "firebase/database";
import { db } from "@/lib/firebase";

export default function FeedSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [tempTime, setTempTime] = useState("");
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    const menuRef = useRef(null);

    useEffect(() => {
        loadSchedule();
    }, []);

    const loadSchedule = async () => {
        try {
            const snapshot = await get(ref(db, "schedule"));

            if (snapshot.exists()) {
                const data = snapshot.val();
                setSchedule(Array.isArray(data) ? data : Object.values(data));
            } else {
                const defaultData = [
                    { time: "07:00", active: true },
                    { time: "12:00", active: true },
                ];

                setSchedule(defaultData);
                await set(ref(db, "schedule"), defaultData);
            }
        } catch (error) {
            setSchedule([
                { time: "07:00", active: true },
                { time: "12:00", active: true },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const saveToFirebase = async (data) => {
        try {
            await set(ref(db, "schedule"), data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const openEdit = (index) => {
        setEditingIndex(index);
        setTempTime(schedule[index].time);
    };

    const saveTime = async () => {
        const data = [...schedule];
        data[editingIndex].time = tempTime;

        setSchedule(data);
        setEditingIndex(null);

        await saveToFirebase(data);
    };

    const deleteSchedule = async (index) => {
        const data = schedule.filter((_, i) => i !== index);

        setSchedule(data);
        setOpenMenuIndex(null);

        await saveToFirebase(data);
    };

    const toggleActive = async (index) => {
        const data = [...schedule];
        data[index].active = !data[index].active;

        setSchedule(data);

        await saveToFirebase(data);
    };

    const addSchedule = async () => {
        const data = [
            ...schedule,
            { time: "18:00", active: false },
        ];

        setSchedule(data);

        await saveToFirebase(data);
    };

    if (loading) {
        return <div className="text-white text-center py-10">Loading...</div>;
    }

    return (
        <div className="bg-[#0f0931] flex items-center justify-center p-6 relative bottom-5">
            <div className="w-105 p-8 rounded-3xl border border-white/10 bg-linear-to-b from-[#0b1b2b] to-[#081423] shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-[10px] text-gray-400 tracking-widest uppercase font-bold">
                            Jadwal Pakan
                        </p>
                        <h2 className="text-xl text-white font-semibold tracking-tight">
                            Jam Pemberian
                        </h2>
                    </div>

                    <div className="text-3xl animate-bounce">🐟</div>
                </div>

                <div className="space-y-4">
                    {schedule.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-[#081423]"
                        >
                            <div
                                onClick={() => openEdit(index)}
                                className="flex-1 cursor-pointer"
                            >
                                <span className="text-white text-lg font-mono font-semibold">
                                    {item.time}
                                </span>

                                <p
                                    className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${
                                        item.active
                                            ? "text-cyan-400"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {item.active ? "● Aktif" : "○ Nonaktif"}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleActive(index)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
                                        item.active
                                            ? "bg-cyan-500"
                                            : "bg-gray-600"
                                    }`}
                                >
                                    <div
                                        className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                                            item.active
                                                ? "translate-x-6"
                                                : ""
                                        }`}
                                    />
                                </button>

                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setOpenMenuIndex(
                                                openMenuIndex === index
                                                    ? null
                                                    : index
                                            )
                                        }
                                        className="p-2 text-gray-500 hover:text-white"
                                    >
                                        ⋮
                                    </button>

                                    {openMenuIndex === index && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-0 mt-2 w-28 bg-[#0b1b2b] border border-white/10 rounded-xl z-10 py-1"
                                        >
                                            <button
                                                onClick={() =>
                                                    deleteSchedule(index)
                                                }
                                                className="w-full px-4 py-2 text-left text-[10px] text-red-400 hover:bg-red-400/10 font-bold"
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
                    onClick={addSchedule}
                    className="mt-6 w-full py-4 rounded-2xl bg-cyan-500 text-black font-bold text-[11px] tracking-[0.2em] hover:bg-cyan-400 transition-all active:scale-95 uppercase"
                >
                    + Tambah Jadwal
                </button>
            </div>

            {editingIndex !== null && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0b1b2b] p-8 rounded-4xl border border-cyan-500/30 w-full max-w-sm">
                        <h3 className="text-white text-center text-[10px] tracking-[0.3em] mb-8 uppercase font-bold opacity-60">
                            Atur Waktu Pakan
                        </h3>

                        <input
                            type="time"
                            value={tempTime}
                            onChange={(e) => setTempTime(e.target.value)}
                            className="bg-[#081423] text-cyan-400 text-5xl px-4 py-6 font-mono font-bold rounded-2xl outline-none block mx-auto w-full text-center"
                        />

                        <div className="flex gap-4 mt-10">
                            <button
                                onClick={saveTime}
                                className="flex-1 bg-cyan-500 py-4 rounded-2xl text-black font-bold text-xs"
                            >
                                SIMPAN
                            </button>

                            <button
                                onClick={() => setEditingIndex(null)}
                                className="flex-1 bg-white/5 py-4 rounded-2xl text-white font-bold text-xs"
                            >
                                BATAL
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}