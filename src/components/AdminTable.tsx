interface Col {
    title: string;
    render?: (row: any) => any;
    field?: string;
  }
  
  interface Props {
    data: any[];
    columns: Col[];
  }
  
  export default function AdminTable({ data, columns }: Props) {
    return (
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-50 border-b">
            {columns.map((c, idx) => (
              <th key={idx} className="p-3 text-left">
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
  
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b">
              {columns.map((c, idx) => (
                <td key={idx} className="p-3">
                  {c.render ? c.render(row) : row[c.field!]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }