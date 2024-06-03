import { ReactNode } from 'react';
import { TableColumn } from '../types';

interface AppTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

const AppTable = <T extends {}>({
  columns = [],
  data = [],
}: AppTableProps<T>) => {
  const renderCell = (row: T, column: TableColumn<T>): ReactNode => {
    if (column.render) return column.render(row);

    return row[column.value as keyof T] as string;
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((c) => (
            <th className="min-w-[8em]" align="left">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, dDndex) => (
          <tr key={dDndex}>
            {columns.map((c, cIndex) => (
              <td className="py-5" key={`${dDndex}_${cIndex}`}>
                {renderCell(row, c)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppTable;
