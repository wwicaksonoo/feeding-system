import { db } from "@/lib/firebase";
import { ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(req) {

  try {

    const body = await req.json();

    // =========================
    // FEED
    // =========================
    if (body.type === "feed") {

      await set(ref(db, "control/feed"), true);

      return NextResponse.json({
        success: true,
        message: "Feed triggered"
      });
    }

    // =========================
    // PUMP
    // =========================
    if (body.type === "pump") {

      await set(ref(db, "control/pump"), body.active);

      return NextResponse.json({
        success: true,
        message: body.active
          ? "Pump ON"
          : "Pump OFF"
      });
    }

    return NextResponse.json({
      success: false,
      message: "Invalid type"
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}