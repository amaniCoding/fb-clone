import { _seedFeeds, _seedUserPost, _seedUserSharePost } from "./libs";

export async function GET() {
  try {
    /**
     * first seed
     */
    //await _seedFeeds();
    /**
     * second seed
     */
    //await _seedUserSharePost();
    /** last seed */
    //await _seedUserPost();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
