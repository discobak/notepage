const EVENTOS = [
  { evento: "DP10", data: "2 de outubro de 2026" },
];

export default function Agenda() {
  return (
    <table className="sheet">
      <thead>
        <tr>
          <th>Evento</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {EVENTOS.map((e) => (
          <tr key={e.evento + e.data}>
            <td>{e.evento}</td>
            <td>{e.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
