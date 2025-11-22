import { _seedAll } from "./lib";

export async function GET() {
  try {
    await _seedAll();
    //await seedUser();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
