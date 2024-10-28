import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        type: "string",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string


    @ApiProperty({
        type: "string",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string


    @ApiProperty({
        type: "string",
    })
    @IsString()
    image: string
}
