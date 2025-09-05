import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/@types/optional";

export enum AppointmentStatus {
  PENDING = "PENDENTE",
  CONFIRMED = "CONFIRMADO",
  REJECTED = "RECUSADO",
}

export interface AppointmentProps {
  userId: UniqueEntityId;
  roomId: UniqueEntityId;
  date: Date;
  time: string;
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt?: Date | null;
  canceledAt?: Date | null;
}

export class Appointment extends AggregateRoot<AppointmentProps> {
  get userId() {
    return this.props.userId;
  }

  get roomId() {
    return this.props.roomId;
  }

  get date() {
    return this.props.date;
  }

  get time() {
    return this.props.time;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get canceledAt() {
    return this.props.canceledAt;
  }

  confirm(): void {
    if (this.props.status !== AppointmentStatus.PENDING) {
      throw new Error("Only pending appointments can be confirmed.");
    }
    this.props.status = AppointmentStatus.CONFIRMED;
    this.props.updatedAt = new Date();
  }

  reject(): void {
    if (this.props.status !== AppointmentStatus.PENDING) {
      throw new Error("Only pending appointments can be rejected.");
    }
    this.props.status = AppointmentStatus.REJECTED;
    this.props.updatedAt = new Date();
  }

  cancel(): void {
    if (
      this.props.status === AppointmentStatus.REJECTED ||
      this.props.canceledAt
    ) {
      throw new Error("Appointment already rejected or canceled.");
    }
    this.props.canceledAt = new Date();
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<
      AppointmentProps,
      "createdAt" | "updatedAt" | "canceledAt" | "status"
    >,
    id?: UniqueEntityId
  ) {
    const appointment = new Appointment(
      {
        ...props,
        status: props.status ?? AppointmentStatus.PENDING,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
        canceledAt: props.canceledAt ?? null,
      },
      id
    );

    return appointment;
  }
}
