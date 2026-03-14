"use client";
import { useEffect, useState } from "react";
import Clock from "@/components/clock";
import FeedSchedule from "@/components/feed";
import Stats from "@/components/stats";

export default function Home() {
  const [data, setData] = useState({ water: 0, temp: 0 });
  const [isOffline, setIsOffline] = useState(false);
  const [isAuto, setIsAuto] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/sensor"); 
        const json = await res.json();
        if (json.status === "offline") {
          setIsOffline(true);
        } else {
          setData(json);
          setIsOffline(false);
        }
      } catch (err) {
        setIsOffline(true);
      }
    };
    fetchData(); 
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0931] text-white overflow-x-hidden">

      <div className="max-w-105 mx-auto flex flex-col min-h-screen">
        
 
        <header className="flex justify-between items-start pt-10 px-6 mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] opacity-50 uppercase tracking-[0.3em] font-bold">Live</span>
            <h1 className="font-bold text-2xl leading-none mt-1 whitespace-nowrap">
              Feeding System
            </h1>
            <span className="text-[9px] opacity-40 uppercase tracking-widest mt-2">
              Monitoring & Control
            </span>
          </div>

          <div className="flex items-start">
            <Clock isOffline={isOffline} />
          </div>
        </header>


        <main className="px-6 space-y-10">
          <Stats 
            level={data.water} 
            temp={data.temp} 
            isOffline={isOffline} 
            isAuto={isAuto} 
            setIsAuto={setIsAuto} 
          />
          
          
          <div className="-mx-6"> 
            <FeedSchedule isAuto={isAuto} />
          </div>
        </main>

      </div>
    </div>
  );
}