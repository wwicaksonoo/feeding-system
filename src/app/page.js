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
        const res = await fetch("/sensor");
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
    <div className="min-h-screen bg-[#0f0931] ">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col items-start rounded-lg p-8 text-white ">
            <span className="text-xs opacity-50 uppercase tracking-widest">Live Monitoring</span>
            <h1 className="font-bold text-3xl">Fish Aquarium</h1>
            <span className="text-[10px] opacity-50 uppercase">Monitoring and Control System</span>
          </div>

          <div className="p-8 flex text-right items-center text-sm">
            <Clock isOffline={isOffline} />
          </div>
        </div>

        <div className="p-8">
    
          <Stats 
            level={data.water} 
            temp={data.temp} 
            isOffline={isOffline} 
            isAuto={isAuto}
            setIsAuto={setIsAuto} 
          />
        </div>
        <FeedSchedule isAuto={isAuto} />
      </div>
    </div>
  );
}