export async function GET() {
    console.log("ESP32 connected!");

    return Response.json({
        message: "Hello ESP32",
    });
}
