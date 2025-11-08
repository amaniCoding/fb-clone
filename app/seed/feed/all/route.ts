import {
  _seedGroupPost,
  _seedPagePost,
  _seedPageSharePost,
  _seedToGroupSharePost,
  _seedUserPost,
  _seedUserSharePost,
} from "./lib";

export async function GET() {
  try {
    await _seedUserPost();
    await _seedPagePost();
    await _seedGroupPost();
    await _seedUserSharePost();
    await _seedPageSharePost();
    await _seedToGroupSharePost();
    //await seedUser();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
