import { db } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Paksa jangan pake cache

export async function GET() {
  try {
    const sensorRef = ref(db, "sensor");
    const snapshot = await get(sensorRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return NextResponse.json({
        water: data.water || 0,
        temp: data.temp || 0, 
        status: "online"
      });
    } else {
      return NextResponse.json({ status: "offline", reason: "Data sensor tidak ditemukan" });
    }
  } catch (error) {
    return NextResponse.json({ status: "offline", error: error.message }, { status: 500 });
  }
}