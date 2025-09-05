import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/@types/optional";

export interface LoginProps {
  email: string;
  password: string;
  role: "admin" | "customer";
  createdAt: Date;
  updatedAt?: Date | null;
  removedAt?: Date | null;
}

export class Login extends Entity<LoginProps> {
  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role(): "admin" | "customer" {
    return this.props.role;
  }

  get removedAt() {
    return this.props.removedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set email(email: string) {
    this.props.email = email.trim().toLowerCase();
    this.touch();
  }

  set password(password: string) {
    this.props.password = password;
    this.touch();
  }

  softDelete(): void {
    if (!this.props.removedAt) {
      this.props.removedAt = new Date();
      this.props.updatedAt = new Date();
    }
  }

  restore(): void {
    if (this.props.removedAt) {
      this.props.removedAt = null;
      this.props.updatedAt = new Date();
    }
  }

  changeRole(newRole: "admin" | "customer"): void {
    if (newRole !== this.props.role) {
      this.props.role = newRole;
      this.props.updatedAt = new Date();
    }
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<LoginProps, "createdAt" | "updatedAt" | "removedAt">,
    id?: UniqueEntityId
  ) {
    const login = new Login(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
        removedAt: props.removedAt ?? null,
      },
      id
    );
    return login;
  }
}
