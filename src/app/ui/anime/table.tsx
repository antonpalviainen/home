export default function Table() {
  return (
    <table className="border border-black">
      <thead>
        <tr className="border border-black">
          <th className="p-1">Number</th>
          <th className="p-1">Title</th>
          <th className="p-1">Series</th>
          <th className="p-1">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border border-black">
          <td className="p-1">1</td>
          <td className="p-1">Episode 1</td>
          <td className="p-1">Series 1</td>
          <td className="p-1">2022-01-01</td>
        </tr>
        <tr className="border border-black">
          <td className="p-1">2</td>
          <td className="p-1">Episode 2</td>
          <td className="p-1">Series 2</td>
          <td className="p-1">2022-01-02</td>
        </tr>
        <tr className="border border-black">
          <td className="p-1">3</td>
          <td className="p-1">Episode 3</td>
          <td className="p-1">Series 3</td>
          <td className="p-1">2022-01-03</td>
        </tr>
      </tbody>
    </table>
  )
}
