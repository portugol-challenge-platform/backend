import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge/challenge.service';
import { ChallengeController } from './challenge/challenge.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChallengeEventGateway } from './challenge-event/challenge-event.gateway';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeService, PrismaService, ChallengeEventGateway],
})
export class PlatformModule { }
