import NextAuth, { AuthError, DefaultSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Credentials from "next-auth/providers/credentials";
import { User } from "./lib/model";
import "next-auth/jwt";
import { http } from "./network/http";

interface IUser extends User {
  id: string;
  emailVerified: Date;
  token: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: IUser;
  }
}

declare module "next-auth" {
  interface Session {
    user?: User & DefaultSession["user"];
  }
}

/**
 * NextAuth configuration
 */
const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ email, password }) {
        const response = await http("login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });

        return response.data!;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  jwt: {
    maxAge: 60 * 60,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user as IUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.sessionToken = token.user.token;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { auth, handlers, signIn, signOut, unstable_update, SessionProvider };
