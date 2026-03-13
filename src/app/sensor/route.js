export async function GET() {

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch("http://192.168.1.14/sensor", {
      cache: "no-store",
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("ESP Response Not OK");

    const data = await res.json();

    return Response.json({
      ...data,
      timestamp: new Date().toISOString(),
      status: "online"
    });

  } catch (error) {
    return Response.json(
      { error: "ESP offline", status: "offline" },
      { status: 503 } 
    );
  }
}

