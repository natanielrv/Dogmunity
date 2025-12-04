import React, { useState, useEffect } from "react";
import { 
  addBooking, 
  getBookingsByTrainerId,
  getTrainerSchedule,
  type Booking 
} from "../db/bookings.mock";

interface CalendarioProps {
  trainerId?: number;
  trainerName?: string;
  trainerPrice?: number;
}

const Calendario1: React.FC<CalendarioProps> = ({ trainerId = 1, trainerName = "Entrenador", trainerPrice = 15000 }) => {
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [trainerSchedule, setTrainerSchedule] = useState<Array<{ day: string; time: string }>>([]);
  const [cart, setCart] = useState<Array<{ date: Date; time: string; day: string }>>([]);

  // Horarios disponibles
  const timeSlots = [
    "8:30 - 10:00",
    "10:00 - 11:30",
    "11:30 - 13:00",
    "13:00 - 14:30",
    "14:30 - 16:00",
    "16:00 - 17:30",
  ];

  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  // Obtener días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  useEffect(() => {
    // Cargar reservas del entrenador desde el mock
    const trainerBookings = getBookingsByTrainerId(trainerId);
    setBookings(trainerBookings);

    // Cargar horarios disponibles del entrenador
    const schedule = getTrainerSchedule(trainerId);
    setTrainerSchedule(schedule);
  }, [trainerId]);

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  };

  const getDayName = (date: Date) => {
    return dayNames[date.getDay()];
  };

  const isAvailable = (date: Date, time: string) => {
    const dayName = getDayName(date);
    return trainerSchedule.some(slot => slot.time === time && slot.day === dayName);
  };

  const isBooked = (date: Date, time: string) => {
    const dateStr = date.toISOString().split('T')[0];
    // Verificar si está en reservas confirmadas o en el carrito
    const bookedInDB = bookings.some(b => b.time === time && b.date === dateStr);
    const inCart = cart.some(c => c.date.toISOString().split('T')[0] === dateStr && c.time === time);
    return bookedInDB || inCart;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleCellClick = (date: Date, time: string) => {
    if (isPastDate(date) || !isAvailable(date, time) || isBooked(date, time)) return;
    
    setSelectedSlot({ date, time });
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    if (!selectedSlot) return;

    // Agregar al carrito en lugar de reservar inmediatamente
    const newCartItem = {
      date: selectedSlot.date,
      time: selectedSlot.time,
      day: getDayName(selectedSlot.date)
    };
    
    setCart([...cart, newCartItem]);
    setShowConfirmation(false);
    // No cerrar el panel de horarios, solo actualizar
    // setSelectedSlot(null);
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handlePayment = () => {
    // No hace nada
    alert('Función de pago aún no implementada');
  };

  const cancelBooking = () => {
    setShowConfirmation(false);
    setSelectedSlot(null);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDayStyle = (date: Date | null, hasAvailability: boolean): React.CSSProperties => {
    if (!date) {
      return {
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
      };
    }

    const isPast = isPastDate(date);
    const isToday = date.toDateString() === new Date().toDateString();

    return {
      padding: "10px",
      textAlign: "center",
      backgroundColor: isPast ? "#f8f9fa" : (hasAvailability ? "#e8f5e9" : "white"),
      border: isToday ? "2px solid #87ce36" : "1px solid #e9ecef",
      cursor: hasAvailability && !isPast ? "pointer" : "default",
      opacity: isPast ? 0.5 : 1,
      fontWeight: isToday ? "bold" : "normal",
    };
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", maxWidth: "1800px", margin: "0 auto" }}>
      {/* Calendario - Columna izquierda */}
      <div style={{ flex: "1", minWidth: "800px" }}>
      {/* Navegación del mes */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        padding: "15px",
        backgroundColor: "#2c3e50",
        borderRadius: "10px",
        color: "white",
      }}>
        <button
          onClick={previousMonth}
          style={{
            padding: "10px 20px",
            backgroundColor: "#34495e",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          ← Anterior
        </button>
        <h2 style={{ margin: 0, textTransform: "capitalize", fontSize: "1.8rem" }}>
          {formatMonthYear(currentMonth)}
        </h2>
        <button
          onClick={nextMonth}
          style={{
            padding: "10px 20px",
            backgroundColor: "#34495e",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Siguiente →
        </button>
      </div>

      {/* Leyenda */}
      <div style={{
        textAlign: "center",
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
      }}>
        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          <span>
            <span style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              backgroundColor: "#e8f5e9",
              marginRight: "8px",
              verticalAlign: "middle",
              borderRadius: "3px",
              border: "1px solid #ddd",
            }}></span>
            Con disponibilidad
          </span>
          <span>
            <span style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              backgroundColor: "#87ce36",
              marginRight: "8px",
              verticalAlign: "middle",
              borderRadius: "3px",
            }}></span>
            Horario disponible
          </span>
          <span>
            <span style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              backgroundColor: "#ff6b6b",
              marginRight: "8px",
              verticalAlign: "middle",
              borderRadius: "3px",
            }}></span>
            Reservado
          </span>
        </div>
        <p style={{ margin: "10px 0 0 0", color: "#666", fontSize: "0.9rem" }}>
          Haz clic en un día para ver horarios disponibles
        </p>
      </div>

      {/* Calendario mensual */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
        marginBottom: "30px",
      }}>
        {/* Encabezados de días */}
        {daysOfWeek.map(day => (
          <div key={day} style={{
            padding: "15px",
            textAlign: "center",
            backgroundColor: "#2c3e50",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "5px",
          }}>
            {day}
          </div>
        ))}

        {/* Días del mes */}
        {getDaysInMonth(currentMonth).map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} style={getDayStyle(null, false)}></div>;
          }

          const dayName = getDayName(date);
          const hasAvailability = trainerSchedule.some(slot => slot.day === dayName);
          
          // Calcular horarios disponibles (no reservados) para este día
          const availableSlotsCount = trainerSchedule
            .filter(slot => slot.day === dayName)
            .filter(slot => !isBooked(date, slot.time))
            .length;
          
          return (
            <div
              key={date.toISOString()}
              style={getDayStyle(date, hasAvailability && availableSlotsCount > 0)}
              onClick={() => {
                if (hasAvailability && availableSlotsCount > 0 && !isPastDate(date)) {
                  // Mostrar horarios disponibles para ese día
                  const availableTimesForDay = trainerSchedule
                    .filter(slot => slot.day === dayName)
                    .map(slot => slot.time);
                  
                  if (availableTimesForDay.length > 0) {
                    setSelectedSlot({ date, time: availableTimesForDay[0] });
                  }
                }
              }}
            >
              <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                {date.getDate()}
              </div>
              {hasAvailability && !isPastDate(date) && availableSlotsCount > 0 && (
                <div style={{ fontSize: "0.7rem", color: "#27ae60", marginTop: "5px" }}>
                  {availableSlotsCount} {availableSlotsCount === 1 ? 'horario' : 'horarios'}
                </div>
              )}
              {hasAvailability && !isPastDate(date) && availableSlotsCount === 0 && (
                <div style={{ fontSize: "0.7rem", color: "#e74c3c", marginTop: "5px" }}>
                  Lleno
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Vista de horarios del día seleccionado */}
      {selectedSlot && (
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}>
            Horarios disponibles - {getDayName(selectedSlot.date)} {selectedSlot.date.getDate()}/{selectedSlot.date.getMonth() + 1}
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "15px",
          }}>
            {timeSlots
              .filter(time => isAvailable(selectedSlot.date, time))
              .map(time => {
                const booked = isBooked(selectedSlot.date, time);
                return (
                  <button
                    key={time}
                    onClick={() => {
                      if (!booked) {
                        setSelectedSlot({ date: selectedSlot.date, time });
                        setShowConfirmation(true);
                      }
                    }}
                    disabled={booked}
                    style={{
                      padding: "15px",
                      backgroundColor: booked ? "#ff6b6b" : "#87ce36",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: booked ? "not-allowed" : "pointer",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      transition: "all 0.2s",
                      opacity: booked ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!booked) e.currentTarget.style.backgroundColor = "#6fb828";
                    }}
                    onMouseLeave={(e) => {
                      if (!booked) e.currentTarget.style.backgroundColor = "#87ce36";
                    }}
                  >
                    {time}
                    {booked && <div style={{ fontSize: "0.8rem", marginTop: "5px" }}>✓ Reservado</div>}
                  </button>
                );
              })}
          </div>
          <button
            onClick={() => setSelectedSlot(null)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              display: "block",
              margin: "20px auto 0",
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      {showConfirmation && selectedSlot && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            maxWidth: "400px",
            textAlign: "center",
          }}>
            <h3 style={{ marginTop: 0, color: "#2c3e50" }}>Confirmar Reserva</h3>
            <p style={{ fontSize: "1.1rem", margin: "20px 0" }}>
              <strong>{getDayName(selectedSlot.date)} {selectedSlot.date.getDate()}/{selectedSlot.date.getMonth() + 1}/{selectedSlot.date.getFullYear()}</strong>
              <br />
              {selectedSlot.time}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#666", margin: "10px 0" }}>
              Se agregará al carrito de compras
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={confirmBooking}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#87ce36",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#6fb828"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#87ce36"}
              >
                ✓ Agregar al Carrito
              </button>
              <button
                onClick={cancelBooking}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#5a6268"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#6c757d"}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Panel de Carrito - Columna derecha */}
      <div style={{ 
        width: "400px", 
        backgroundColor: "white", 
        borderRadius: "10px", 
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        position: "sticky",
        top: "20px",
        height: "fit-content",
        maxHeight: "calc(100vh - 40px)",
        overflowY: "auto"
      }}>
        <h3 style={{ 
          margin: "0 0 20px 0", 
          color: "#2c3e50",
          fontSize: "1.5rem",
          borderBottom: "2px solid #87ce36",
          paddingBottom: "10px"
        }}>
          🛒 Carrito de Reservas
        </h3>

        {cart.length === 0 ? (
          <p style={{ 
            textAlign: "center", 
            color: "#999", 
            padding: "40px 20px",
            fontSize: "1rem"
          }}>
            No hay horarios seleccionados
          </p>
        ) : (
          <>
            <div style={{ marginBottom: "20px" }}>
              {cart.map((item, index) => (
                <div key={index} style={{
                  padding: "15px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #e9ecef"
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold", color: "#2c3e50", marginBottom: "5px" }}>
                      {item.day} {item.date.getDate()}/{item.date.getMonth() + 1}
                    </div>
                    <div style={{ color: "#666", fontSize: "0.9rem" }}>
                      {item.time}
                    </div>
                    <div style={{ color: "#27ae60", fontSize: "0.9rem", fontWeight: "bold", marginTop: "5px" }}>
                      ${trainerPrice.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#e74c3c",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "bold"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c0392b"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e74c3c"}
                  >
                    ✕ Quitar
                  </button>
                </div>
              ))}
            </div>

            <div style={{
              borderTop: "2px solid #e9ecef",
              paddingTop: "15px",
              marginBottom: "20px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontSize: "1rem",
                color: "#666"
              }}>
                <span>Cantidad de horas:</span>
                <span style={{ fontWeight: "bold" }}>{cart.length}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "#2c3e50"
              }}>
                <span>Total:</span>
                <span style={{ color: "#27ae60" }}>${(cart.length * trainerPrice).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#87ce36",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1.2rem",
                fontWeight: "bold",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#6fb828"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#87ce36"}
            >
              💳 PAGAR
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendario1;