import { _seedCommentReactions } from "./lib";

const seed = async () => {
  await Promise.all(_seedCommentReactions());
};

export async function GET() {
  try {
    await seed();
    //await seedUser();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
