import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DeleteChallengeDTO {
    @IsNotEmpty()
    @IsInt()
    id: number
}