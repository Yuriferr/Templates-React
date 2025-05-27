import { useState, useEffect } from "react";
import "./TableList.css"; // Certifique-se de que este arquivo CSS exista ou remova a importação

export default function TableList({ title, columns, data }) {
  const [items, setItems] = useState([]);
  const [sortConfig, setSortConfig] = useState(null); // { key: string, direction: 'asc' | 'desc' }

  useEffect(() => {
    setItems(data || []);
  }, [data]);

  function handleSort(key) {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  }

  const visibleFields = columns || [];

  let sortedItems = [...items];
  if (sortConfig && sortConfig.key) {
    sortedItems.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (typeof aValue === 'object' && aValue !== null) aValue = JSON.stringify(aValue);
      if (typeof bValue === 'object' && bValue !== null) bValue = JSON.stringify(bValue);

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  if (!columns || columns.length === 0) {
    return (
      <div className="TableList">
        {title && <h2>{title}</h2>}
        <p>Colunas não definidas ou dados vazios.</p>
      </div>
    );
  }

  return (
    <div className="TableList">
      {title && <h2>{title}</h2>}
      <table>
        <thead>
          <tr>
            {visibleFields.map((field) => (
              <th
                key={field.label}
                style={{ cursor: field.sortable !== false ? "pointer" : "default" }}
                onClick={() => field.sortable !== false && handleSort(field.label)}
              >
                {field.display || field.label}
                {field.sortable !== false && sortConfig?.key === field.label
                  ? sortConfig.direction === "asc"
                    ? " ▲"
                    : " ▼"
                  : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, rowIndex) => ( // Adicionado rowIndex para key única se id não for garantido
            <tr key={item.id || `row-${rowIndex}`}>
              {visibleFields.map((field) => (
                <td key={`${field.label}-${item.id || rowIndex}`}>
                  {typeof field.render === 'function' 
                    ? field.render(item[field.label], item) 
                    : (
                        typeof item[field.label] === 'object' && item[field.label] !== null 
                        ? JSON.stringify(item[field.label]) // Mostra JSON para objetos/arrays
                        : String(item[field.label] ?? '') // Converte para string, tratando null/undefined
                    )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}