import { IsString } from "class-validator"

export class UserSignUpDTO {
    @IsString()
    name: string
}