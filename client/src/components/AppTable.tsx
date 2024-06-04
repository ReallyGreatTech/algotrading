import { ReactNode } from 'react';
import { TableColumn } from '../types';

interface AppTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  tableHeadRowClassName?: string;
  tableBodyRowClassName?: string;
  onRowClick?(row: T): void;
}

const AppTable = <T extends {}>({
  columns = [],
  data = [],
  tableHeadRowClassName,
  tableBodyRowClassName,
  onRowClick,
}: AppTableProps<T>) => {
  const renderCell = (row: T, column: TableColumn<T>): ReactNode => {
    if (column.render) return column.render(row);

    return row[column.value as keyof T] as string;
  };

  const raiseRowclick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <table className="w-full">
      <thead>
        <tr className={tableHeadRowClassName}>
          {columns.map((c, cIndex) => (
            <th
              className={`min-w-[8em] ${c.tableHeadCellClassName || ''}`}
              align="left"
              key={cIndex}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, dDndex) => (
          <tr
            key={dDndex}
            onClick={() => raiseRowclick(row)}
            className={tableBodyRowClassName}
          >
            {columns.map((c, cIndex) => (
              <td
                className={`py-5 ${c.tableBodyCellClassName || ''}`}
                key={`${dDndex}_${cIndex}`}
              >
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
