import React, { useState } from "react";

// --- INTERFACES ---
interface CalendarioProps {
  trainerId: number;
  trainerName: string;
}

interface Slot {
  row: string;
  col: string;
}

interface EntrenadorMock {
  id: number;
  horarios: Slot[];       
  reservasActuales: Slot[]; 
}

const Calendario1: React.FC<CalendarioProps> = ({ trainerId, trainerName }) => {
  
  // --- MOCK DATA ---
  const misPerros = ["Rex", "Luna", "Chokita"];

  const dbHorarios: EntrenadorMock[] = [
    {
      id: 1, 
      horarios: [
        { row: "8:30 - 10:00", col: "Lunes" },
        { row: "10:00 - 11:30", col: "Lunes" },
        { row: "8:30 - 10:00", col: "Miercoles" },
      ],
      reservasActuales: [{ row: "10:00 - 11:30", col: "Lunes" }]
    },
    {
      id: 2,
      horarios: [
        { row: "14:30 - 16:00", col: "Martes" },
        { row: "16:00 - 17:30", col: "Martes" },
      ],
      reservasActuales: []
    },
    {
      id: 3, 
      horarios: [
        { row: "10:00 - 11:30", col: "Sábado" },
        { row: "11:30 - 13:00", col: "Sábado" },
        { row: "10:00 - 11:30", col: "Domingo" },
      ],
      reservasActuales: [{ row: "10:00 - 11:30", col: "Sábado" }]
    }
  ];

  const datosEntrenador = dbHorarios.find(e => e.id === trainerId) || { id: 0, horarios: [], reservasActuales: [] };
  
  // --- ESTADOS ---
  const [misReservas, setMisReservas] = useState<Slot[]>([]);
  
  // Estados para el MODAL y SIMULACIÓN DE PAGO
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [perroSeleccionado, setPerroSeleccionado] = useState(misPerros[0]);
  
  // Estado para la animación de carga (Texto cambiante)
  const [estadoPago, setEstadoPago] = useState<"idle" | "connecting" | "verifying" | "approved">("idle");

  const columns = [
    { name: "Lunes" }, { name: "Martes" }, { name: "Miercoles" },
    { name: "Jueves" }, { name: "Viernes" }, { name: "Sábado" }, { name: "Domingo" }
  ];
  const rows = [
    "8:30 - 10:00", "10:00 - 11:30", "11:30 - 13:00",
    "13:00 - 14:30", "14:30 - 16:00", "16:00 - 17:30"
  ];

  // --- HELPERS ---
  const obtenerFechaProxima = (diaNombre: string, horaRango: string): Date => {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
    const targetDayIndex = diasSemana.indexOf(diaNombre);
    const fecha = new Date();
    const currentDayIndex = fecha.getDay();
    let daysUntilTarget = targetDayIndex - currentDayIndex;
    if (daysUntilTarget <= 0) daysUntilTarget += 7;
    fecha.setDate(fecha.getDate() + daysUntilTarget);
    const horaInicio = horaRango.split(" - ")[0];
    const [horas, minutos] = horaInicio.split(":").map(Number);
    fecha.setHours(horas, minutos, 0, 0);
    return fecha;
  };

  const esHorarioLaboral = (row: string, col: string) => 
    datosEntrenador.horarios.some(h => h.row === row && h.col === col);
  const estaOcupadoPorOtros = (row: string, col: string) => 
    datosEntrenador.reservasActuales.some(r => r.row === row && r.col === col);
  const esMiReserva = (row: string, col: string) => 
    misReservas.some(r => r.row === row && r.col === col);

  // --- HANDLERS ---
  const handleCellClick = (row: string, col: string) => {
    if (!esHorarioLaboral(row, col)) return;
    if (estaOcupadoPorOtros(row, col)) {
      alert("Horario ocupado."); return;
    }
    if (esMiReserva(row, col)) {
      alert("Ya tienes esta hora."); return;
    }

    // Abrimos el modal
    setSelectedSlot({ row, col });
    setEstadoPago("idle"); // Reseteamos el estado del pago
    setModalOpen(true);
  };

  const handleConfirmarPago = async () => {
    if (!selectedSlot) return;

    // --- 1. INICIO DE SIMULACIÓN VISUAL ---
    setEstadoPago("connecting"); // "Conectando con el banco..."
    
    // Esperamos 1.5 segundos
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEstadoPago("verifying"); // "Verificando saldo..."
    
    // Esperamos otros 1.5 segundos
    await new Promise(resolve => setTimeout(resolve, 1500));

    // --- 2. PREPARACIÓN DE DATOS ---
    const fechaCita = obtenerFechaProxima(selectedSlot.col, selectedSlot.row);
    
    // TRADUCCIÓN DE ID (Para evitar error de MongoDB ObjectId)
    const trainerIdMap: Record<number, string> = {
        1: "656e9b431c9d440000000001", 
        2: "656e9b431c9d440000000002",
        3: "656e9b431c9d440000000003", 
    };
    const validMongoTrainerId = trainerIdMap[trainerId] || "656e9b431c9d440000000000";

    const bookingData = {
      ownerId: "656e9b431c9d440000000000",
      trainerId: validMongoTrainerId,
      date: fechaCita.toISOString(),
      totalPrice: 25000,
      durationHours: 1.5,
      dogName: perroSeleccionado,
      status: "PAID"
    };

    try {
      // --- 3. ENVÍO REAL AL BACKEND ---
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setEstadoPago("approved"); // "¡Pago Aprobado!"
        
        // Esperamos un poquito para que el usuario vea el éxito
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMisReservas([...misReservas, selectedSlot]);
        setModalOpen(false); // Cerramos modal
        alert(`✅ ¡Pago Exitoso! Cita confirmada para ${perroSeleccionado}.`);
      } else {
        const errorData = await response.json();
        console.error("Error Backend:", errorData);
        alert("❌ Error en el pago: " + (errorData.message || "Revisa la consola del navegador"));
        setEstadoPago("idle"); // Volver a permitir intentar
      }
    } catch (error) {
      console.error("Error Red:", error);
      alert("⚠️ Error de conexión con el servidor. Verifica que el Backend esté encendido.");
      setEstadoPago("idle");
    }
  };

  // Función auxiliar para el texto del botón según el estado
  const getButtonText = () => {
    switch (estadoPago) {
        case "connecting": return "Conectando con Banco...";
        case "verifying": return "Verificando Fondos...";
        case "approved": return "¡Pago Aprobado! 🎉";
        default: return "Pagar $25.000";
    }
  };

  const getButtonStyle = (): React.CSSProperties => {
    const base = { flex: 1, padding: "12px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", color: "white", transition: "all 0.3s" };
    switch (estadoPago) {
        case "connecting": return { ...base, backgroundColor: "#f39c12" }; // Naranja
        case "verifying": return { ...base, backgroundColor: "#3498db" }; // Azul
        case "approved": return { ...base, backgroundColor: "#27ae60" }; // Verde
        default: return { ...base, backgroundColor: "#2c3e50" }; // Azul Oscuro (Normal)
    }
  };

  // --- RENDERIZADO ---
  const getCellStyle = (row: string, col: string): React.CSSProperties => {
    const trabaja = esHorarioLaboral(row, col);
    const ocupadoDB = estaOcupadoPorOtros(row, col);
    const miReserva = esMiReserva(row, col);

    let backgroundColor = "#e9ecef"; 
    let color = "#adb5bd";
    let cursor = "default";
    let fontWeight = "normal";

    if (trabaja) {
      if (ocupadoDB) {
        backgroundColor = "#dc3545"; color = "white"; cursor = "not-allowed"; fontWeight = "bold";
      } else if (miReserva) {
        backgroundColor = "#3897f0"; color = "white"; cursor = "default"; fontWeight = "bold";
      } else {
        backgroundColor = "#87ce36"; color = "white"; cursor = "pointer";
      }
    }

    return {
      border: "1px solid #dee2e6",
      padding: "15px",
      textAlign: "center",
      minWidth: "100px",
      transition: "all 0.2s",
      backgroundColor, color, cursor, fontWeight, fontSize: "0.85rem"
    };
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #eee", position: "relative" }}>
      
      {/* LEYENDA */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: 15, height: 15, background: "#87ce36", borderRadius: "3px" }}></div> <span>Disponible</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: 15, height: 15, background: "#dc3545", borderRadius: "3px" }}></div> <span>Ocupado</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: 15, height: 15, background: "#3897f0", borderRadius: "3px" }}></div> <span>Tu Cita</span>
        </div>
      </div>

      {/* TABLA */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: "4px", width: "100%" }}>
            <thead>
            <tr>
                <th style={{ color: "#333", padding: "10px", fontSize: "0.9rem" }}>Horario</th>
                {columns.map((col) => (
                <th key={col.name} style={{ background: "#2c3e50", color: "white", padding: "10px", borderRadius: "4px" }}>{col.name}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows.map((row) => (
                <tr key={row}>
                <td style={{ background: "#f8f9fa", padding: "10px", fontWeight: "bold", textAlign: "center", fontSize: "0.85rem", borderRadius: "4px" }}>{row}</td>
                {columns.map((col) => {
                    const style = getCellStyle(row, col.name);
                    const trabaja = esHorarioLaboral(row, col.name);
                    const ocupadoDB = estaOcupadoPorOtros(row, col.name);
                    const miReserva = esMiReserva(row, col.name);
                    let text = trabaja ? (ocupadoDB ? "OCUPADO" : miReserva ? "MÍO" : "Libre") : "";
                    return (
                    <td key={`${row}-${col.name}`} onClick={() => handleCellClick(row, col.name)} style={{...style, borderRadius: "4px"}}>
                        {text}
                    </td>
                    );
                })}
                </tr>
            ))}
            </tbody>
        </table>
      </div>

      {/* --- MODAL DE PAGO MEJORADO --- */}
      {modalOpen && selectedSlot && (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)", 
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: "white", padding: "30px", borderRadius: "10px",
                width: "90%", maxWidth: "400px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
            }}>
                <h2 style={{ marginTop: 0, color: "#2c3e50", textAlign: 'center' }}>Confirmar Reserva 💳</h2>
                
                <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                    <p style={{margin: "5px 0"}}><strong>Entrenador:</strong> {trainerName}</p>
                    <p style={{margin: "5px 0"}}><strong>Horario:</strong> {selectedSlot.col} - {selectedSlot.row}</p>
                </div>

                <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Selecciona tu Mascota:
                </label>
                <select 
                    value={perroSeleccionado}
                    onChange={(e) => setPerroSeleccionado(e.target.value)}
                    disabled={estadoPago !== "idle"} // Bloquear si está pagando
                    style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "20px", fontSize: "1rem" }}
                >
                    {misPerros.map(perro => (
                        <option key={perro} value={perro}>{perro}</option>
                    ))}
                </select>

                <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "20px 0" }} />

                <div style={{ display: "flex", gap: "10px" }}>
                    <button 
                        onClick={() => setModalOpen(false)}
                        style={{ padding: "12px", border: "none", backgroundColor: "#e74c3c", color: "white", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                        disabled={estadoPago !== "idle"}
                    >
                        Cancelar
                    </button>
                    
                    {/* BOTÓN DINÁMICO DE PAGO */}
                    <button 
                        onClick={handleConfirmarPago}
                        style={getButtonStyle()}
                        disabled={estadoPago !== "idle"}
                    >
                        {getButtonText()}
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Calendario1;