import { _seedReactions } from "./lib";

const seed = async () => {
  await Promise.all(_seedReactions());
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
