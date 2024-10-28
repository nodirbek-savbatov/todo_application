import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({
        type: "string",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    data: string

    @ApiProperty({
        type: "integer",
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    user_id: number
}
