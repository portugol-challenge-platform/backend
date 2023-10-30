import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeEventGateway } from './challenge-event.gateway';

describe('ChallengeEventGateway', () => {
  let gateway: ChallengeEventGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengeEventGateway],
    }).compile();

    gateway = module.get<ChallengeEventGateway>(ChallengeEventGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
