// export async function GET() {
//   const controller = new AbortController();
//   const timeoutId = setTimeout(() => controller.abort(), 3000); // 

//   try {
//     const res = await fetch("http://192.168.1.14/feed", { 
//       cache: "no-store",
//       signal: controller.signal 
//     });
    
//     clearTimeout(timeoutId);
    
//     if (!res.ok) throw new Error();
//     const data = await res.json();
//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ status: "error" }, { status: 500 });
//   }
// }

import { db } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const feedRef = ref(db, "control/feed");
    
    // Set nilai ke true agar ESP8266 baca perintah
    await set(feedRef, true);

    return NextResponse.json({ 
      success: true, 
      message: "Perintah pakan berhasil dikirim!" 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}