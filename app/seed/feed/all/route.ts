import { _make_all_posts_dynamic, _update_all_posts } from "./lib";

export async function GET() {
  try {
    await Promise.all([_update_all_posts(), _make_all_posts_dynamic()]);
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
