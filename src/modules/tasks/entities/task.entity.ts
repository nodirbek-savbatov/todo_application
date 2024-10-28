import {BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user";


export enum taskStatus {
    done = "done",
    pending = "pending",
}

@Table({timestamps: true, tableName: "tasks"})
export class Task extends Model<Task> {
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    data: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION" })
    user_id: number;

    @Column({ type: DataType.ENUM(...Object.values(taskStatus)), allowNull: false, defaultValue: taskStatus.pending })
    status: taskStatus;
}
