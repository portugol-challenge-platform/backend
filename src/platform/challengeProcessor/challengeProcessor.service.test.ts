import Service from './challengeProcessor.service';

Service.addToQueue({
    user: { id: 'fjfsdfs' },
    file: { filepath: 'alg.alg' },
    tester: {
        data: [
            { type: 'INPUT', sequence: 1, value: '10', challengeTesterId: 1 },
            { type: 'INPUT', sequence: 2, value: '10', challengeTesterId: 1 },
            { type: 'INPUT', sequence: 3, value: '1', challengeTesterId: 1 },
            { type: 'OUTPUT', sequence: 4, value: '20', challengeTesterId: 1 },
        ],
        timeout: 5000
    }
}, console.log)