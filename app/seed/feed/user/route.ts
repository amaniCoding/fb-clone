import { _seedUserPost } from "../libs";

export async function GET() {
  try {
    await _seedUserPost();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
