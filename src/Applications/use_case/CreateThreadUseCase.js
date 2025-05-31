const CreateThread = require('../../Domains/threads/entities/CreateThread');

class CreateThreadUseCase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(payload) {
        const createThread = new CreateThread(payload);
        return this._threadRepository.create(createThread);
    }
}

module.exports = CreateThreadUseCase;