export interface Booking {
  id: string;
  trainerId: number;
  trainerName: string;
  day: string;
  time: string;
  date: string;
  clientName?: string;
  createdAt: string;
}

export interface TrainerAvailability {
  trainerId: number;
  availableSlots: Array<{
    day: string;
    time: string;
  }>;
}

// Horarios disponibles por entrenador
export const TRAINER_SCHEDULES: TrainerAvailability[] = [
  {
    trainerId: 1, // Juan Pérez
    availableSlots: [
      { day: 'Lunes', time: '10:00 - 11:30' },
      { day: 'Miércoles', time: '14:30 - 16:00' },
      { day: 'Viernes', time: '8:30 - 10:00' },
      { day: 'Viernes', time: '16:00 - 17:30' }
    ]
  },
  {
    trainerId: 2, // María González
    availableSlots: [
      { day: 'Martes', time: '8:30 - 10:00' },
      { day: 'Martes', time: '11:30 - 13:00' },
      { day: 'Jueves', time: '10:00 - 11:30' },
      { day: 'Sábado', time: '8:30 - 10:00' },
      { day: 'Sábado', time: '10:00 - 11:30' }
    ]
  },
  {
    trainerId: 3, // Carlos Ruiz
    availableSlots: [
      { day: 'Lunes', time: '14:30 - 16:00' },
      { day: 'Miércoles', time: '8:30 - 10:00' },
      { day: 'Miércoles', time: '16:00 - 17:30' },
      { day: 'Domingo', time: '10:00 - 11:30' }
    ]
  },
  {
    trainerId: 4, // Ana Silva
    availableSlots: [
      { day: 'Lunes', time: '8:30 - 10:00' },
      { day: 'Martes', time: '14:30 - 16:00' },
      { day: 'Jueves', time: '8:30 - 10:00' },
      { day: 'Jueves', time: '13:00 - 14:30' },
      { day: 'Viernes', time: '11:30 - 13:00' }
    ]
  },
  {
    trainerId: 5, // Pedro Tapia
    availableSlots: [
      { day: 'Martes', time: '10:00 - 11:30' },
      { day: 'Miércoles', time: '11:30 - 13:00' },
      { day: 'Jueves', time: '16:00 - 17:30' },
      { day: 'Sábado', time: '13:00 - 14:30' },
      { day: 'Sábado', time: '14:30 - 16:00' },
      { day: 'Domingo', time: '8:30 - 10:00' }
    ]
  }
];

// Función para obtener horarios disponibles de un entrenador
export const getTrainerSchedule = (trainerId: number): Array<{ day: string; time: string }> => {
  const schedule = TRAINER_SCHEDULES.find(s => s.trainerId === trainerId);
  return schedule ? schedule.availableSlots : [];
};

// Base de datos simulada de reservas
let bookingsDB: Booking[] = [
  {
    id: 'booking-1',
    trainerId: 1,
    trainerName: 'Juan Pérez',
    day: 'Lunes',
    time: '10:00 - 11:30',
    date: '2025-12-02', // Lunes de la semana actual
    clientName: 'Carlos Morales',
    createdAt: '2025-11-28T10:00:00Z'
  },
  {
    id: 'booking-2',
    trainerId: 2,
    trainerName: 'María González',
    day: 'Martes',
    time: '8:30 - 10:00',
    date: '2025-12-03', // Martes de la semana actual (hoy)
    clientName: 'Laura Pérez',
    createdAt: '2025-11-29T15:30:00Z'
  }
];

// Funciones CRUD para manejar las reservas

export const getAllBookings = (): Booking[] => {
  return [...bookingsDB];
};

export const getBookingsByTrainerId = (trainerId: number): Booking[] => {
  return bookingsDB.filter(b => b.trainerId === trainerId);
};

export const getBookingById = (id: string): Booking | undefined => {
  return bookingsDB.find(b => b.id === id);
};

export const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: `booking-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  bookingsDB.push(newBooking);
  return newBooking;
};

export const deleteBooking = (id: string): boolean => {
  const index = bookingsDB.findIndex(b => b.id === id);
  if (index !== -1) {
    bookingsDB.splice(index, 1);
    return true;
  }
  return false;
};

export const isSlotBooked = (trainerId: number, date: string, time: string): boolean => {
  return bookingsDB.some(
    b => b.trainerId === trainerId && b.date === date && b.time === time
  );
};

// Función para limpiar reservas antiguas (opcional)
export const cleanOldBookings = (): void => {
  const today = new Date().toISOString().split('T')[0];
  bookingsDB = bookingsDB.filter(b => b.date >= today);
};