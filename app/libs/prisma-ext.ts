import prisma from "./prisma";

//import prisma from "./prisma";
const prismaEXT_POST_USER = prisma.$extends({
  result: {
    post_USER: {
      comments_count: {
        needs: { id: true },
        compute(post) {
          return prisma.comment_USER.count();
        },
      },

      reactions_count: {
        needs: { id: true },
        compute(post) {
          return prisma.postReactions_USER.count();
        },
      },
      reactions_grouped: {
        needs: { id: true },
        compute(post) {
          return prisma.postReactions_USER.aggregate({
            _count: {
              reactionType: true,
            },
            where: {
              postId: post.id,
            },
          });
        },
      },
    },
  },
});

export { prismaEXT_POST_USER };
