import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { taskStatus } from '../entities';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty({
        type: "string",
    })
    @IsString()
    data: string

    @ApiProperty({
        type: "string",
    })
    @IsString()
    taskStatus: taskStatus

    
}
