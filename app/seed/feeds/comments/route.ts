import { _seedComments } from "./lib";

const seed = async () => {
  await Promise.all(_seedComments());
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
