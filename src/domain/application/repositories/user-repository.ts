import { User } from "@/domain/enterprise/entities/user";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface UserRepository {
  findById(id: UniqueEntityId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
}
