export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Save customer signup
    if (url.pathname === "/api/signup" && request.method === "POST") {
      try {
        const data = await request.json();

        const name = String(data.name || "").trim();
        const phone = String(data.phone || "").trim();

        if (!name || !phone) {
          return Response.json(
            { success: false, error: "Name and phone are required." },
            { status: 400 }
          );
        }

        await env.DB.prepare(
          "INSERT INTO signups (name, phone) VALUES (?, ?)"
        )
          .bind(name, phone)
          .run();

        return Response.json({ success: true });
      } catch (error) {
        return Response.json(
          { success: false, error: "Unable to save signup." },
          { status: 500 }
        );
      }
    }

    // Return customer signups for the admin dashboard
    if (url.pathname === "/api/signups" && request.method === "GET") {
      const result = await env.DB.prepare(
        "SELECT id, name, phone, created_at FROM signups ORDER BY created_at DESC"
      ).all();

      return Response.json(result.results);
    }

    // Serve the existing website
    return env.ASSETS.fetch(request);
  }
};
