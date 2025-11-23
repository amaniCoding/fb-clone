import { _seedFeeds, createUserShareMediaPost } from "./libs";

export async function GET() {
  try {
    //await _seedFeeds();
    await createUserShareMediaPost();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
