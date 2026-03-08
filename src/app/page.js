import Clock from "@/components/clock";
import FeedSchedule from "@/components/feed";
import Stats from "@/components/stats";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0f0931] ">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="flex flex-col items-start rounded-lg p-8 text-white ">
                        <span className="text-xs opacity-50">Live Monitoring</span>
                        <h1 className="font-bold text-3xl">Fish Aquarium </h1>
                        <span className="text-[10px] opacity-50">Monitoring and Control System</span>
                    </div>

                    <div className="p-8 flex text-right items-center text-sm">
                        <Clock />
                    </div>
                </div>

                <div className="p-8">
                    <Stats />
                </div>

                <FeedSchedule />
            </div>
        </div>
    );
}
