import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./libs/auth";
import prisma from "./libs/prisma";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",

      async authorize(credentials) {
        if (!credentials) {
          throw new CredentialsSignin("Invalid credentials");
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
            throw new CredentialsSignin("Invalid credentials");
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
          throw new CredentialsSignin("Invalid credentials");
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
