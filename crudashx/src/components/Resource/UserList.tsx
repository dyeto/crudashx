// components/UserList.tsx
import React from "react";
import { useGetAll } from "../../contexts";
import { ResourceViewConfig } from "../../types";

export const ListItems = ({
  title,
  config,
}: {
  title: string;
  config?: ResourceViewConfig;
}) => {
  const { items, loading, error, refresh } = useGetAll<any>();

  if (loading) return <p className="min-w-full">Loading data...</p>;
  if (error) return <p className="min-w-full">Error: {error.message}</p>;
  if (!items || items.length === 0)
    return <p className="min-w-full">No data available.</p>;

  // Dynamically infer all columns
  const allColumns = Object.keys(items[0]);

  // Extract config for the 'list' view
  const listConfig = config?.list;

  // Determine columns based on config
  let columns = allColumns;
  if (listConfig?.include) columns = listConfig.include;
  if (listConfig?.exclude)
    columns = columns.filter((c) => !((listConfig.exclude || []).indexOf(c) !== -1));

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-purple-500">{title}</h2>
        <button
          onClick={refresh}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Refresh
        </button>
      </div>

      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 border-b border-gray-300">
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left px-3 py-2 font-semibold">
                {listConfig?.labels?.[col] ?? col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, rowIndex: number) => (
            <tr
              key={item.id || rowIndex}
              className="border-b hover:bg-gray-50 transition"
            >
              {columns.map((col) => {
                const Renderer = listConfig?.renderers?.[col];
                const value = item[col];
                return (
                  <td key={col} className="px-3 py-2">
                    {Renderer ? <Renderer value={value} /> : renderValue(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to display complex values nicely
const renderValue = (value: any) => {
  if (value === null || value === undefined) return "-";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};
