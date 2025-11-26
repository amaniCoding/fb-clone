import { _add_replyreply_reactions } from "../../lib";

export async function GET() {
  try {
    await _add_replyreply_reactions();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
