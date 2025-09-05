import { Login } from "@/domain/enterprise/entities/login";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface LoginRepository {
  findById(id: UniqueEntityId): Promise<Login | null>;
  findByEmail(email: string): Promise<Login | null>;
  findByUserId(userId: UniqueEntityId): Promise<Login | null>;
  findAll(): Promise<Login[]>;
  save(login: Login): Promise<void>;
}
