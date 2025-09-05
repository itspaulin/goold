import { Room } from "@/domain/enterprise/entities/room";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface RoomRepository {
  findById(id: UniqueEntityId): Promise<Room | null>;
  findByName(name: string): Promise<Room | null>;
  findAll(): Promise<Room[]>;
  save(room: Room): Promise<void>;
}
