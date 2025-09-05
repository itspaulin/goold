import { AppointmentRepository } from "@/domain/application/repositories/appointment-repository";
import { Appointment } from "@/domain/enterprise/entities/appointment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export class CreateAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    userId,
    roomId,
    date,
    time,
  }: {
    userId: UniqueEntityId;
    roomId: UniqueEntityId;
    date: Date;
    time: string;
  }): Promise<Appointment> {
    const existingAppointment =
      await this.appointmentRepository.findByDateAndRoom(date, roomId);
    if (existingAppointment) {
      throw new Error("Room is already booked at this time.");
    }

    const appointment = Appointment.create({ userId, roomId, date, time });
    await this.appointmentRepository.save(appointment);
    return appointment;
  }
}
