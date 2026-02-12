import { z } from 'zod/v4'

export const ZGithubUser = z.object({
  id: z.number(),
  type: z.string(),
  login: z.string(),
  html_url: z.url(),
  avatar_url: z.url(),
  name: z.string().nullish(),
  email: z.string().nullish(),
})

//
//
//
//

export type TGithubUser = z.infer<typeof ZGithubUser>
