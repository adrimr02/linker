import { publicProcedure, createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async () => {
    return [10,20,30,40,50]
  })
})

export type AppRouter = typeof appRouter
