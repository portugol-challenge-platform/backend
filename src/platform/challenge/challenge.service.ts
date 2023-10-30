import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateChallengeDTO } from './dto/createChallenge.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteChallengeDTO } from './dto/deleteChallenge.dto';
import challengeProcessorService from '../challengeProcessor/challengeProcessor.service';
import { UserAuthType } from 'src/auth/auth.type';
import { unlink } from 'fs';

const ITEMSPERPAGE = 10;

@Injectable()
export class ChallengeService {
    constructor(private database: PrismaService) { }

    async paginator(page: number, userId: string) {
        const [challenges, count] = await Promise.all([
            this.database.challenge.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    testerData: {
                        where: { public: true },
                        include: { data: true }
                    },
                    userChallenges: { where: { userId } },
                    _count: {
                        select: {
                            userChallenges: { where: { correct: true } }
                        }
                    }
                },
                take: ITEMSPERPAGE,
                skip: ITEMSPERPAGE * (page - 1)
            }),
            this.database.challenge.count()
        ]);

        return { challenges, page: page, pageCount: Math.ceil(count / ITEMSPERPAGE) }
    }

    getChallenge(challengeId: number, userId: string) {
        return this.database.challenge.findUniqueOrThrow({
            where: { id: challengeId },
            include: {
                userChallenges: { where: { userId } },
                testerData: {
                    where: { public: true },
                    include: { data: true }
                }
            }
        });
    }

    create(dto: CreateChallengeDTO) {
        return this.database.$transaction(async tx => {
            const challenge = await tx.challenge.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    inputDescription: dto.inputDescription,
                    outputDescription: dto.outputDescription,
                },
                select: { id: true }
            });

            for (const testerData of dto.tester) {
                await tx.challengeTester.create({
                    data: {
                        public: testerData.public,
                        challengeId: challenge.id,
                        data: {
                            createMany: {
                                data: testerData.data
                            }
                        }
                    }
                });
            }

            return challenge;
        });
    }

    async submit(filepath: string, challengeId: number, user: UserAuthType) {
        const challenge = await this.database.challenge.findUnique({
            where: { id: challengeId },
            select: {
                testerData: {
                    select: {
                        data: { orderBy: { sequence: 'asc' } }
                    },
                    take: 1
                },
                userChallenges: {
                    where: { userId: user.sub },
                    select: { status: true, correct: true },
                    take: 1
                }
            },
        });
        if (!challenge || challenge.testerData.length < 1) {
            unlink(filepath, () => { });
            throw new NotFoundException();
        }

        if (challenge.testerData.some(tester => tester.data.length <= 1)) {
            unlink(filepath, () => { });
            throw new UnprocessableEntityException();
        }

        if (challenge.userChallenges[0]?.status == 'SUCCESS' && challenge.userChallenges[0]?.correct) {
            unlink(filepath, () => { });
            throw new ConflictException();
        }

        await this.database.userChallenges.upsert({
            where: { userId_challengeId: { challengeId: challengeId, userId: user.sub } },
            create: {
                status: 'QUEUED',
                correct: false,
                linesCorrect: 0,
                challengeId: challengeId,
                userId: user.sub
            },
            update: {
                status: 'QUEUED',
                correct: false,
                linesCorrect: 0,
            }
        });

        challengeProcessorService.addToQueue(
            {
                user: { id: user.sub },
                file: { filepath },
                tester: {
                    data: challenge.testerData[0].data,
                    timeout: 5000
                }
            },
            async (status, err, data) => {
                if (status == 'STARTING' || status == 'COMPILING') {
                    return await this.database.userChallenges.update({
                        where: { userId_challengeId: { challengeId: challengeId, userId: user.sub } },
                        data: {
                            status: 'PROCESSING',
                            correct: false,
                            linesCorrect: 0
                        }
                    });
                }

                if (status == 'SUCCESS' && data) {
                    return await this.database.userChallenges.update({
                        where: { userId_challengeId: { challengeId: challengeId, userId: user.sub } },
                        data: {
                            status: 'SUCCESS',
                            correct: data.correct,
                            linesCorrect: data.correctLines,
                        }
                    });
                }

                return await this.database.userChallenges.update({
                    where: { userId_challengeId: { challengeId: challengeId, userId: user.sub } },
                    data: {
                        status: 'ERROR',
                        correct: false,
                        linesCorrect: 0
                    }
                });
            }
        );

        return 'OK';
    }

    delete(dto: DeleteChallengeDTO) {
        return this.database.challenge.delete({ where: { id: dto.id }, select: { title: true } });
    }
}
