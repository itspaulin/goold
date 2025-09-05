import { Appointment } from "@/domain/enterprise/entities/appointment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface AppointmentRepository {
  findById(id: UniqueEntityId): Promise<Appointment | null>;
  findByDateAndRoom(
    date: Date,
    roomId: UniqueEntityId
  ): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  save(appointment: Appointment): Promise<void>;
}
