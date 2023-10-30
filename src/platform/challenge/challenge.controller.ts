import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { Admin } from 'src/auth/admin.decorator';
import { CreateChallengeDTO } from './dto/createChallenge.dto';
import { DeleteChallengeDTO } from './dto/deleteChallenge.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/auth/authdata.decorator';
import { UserAuthType } from 'src/auth/auth.type';
import { resolve } from 'path';

@Controller('challenge')
export class ChallengeController {
    constructor(private challengeService: ChallengeService) { }

    @Get('paginator')
    list(@Query('page') page: string, @User() user: UserAuthType) {
        var parsedPage = parseInt(page);
        if (isNaN(parsedPage) || parsedPage < 1)
            parsedPage = 1;

        return this.challengeService.paginator(parsedPage, user.sub);
    }

    @Get('view/:id')
    view(@User() user: UserAuthType, @Param('id') challengeId: string) {
        var parsedId = parseInt(challengeId);
        if (isNaN(parsedId))
            throw new BadRequestException();

        return this.challengeService.getChallenge(parsedId, user.sub);
    }

    @Post()
    @Admin()
    create(@Body() dto: CreateChallengeDTO) {
        return this.challengeService.create(dto);
    }

    @Post('submit')
    @UseInterceptors(FileInterceptor('file', { dest: resolve(__dirname, '../../..', './uploads') }))
    async submit(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 2000 }),
                    // new FileTypeValidator({ fileType: 'text/plain' }),
                ]
            })
        ) file: Express.Multer.File,
        @Body('challenge') challenge: any,
        @User() user: UserAuthType
    ) {
        const challengeId = parseInt(challenge);
        if (!challengeId)
            throw new BadRequestException();

        return await this.challengeService.submit(file.path, challengeId, user);
    }

    @Delete()
    @Admin()
    delete(@Body() dto: DeleteChallengeDTO) {
        return this.challengeService.delete(dto);
    }
}
