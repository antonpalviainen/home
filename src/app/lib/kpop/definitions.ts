import { fetchVideos } from './data'

export type Videos = Awaited<ReturnType<typeof fetchVideos>>
