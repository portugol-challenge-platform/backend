import { exec, spawn } from 'child_process';
import { ChallengeTesterData } from '@prisma/client';
import { resolve as pathResolve } from 'path';
import { unlink } from 'fs';
import { subscribedClients } from '../challenge-event/challenge-event.gateway';

type Item = {
    user: {
        id: string
    }
    file: {
        filepath: string
    }
    tester: {
        data: ChallengeTesterData[]
        timeout: number
    }
}

type SubscriptionType = (status: 'COMPILING' | 'ALREADYINQUEUE' | 'STARTING' | 'SUCCESS' | 'ERROR', errData: { message: string, line?: string } | null, successData: RunnerReturnData | null) => void;

type RunnerReturnData = {
    startedAt: Date;
    endedAt: Date;
    hasError: boolean;
    correct: boolean;
    correctLines: number;
    totalLines: number;
}

class ChallengeProcessor {
    static queue: [Item, SubscriptionType][] = [];
    processingItem: Item | null;

    addToQueue(item: Item, subscription: SubscriptionType) {
        const subscriptionEvent: SubscriptionType = (...args) => {
            const socket = subscribedClients.get(item.user.id);
            if (socket?.connected)
                socket.emit('processor', ...args);

            subscription(...args);
        }

        if (ChallengeProcessor.queue.some(queueItem => queueItem[0].user.id == item.user.id))
            return subscriptionEvent('ALREADYINQUEUE', null, null);

        ChallengeProcessor.queue.push([item, subscriptionEvent]);
        this.processQueue();
    }

    async processQueue() {
        if (this.processingItem)
            return;

        if (ChallengeProcessor.queue.length == 0)
            return;

        const queueItem = ChallengeProcessor.queue.shift() as [Item, SubscriptionType];
        if (!queueItem)
            return;

        const [item, subscription] = queueItem;
        try {
            this.processingItem = item;
            subscription('COMPILING', null, null);
            const compileResult = await this.compile(item.file.filepath);
            if (compileResult != null) {
                this.processingItem = null;
                subscription('ERROR', compileResult, null);
                return this.processQueue();
            }

            subscription('STARTING', null, null);
            const data = await this.run(item.tester.data, item.tester.timeout);

            if (data.type == 'success') {
                if (data.hasError)
                    throw new Error('Erro no programa');

                subscription('SUCCESS', null, data);
            }
            else subscription('ERROR', data, null);
        }
        catch {
            subscription('ERROR', { message: 'Erro 001' }, null);
        }
        finally {
            await unlink(item.file.filepath, () => { });
            this.processingItem = null;
            return this.processQueue();
        }
    }

    private compile(filepath: string) {
        return new Promise<null | { message: string, line?: string }>((resolve) =>
            exec(
                `node src/platform/challengeProcessor/compiler/index ${filepath}`,
                { timeout: 10000 },
                (error: any, stdout: string, stderr: string) => {
                    try {
                        if (error)
                            throw error;

                        if (!stderr)
                            return resolve(null);

                        const parsedErr = JSON.parse(stderr);
                        return resolve({ message: parsedErr.simbolo.tipo, line: String(parsedErr.simbolo.linha) })
                    }
                    catch {
                        return resolve({ message: 'Erro 002' })
                    }
                }
            )
        );
    }

    private run(runData: ChallengeTesterData[], endTimeoutTime: number) {
        return new Promise<(RunnerReturnData & { type: 'success' }) | { type: 'error', message: string }>(resolve => {
            try {
                const file = pathResolve(__dirname, '../../../', 'build');
                const pythonInstance = spawn('python3', ['build.py', file], { shell: true });
                const inputData = runData.filter(v => v.type == 'INPUT').map(i => i.value).join('\n').concat('\n');
                const expectedOutputData = runData.filter(v => v.type == 'OUTPUT');

                var hasError = false;
                var startedAt = new Date();
                var output = '';
                var endedAt = new Date();
                var timeout: null | NodeJS.Timeout = null;

                pythonInstance.stdout.on('data', data => output += data.toString());
                pythonInstance.stderr.on('data', () => hasError = true);

                function createTimeout(setCreatedAt: boolean = false) {
                    if (timeout) {
                        clearTimeout(timeout);
                        timeout = null;
                    }
                    timeout = setTimeout(() => {
                        if (setCreatedAt) startedAt = new Date();
                        if (pythonInstance.stdin.writable)
                            return pythonInstance.stdin.write(inputData);
                        return createTimeout();
                    }, 1000);
                }
                createTimeout(true);

                setTimeout(() => {
                    endedAt = new Date();
                    pythonInstance.killed && pythonInstance.kill();

                    return resolve({
                        type: 'success',
                        startedAt,
                        endedAt,
                        hasError,
                        correct: expectedOutputData.map(i => i.value).join('\n').concat('\n') == output,
                        correctLines: output
                            .split('\n')
                            .filter((line, index) => line == (expectedOutputData[index]?.value || ''))
                            .length,
                        totalLines: output.length
                    });
                }, endTimeoutTime);
            }
            catch {
                return resolve({ type: 'error', message: 'Erro 003' })
            }
        });
    }
}

export default new ChallengeProcessor();