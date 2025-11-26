import {
  _add_comment_and_reactions,
  _add_comment_replies_and_reactions,
  _add_media_comment_and_reactions,
  _add_media_comment_replies_and_reactions,
  _add_media_replyreplies_and_reactions,
  _add_media_replyReply_reactions,
  _add_reply_replies_and_reactions,
  _add_replyreply_reactions,
} from "./lib";

export async function GET() {
  try {
    /**
     * first seed
     */
    await _add_comment_and_reactions();
    /**
     * second seed
     */
    //await _add_comment_replies_and_reactions();
    /**
     * third seed
     */

    //await _add_reply_replies_and_reactions();
    /**
     * fourth seed
     */

    //await _add_replyreply_reactions();

    /** for media */

    /** first seed */

    //await _add_media_comment_and_reactions();

    /** second seed */

    //await _add_media_comment_replies_and_reactions();

    /** third seed */

    //await _add_media_replyreplies_and_reactions();

    /** fourth seed */

    //await _add_media_replyReply_reactions();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}
