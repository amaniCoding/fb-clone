import { _remove } from "./libs";

const remove = async () => {
  await _remove();
};
export async function GET() {
  try {
    await remove();
    //await seedUser();
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
