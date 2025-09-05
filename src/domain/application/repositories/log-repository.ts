import { Log } from "@/domain/enterprise/entities/log";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface LogRepository {
  findById(id: UniqueEntityId): Promise<Log | null>;
  findByUserId(userId: UniqueEntityId): Promise<Log[]>;
  findAll(): Promise<Log[]>;
  save(log: Log): Promise<void>;
}
