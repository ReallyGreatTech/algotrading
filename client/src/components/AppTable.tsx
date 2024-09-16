import React, { ReactNode, useState } from 'react';
import { TableColumn } from '../types';
import SortButtons from './SortButtons';

interface AppTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  tableHeadRowClassName?: string;
  tableBodyRowClassName?: string;
  tableBodyClassName?: string;
  tableClassName?: string;
  selectedRow?: T;
  expansionId?: T[keyof T];
  expansionProperty?: keyof T;
  expandComponent?: ReactNode;
  onRowClick?(row: T): void;
  onSort?: (column: keyof T, direction: 'asc' | 'desc') => void;
}

const AppTable = <T extends {}>({
  columns = [],
  selectedRow,
  data = [],
  expansionId,
  expansionProperty,
  expandComponent,
  tableClassName,
  tableHeadRowClassName,
  tableBodyRowClassName,
  tableBodyClassName,
  onRowClick,
  onSort,
}: AppTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  const renderCell = (row: T, column: TableColumn<T>): ReactNode => {
    if (column.render) return column.render(row);

    return row[column.value as keyof T] as string;
  };

  const raiseRowclick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleSort = (column: keyof T, direction: 'asc' | 'desc') => {
    setSortColumn(column);
    setSortDirection(direction);
    if (onSort) {
      onSort(column, direction);
    }
  };

  return (
    <table className={'w-full bg-gray-800 max-h-[600px] ' + tableClassName}>
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
              <div className="flex items-center">
                {c.label}
                {c.sortable && (
                  <SortButtons
                    sortDirection={sortColumn === c.value ? sortDirection : null}
                    onSort={(direction) => handleSort(c.value as keyof T, direction)}
                  />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className={tableBodyClassName}>
        {data.map((row, dDndex) => (
          <React.Fragment key={dDndex}>
            <tr
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
                  } ` }
                  key={`${dDndex}_${cIndex}`}
                >
                  {renderCell(row, c)}
                </td>
              ))}
            </tr>

            {row[expansionProperty as keyof T] === expansionId ? (
              <tr className="border-0">
                <td colSpan={columns.length}>{<div>{expandComponent}</div>}</td>
              </tr>
            ) : null}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default AppTable;
