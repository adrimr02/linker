import { TRPCError, type inferAsyncReturnType, initTRPC } from '@trpc/server'
import { ZodError } from 'zod'
import superjson from 'superjson';
import { getAuthSession } from '@/lib/auth/config'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await getAuthSession()

  return {
    session
  }
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },

})

export const createTRPCRouter = t.router

const enforceUserIsAuthed = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    }
  })
})

export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)

export type Context = inferAsyncReturnType<typeof createTRPCContext>;