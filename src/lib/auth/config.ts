import { type NextAuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { nanoid } from "nanoid"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema"
import { env } from "@/lib/env"
import { PlanetScaleAdapter } from "@/lib/auth/PlanetScaleAdapter"

export const authOptions: NextAuthOptions = {
  adapter: PlanetScaleAdapter(db),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email ?? ''),
      })

      if (!dbUser) {
        if (user) token.id = user.id
        return token
      }

      if (!dbUser.username) {
        await db.update(users)
          .set({ username: nanoid(10) })
          .where(eq(users.id, dbUser.id))
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      }
    },
    redirect() {
      return '/'
    }
  },
}

export const getAuthSession = () => getServerSession(authOptions)