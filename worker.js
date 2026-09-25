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
        "SELECT id, name, phone, created_at, status FROM signups ORDER BY created_at DESC"
      ).all();

      return Response.json(result.results);
    }
// Update customer signup status
if (url.pathname === "/api/signups/status" && request.method === "POST") {
  try {
    const data = await request.json();
    const id = Number(data.id);
    const status = String(data.status || "").trim();

    if (!id || !["New", "Contacted"].includes(status)) {
      return Response.json(
        { success: false, error: "Invalid ID or status." },
        { status: 400 }
      );
    }

    await env.DB.prepare(
      "UPDATE signups SET status = ? WHERE id = ?"
    )
      .bind(status, id)
      .run();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error: "Unable to update status." },
      { status: 500 }
    );
  }
}
    // Delete all customer signups
if (url.pathname === "/api/signups/delete-all" && request.method === "POST") {
  try {
    await env.DB.prepare("DELETE FROM signups").run();

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error: "Unable to delete signups." },
      { status: 500 }
    );
  }
}
    // Serve the existing website
    return env.ASSETS.fetch(request);
  }
};
