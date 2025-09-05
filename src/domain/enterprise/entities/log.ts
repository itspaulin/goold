import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/@types/optional";

export interface LogProps {
  userId: UniqueEntityId;
  action: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Log extends Entity<LogProps> {
  get userId() {
    return this.props.userId;
  }

  get action() {
    return this.props.action;
  }

  get description() {
    return this.props.description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set description(description: string) {
    if (!description || description.trim().length === 0) {
      throw new Error("Description is required.");
    }
    this.props.description = description.trim();
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<LogProps, "createdAt" | "updatedAt">,
    id?: UniqueEntityId
  ): Log {
    const log = new Log(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id
    );
    return log;
  }
}
