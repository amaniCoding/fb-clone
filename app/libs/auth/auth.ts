import { verifyPassword } from "@/app/libs/auth/verifypassword";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "../prisma";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        if (credentials.isNewUser) {
          return {
            id: credentials.id as string,
            email: credentials.email as string,
            firstName: credentials.firstName as string,
            lastName: credentials.lastName as string,
            profilePicture: credentials.profilePicture as string,
          };
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          if (!user) {
            return null;
          }

          const isValid = await verifyPassword(
            credentials.password as string,
            user.password
          );
          if (isValid) {
            return {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              profilePicture:
                user.gender === "male"
                  ? "/brands/male-d.jpg"
                  : "/brands/female-d.jpg",
            };
          }
          return null;
        } catch {
          throw new Error("Back");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized({ auth }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },

    async jwt({ token, user }) {
      // Add user ID to token on sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profilePicture = user.profilePicture;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user ID to session

      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.profilePicture = token.profilePicture as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
