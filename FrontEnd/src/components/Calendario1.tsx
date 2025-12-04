import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X } from "lucide-react"; // Asegúrate de tener lucide-react instalado

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

interface ChatMessage {
  sender: "me" | "trainer";
  text: string;
  time: string;
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
  
  // Estados Modal y Flujo
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [perroSeleccionado, setPerroSeleccionado] = useState(misPerros[0]);
  
  // Estado del Pago: "idle" -> "connecting" -> "verifying" -> "approved"
  const [estadoPago, setEstadoPago] = useState<"idle" | "connecting" | "verifying" | "approved">("idle");
  
  // Estado del Chat
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const columns = [
    { name: "Lunes" }, { name: "Martes" }, { name: "Miercoles" },
    { name: "Jueves" }, { name: "Viernes" }, { name: "Sábado" }, { name: "Domingo" }
  ];
  const rows = [
    "8:30 - 10:00", "10:00 - 11:30", "11:30 - 13:00",
    "13:00 - 14:30", "14:30 - 16:00", "16:00 - 17:30"
  ];

  // Auto-scroll al fondo del chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showChat]);

  // --- HELPERS ---
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

    // Reiniciamos todo el flujo al abrir el modal
    setSelectedSlot({ row, col });
    setEstadoPago("idle");
    setShowChat(false);
    setMessages([]);
    setModalOpen(true);
  };

  const handleConfirmarPago = async () => {
    if (!selectedSlot) return;

    // --- SIMULACIÓN 100% CORRECTA ---
    setEstadoPago("connecting"); 
    await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5s
    
    setEstadoPago("verifying"); 
    await new Promise(resolve => setTimeout(resolve, 1500)); // Espera 1.5s

    // ¡Éxito forzado! (No llamamos al backend para evitar errores en la demo)
    setEstadoPago("approved");
    setMisReservas([...misReservas, selectedSlot]);
    
    // Preparamos el mensaje de bienvenida del chat para cuando entre
    setMessages([
        { 
            sender: "trainer", 
            text: `¡Hola! Gracias por agendar para ${perroSeleccionado}. ¿Tiene alguna conducta específica que debamos trabajar? 🐶`, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Agregar mi mensaje
    const myMsg: ChatMessage = {
        sender: "me",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, myMsg]);
    setNewMessage("");

    // Simular respuesta del entrenador
    setTimeout(() => {
        const reply: ChatMessage = {
            sender: "trainer",
            text: "¡Entendido! Lo revisaremos en la sesión. Nos vemos pronto.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
    }, 2000);
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
      padding: "15px", textAlign: "center", minWidth: "100px", transition: "all 0.2s",
      backgroundColor, color, cursor, fontWeight, fontSize: "0.85rem"
    };
  };

  // Botón dinámico de pago
  const getButtonText = () => {
    switch (estadoPago) {
        case "connecting": return "Conectando...";
        case "verifying": return "Verificando...";
        case "approved": return "¡Pago Exitoso!";
        default: return "Pagar $25.000";
    }
  };

  const getButtonStyle = (): React.CSSProperties => {
    const base = { flex: 1, padding: "12px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", color: "white", transition: "all 0.3s" };
    switch (estadoPago) {
        case "connecting": return { ...base, backgroundColor: "#f39c12" }; 
        case "verifying": return { ...base, backgroundColor: "#3498db" }; 
        case "approved": return { ...base, backgroundColor: "#27ae60" };
        default: return { ...base, backgroundColor: "#2c3e50" }; 
    }
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

      {/* --- MODAL FLOTANTE --- */}
      {modalOpen && selectedSlot && (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)", 
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: "white", borderRadius: "10px",
                width: "90%", maxWidth: "400px", height: "500px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                display: "flex", flexDirection: "column", overflow: "hidden"
            }}>
                
                {/* 1. VISTA DE CHAT */}
                {showChat ? (
                    <>
                        <div style={{ padding: "15px", backgroundColor: "#2c3e50", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: "#ecf0f1", display: "flex", justifyContent: "center", alignItems: "center", color: "#2c3e50", fontWeight: "bold" }}>
                                    {trainerName.charAt(0)}
                                </div>
                                <span>{trainerName}</span>
                            </div>
                            <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div style={{ flex: 1, padding: "15px", backgroundColor: "#f5f6fa", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                            {messages.map((msg, idx) => (
                                <div key={idx} style={{ 
                                    alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                                    backgroundColor: msg.sender === "me" ? "#3897f0" : "white",
                                    color: msg.sender === "me" ? "white" : "#333",
                                    padding: "10px 15px", borderRadius: "15px",
                                    maxWidth: "80%", boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                    borderBottomRightRadius: msg.sender === "me" ? "2px" : "15px",
                                    borderBottomLeftRadius: msg.sender === "trainer" ? "2px" : "15px"
                                }}>
                                    <p style={{ margin: 0, fontSize: "0.9rem" }}>{msg.text}</p>
                                    <span style={{ fontSize: "0.7rem", opacity: 0.8, display: "block", textAlign: "right", marginTop: "5px" }}>{msg.time}</span>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <div style={{ padding: "10px", backgroundColor: "white", borderTop: "1px solid #eee", display: "flex", gap: "10px" }}>
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Escribe un mensaje..."
                                style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "1px solid #ddd", outline: "none" }}
                            />
                            <button onClick={handleSendMessage} style={{ background: "#3897f0", color: "white", border: "none", width: "40px", height: "40px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                                <Send size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                /* 2. VISTA DE PAGO / CONFIRMACIÓN */
                    <>
                        <div style={{ padding: "20px 30px" }}>
                            <h2 style={{ marginTop: 0, color: "#2c3e50", textAlign: 'center' }}>Confirmar Reserva 💳</h2>
                            
                            {estadoPago === "approved" ? (
                                <div style={{ textAlign: "center", padding: "20px 0" }}>
                                    <div style={{ fontSize: "3rem", marginBottom: "10px" }}>✅</div>
                                    <h3 style={{ color: "#27ae60", margin: "0 0 10px 0" }}>¡Listo!</h3>
                                    <p style={{ color: "#555" }}>Tu cita con <strong>{trainerName}</strong> para <strong>{perroSeleccionado}</strong> ha sido confirmada.</p>
                                    <p style={{ fontSize: "0.9rem", color: "#888" }}>Te hemos enviado el comprobante a tu correo.</p>
                                </div>
                            ) : (
                                <>
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
                                        disabled={estadoPago !== "idle"}
                                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "20px", fontSize: "1rem" }}
                                    >
                                        {misPerros.map(perro => (
                                            <option key={perro} value={perro}>{perro}</option>
                                        ))}
                                    </select>
                                    
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", fontWeight: "bold" }}>
                                        <span>Total:</span>
                                        <span style={{ color: "#27ae60" }}>$25.000</span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div style={{ marginTop: "auto", padding: "20px", borderTop: "1px solid #eee", display: "flex", gap: "10px" }}>
                            {estadoPago === "approved" ? (
                                <>
                                    <button 
                                        onClick={() => setModalOpen(false)}
                                        style={{ flex: 1, padding: "12px", border: "1px solid #ccc", backgroundColor: "white", color: "#333", borderRadius: "5px", cursor: "pointer" }}
                                    >
                                        Cerrar
                                    </button>
                                    <button 
                                        onClick={() => setShowChat(true)}
                                        style={{ flex: 1, padding: "12px", border: "none", backgroundColor: "#3897f0", color: "white", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                                    >
                                        <MessageCircle size={18} /> Ir al Chat
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => setModalOpen(false)}
                                        style={{ flex: 1, padding: "12px", border: "none", backgroundColor: "#e74c3c", color: "white", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                                        disabled={estadoPago !== "idle"}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        onClick={handleConfirmarPago}
                                        style={getButtonStyle()}
                                        disabled={estadoPago !== "idle"}
                                    >
                                        {getButtonText()}
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
      )}

    </div>
  );
};

export default Calendario1;