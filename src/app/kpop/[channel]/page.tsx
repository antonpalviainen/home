import { fetchChannelVideos } from '@/lib/kpop/data'

export default async function Page({
  params,
}: {
  params: { channel: string }
}) {
  const videos = await fetchChannelVideos({
    name: decodeURIComponent(params.channel),
    order: 'desc',
    page: 1,
  })

  if (!videos) {
    return <div>Channel not found</div>
  }

  return (
    <table>
      <thead>
        <tr>
          <th className="">Date</th>
          <th className="">Title</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {videos.map((video) => (
          <tr key={video.id}>
            <td className="px-4 py-2">
              {new Date(video.date).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">{video.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
