import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  selectedIds?: string[];
  onSelectRow?: (id: string) => void;
  onSelectAll?: (ids: string[]) => void;
  idField: keyof T;
}

export function Table<T>({
  data,
  columns,
  onRowClick,
  selectedIds,
  onSelectRow,
  onSelectAll,
  idField,
}: TableProps<T>) {
  const allIds = data.map((item) => String(item[idField]));
  const isAllSelected = data.length > 0 && selectedIds?.length === data.length;

  return (
    <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200">
              {(onSelectRow || onSelectAll) && (
                <th className="px-6 py-4 w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                    checked={isAllSelected}
                    onChange={() => onSelectAll?.(isAllSelected ? [] : allIds)}
                  />
                </th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={cn(
                    "px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onSelectRow ? 1 : 0)}
                  className="px-6 py-12 text-center text-slate-400"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((item, rowIdx) => {
                const id = String(item[idField]);
                const isSelected = selectedIds?.includes(id);

                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick?.(item)}
                    className={cn(
                      "transition-colors duration-200 group relative",
                      onRowClick ? "cursor-pointer hover:bg-slate-50/50" : "",
                      isSelected ? "bg-indigo-50/30" : ""
                    )}
                  >
                    {(onSelectRow || onSelectAll) && (
                      <td
                        className="px-6 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                          checked={isSelected}
                          onChange={() => onSelectRow?.(id)}
                        />
                      </td>
                    )}
                    {columns.map((col, colIdx) => (
                      <td
                        key={colIdx}
                        className={cn(
                          "px-6 py-4 text-sm text-slate-600",
                          col.className
                        )}
                      >
                        {typeof col.accessor === "function"
                          ? col.accessor(item)
                          : (item[col.accessor] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
