import React from "react";

const Calendario1: React.FC = () => {
  //Columnas de la tabla
    const columns = [
    { name: "Lunes" },
    { name: "Martes" },
    { name: "Miercoles" },
    { name: "Jueves" },
    { name: "Viernes" },
    { name: "Sábado" },
    { name: "Domingo" },
    ];
    //Filas de la tabla
    const rows = [
    "8:30 - 10:00",
    "10:00 - 11:30",
    "11:30 - 13:00",
    "13:00 - 14:30",
    "14:30 - 16:00",
    "16:00 - 17:30",
    ];
    //Celdas que indican horarios disponibles
    const celdasColoreadas = [
    { row: "10:00 - 11:30", col: "Lunes" },
    { row: "14:30 - 16:00", col: "Miercoles" },
    { row: "8:30 - 10:00", col: "Viernes" }
    ];
    const esColoreada = (row: string, col: string) =>
        celdasColoreadas.some(
            (c) => c.row === row && c.col === col
        );


  const tableStyle: React.CSSProperties = {
    borderCollapse: "collapse",
    margin: "20px auto",
    width: "auto",          // Con esto no ocupará todo el ancho de la página
  };

  const thStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px 12px",
    textAlign: "center",
    background: "#f0f0f0",
  };

  const tdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px 12px",
    textAlign: "center",
    minWidth: "80px",       //Con esto las celdas serán más compactas
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}></th> {/* Para la columna de horas */}
          {columns.map((column) => (
            <th key={column.name} style={thStyle}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row}>
            <td style={thStyle}>{row}</td>
            {columns.map((col) => (
              <td key={`${row}-${col.name}`} style={{...tdStyle, backgroundColor: esColoreada(row, col.name) ? "#87ce36ff" : "white"}}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendario1;
