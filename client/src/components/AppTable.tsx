import React, { ReactNode } from 'react';
import { TableColumn } from '../types';

interface AppTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  tableHeadRowClassName?: string;
  tableBodyRowClassName?: string;
  tableBodyClassName?: string;
  selectedRow?: T;
  expansionId: boolean;
  onRowClick?(row: T): void;
}

const AppTable = <T extends {}>({
  columns = [],
  selectedRow,
  data = [],
  tableHeadRowClassName,
  tableBodyRowClassName,

  tableBodyClassName,

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
    <table className="w-full bg-gray-800 max-h-[600px]">
      <thead>
        <tr
          className={`bg-[#334154] text-white/90 text-sm ${tableHeadRowClassName}`}
        >
          {columns.map((c, cIndex) => (
            <th
              className={`py-3 px-2 ${c.tableHeadCellClassName || ''}`}
              align="left"
              key={cIndex}
            >
              {c.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={tableBodyClassName}>
        {data.map((row, dDndex) => (
          <React.Fragment>
            <tr
              key={dDndex}
              onClick={() => raiseRowclick(row)}
              className={`text-white/80 border-b border-white/10 last:border-b-0 hover:bg-primary/90 ${
                selectedRow === row ? 'bg-primary' : ''
              }
            }} ${tableBodyRowClassName}`}
            >
              {columns.map((c, cIndex) => (
                <td
                  className={`py-3 px-2 text-sm ${
                    c.tableBodyCellClassName || ''
                  }`}
                  key={`${dDndex}_${cIndex}`}
                >
                  {renderCell(row, c)}
                </td>
              ))}
            </tr>

            {/* <tr>
              <td className="bg-red-500  w-full" colSpan={columns.length}>
                <div className="py-10 flex justify-center">Hello World</div>
              </td>
            </tr> */}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default AppTable;
