
import Calendario1 from "../../components/Calendario1";
import React from "react";
const Table: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        border: "2px solid #ddd",
        borderRadius: "12px",
        width: "100%",
      }}
    >
      {/* --- Caja izquierda --- */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "250px",
        }}
      >
        {/* Caja vacía arriba */}
        <div
          style={{
            height: "150px",
            border: "2px solid #aaa",
            borderRadius: "10px",
            background: "#fafafa",
          }}
        >
          {/* Puedes poner una imagen o texto aquí si quieres */}
        </div>

        {/* Caja del botón abajo */}
        <div
          style={{
            height: "150px",
            border: "2px solid #aaa",
            borderRadius: "10px",
            position: "relative",
            background: "#fafafa",
          }}
        >
          <button
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              padding: "10px 20px",
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Guardar
          </button>
        </div>
      </div>

      {/* --- Caja derecha (tu tabla) --- */}
      <div
        style={{
          flex: 1,
          border: "2px solid #aaa",
          borderRadius: "10px",
          padding: "15px",
          overflowX: "auto",
        }}
      >
        <Calendario1 />
      </div>
    </div>
  );
};

export default Table;
