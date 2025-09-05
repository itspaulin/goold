import { Table, Column, Model, DataType, HasOne } from "sequelize-typescript";
import Login from "./login";
import { Address } from "@/domain/enterprise/entities/value-objects/address";

@Table
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
    get() {
      const value = this.getDataValue("address");
      return Address.fromJSON(value);
    },
    set(value: Address) {
      this.setDataValue("address", value.toJSON());
    },
  })
  address!: Address;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt!: Date | null;

  @HasOne(() => Login, "userId")
  login!: Login;
}
