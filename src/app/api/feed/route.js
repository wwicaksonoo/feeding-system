

import { db } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const feedRef = ref(db, "control/feed");
    

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