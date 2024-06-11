export interface Video {
  id: string
  title: string
  date: Date
  duration: string
  channel: { name: string; title: string }
  tags?: { name: string }[]
}
