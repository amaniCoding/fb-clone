import { _add_media_comment_and_reactions } from "../../lib";

export async function GET() {
  try {
    await _add_media_comment_and_reactions();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
