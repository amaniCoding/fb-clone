import prisma from "./prisma";

const xprisma = prisma.$extends({
  result: {
    post_USER: {
      reactions_x: {
        needs: {},
        compute() {
          return "x";
        },
      },
    },
  },
});

export default xprisma;
