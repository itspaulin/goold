import { AppointmentRepository } from "@/domain/application/repositories/appointment-repository";
import { Appointment } from "@/domain/enterprise/entities/appointment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import AppointmentModel from "@/infra/database/models/appointment";

export class SequelizeAppointmentRepository implements AppointmentRepository {
  async findById(id: UniqueEntityId): Promise<Appointment | null> {
    const appointmentData = await AppointmentModel.findByPk(id.toString());
    if (!appointmentData) return null;
    return Appointment.create(
      {
        userId: new UniqueEntityId(appointmentData.userId),
        roomId: new UniqueEntityId(appointmentData.roomId),
        date: appointmentData.date,
        time: appointmentData.time,
        status: appointmentData.status,
        createdAt: appointmentData.createdAt,
        updatedAt: appointmentData.updatedAt,
        canceledAt: appointmentData.canceledAt,
      },
      new UniqueEntityId(appointmentData.id)
    );
  }

  async findByDateAndRoom(
    date: Date,
    roomId: UniqueEntityId
  ): Promise<Appointment | null> {
    const appointmentData = await AppointmentModel.findOne({
      where: { date, roomId: roomId.toString() },
    });
    if (!appointmentData) return null;
    return Appointment.create(
      {
        userId: new UniqueEntityId(appointmentData.userId),
        roomId: new UniqueEntityId(appointmentData.roomId),
        date: appointmentData.date,
        time: appointmentData.time,
        status: appointmentData.status,
        createdAt: appointmentData.createdAt,
        updatedAt: appointmentData.updatedAt,
        canceledAt: appointmentData.canceledAt,
      },
      new UniqueEntityId(appointmentData.id)
    );
  }

  async findAll(): Promise<Appointment[]> {
    const appointmentsData = await AppointmentModel.findAll();
    return appointmentsData.map((data) =>
      Appointment.create(
        {
          userId: new UniqueEntityId(data.userId),
          roomId: new UniqueEntityId(data.roomId),
          date: data.date,
          time: data.time,
          status: data.status,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          canceledAt: data.canceledAt,
        },
        new UniqueEntityId(data.id)
      )
    );
  }

  async save(appointment: Appointment): Promise<void> {
    const existing = await AppointmentModel.findByPk(appointment.id.toString());
    if (existing) {
      existing.userId = appointment.userId.toString();
      existing.roomId = appointment.roomId.toString();
      existing.date = appointment.date;
      existing.time = appointment.time;
      existing.status = appointment.status;
      existing.createdAt = appointment.createdAt;
      existing.updatedAt = appointment.updatedAt;
      existing.canceledAt = appointment.canceledAt;
      await existing.save();
    } else {
      await AppointmentModel.create({
        id: appointment.id.toString(),
        userId: appointment.userId.toString(),
        roomId: appointment.roomId.toString(),
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
        canceledAt: appointment.canceledAt,
      });
    }
  }
}
