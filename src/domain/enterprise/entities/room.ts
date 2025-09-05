import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/@types/optional";

export interface RoomProps {
  name: string;
  capacity: number;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Room extends Entity<RoomProps> {
  get name() {
    return this.props.name;
  }

  get capacity() {
    return this.props.capacity;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set name(name: string) {
    if (!name || name.trim().length === 0) {
      throw new Error("Room name is required.");
    }
    this.props.name = name.trim();
    this.touch();
  }

  set capacity(capacity: number) {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than zero.");
    }
    this.props.capacity = capacity;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<RoomProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId
  ): Room {
    const room = new Room(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id
    );
    return room;
  }
}
