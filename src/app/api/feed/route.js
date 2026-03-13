export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 

  try {
    const res = await fetch("http://192.168.1.14/feed", { 
      cache: "no-store",
      signal: controller.signal 
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error();
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ status: "error" }, { status: 500 });
  }
}