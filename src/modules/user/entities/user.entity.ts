import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Task } from "src/modules/tasks";

@Table({timestamps: true, tableName: "users"})
export class User extends Model<User> {
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;
    @Column({type: DataType.STRING, allowNull: false})
    name: string;
    @Column({type: DataType.STRING, allowNull: false})
    email: string;
    @Column({type: DataType.STRING, allowNull: true, defaultValue: "user-default-image.png"})
    image: string;

    @HasMany(()=>Task)
    tasks: Task[]
}
