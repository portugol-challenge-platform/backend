import { ChallengeTesterDataType } from "@prisma/client";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsPositive, IsString, MinLength, ValidateNested } from "class-validator";

class TesterData {
    @IsNotEmpty()
    @IsString()
    value: string

    @IsNotEmpty()
    @IsEnum(ChallengeTesterDataType)
    type: ChallengeTesterDataType

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    sequence: number
}

class Tester {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => TesterData)
    data: TesterData[]

    @IsBoolean()
    public: boolean
}

export class CreateChallengeDTO {
    @IsString()
    @MinLength(5)
    title: string

    @IsString()
    @MinLength(15)
    description: string

    @IsString()
    @MinLength(5)
    inputDescription: string

    @IsString()
    @MinLength(5)
    outputDescription: string

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Tester)
    tester: Tester[]
}