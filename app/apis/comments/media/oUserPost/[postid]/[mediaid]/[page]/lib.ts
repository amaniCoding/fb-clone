import { GReaction, Reactor } from "@/app/apis/types";
import prisma from "@/app/libs/prisma";
const commentPreparer = {
  prepareGReactions: async (commentId: string) => {
    try {
      const r = await prisma.commentReaction.groupBy({
        by: ["reactionType"],
        _count: {
          reactionType: true,
        },
        where: {
          id: commentId,
        },
      });

      return r.map((rxn) => {
        return {
          reactionType: rxn.reactionType,
          count: rxn._count.reactionType,
        };
      });
    } catch (error) {}
  },
};
export const getComments = async (
  postId: string,
  mediaId: string,
  page: number,
  rowsPerPage: number
) => {
  const skip = (page - 1) * rowsPerPage;
  const count = prisma.oUserPost.findUnique({
    where: {
      id: postId,
    },
    select: {
      medias: {
        select: {
          _count: {
            select: {
              comments: {
                where: {
                  id: mediaId,
                },
              },
            },
          },
        },
      },
    },
  });

  const post = prisma.oUserPost.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      medias: {
        where: {
          id: mediaId,
        },
        select: {
          id: true,
          comments: {
            take: rowsPerPage,
            skip: skip,
            select: {
              id: true,
              content: true,
              createdAt: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  Profile: {
                    select: {
                      profilePicture: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const [_count, _post] = await Promise.all([count, post]);
  // greactions can be undefined
  const updatedComments = _post?.medias[0].comments.map(async (comment) => {
    return {
      ...comment,
      mediaId: _post.medias[0].id,
      postType: "oUserPost",
      _gReactions: await commentPreparer.prepareGReactions(comment.id),
      _reactions: {
        header: {
          loading: false,
          currentReactionType: undefined,
          gReactions: [] as GReaction[],
          error: "",
        },
        body: [] as Reactor[],
      },
    };
  });
  // reuslt can be undefined
  const result = updatedComments && (await Promise.all(updatedComments));
  return {
    result,
    count: _count?.medias[0]._count.comments,
  };
};
