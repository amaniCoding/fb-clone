import xprisma from "../libs/prisma-ext";
import { getpost_users } from "./libs/user";

export async function GET() {
  try {
    const posts_users = await getpost_users();
    const x = await xprisma.post_USER.findFirst();

    //await seedUser();

    //console.log(await Promise.all(newposts_user));

    console.log(x?.reactions_x);
    return Response.json({ posts_user: await Promise.all(posts_users) });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
