import prisma from "../../../libs/prisma";

export const getComments = async (postId: string, page: number) => {
  const offset = (page - 1) * 7;
  const post = await prisma.post_USER.findUnique({
    where: {
      id: postId,
    },
    select: {
      comments: {
        take: 7,
        skip: offset,
      },
    },
  });

  return post?.comments;
};
