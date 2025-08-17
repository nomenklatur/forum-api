const NewThread = require('../../Domains/threads/entities/NewThread');

class CreateThreadUseCase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(userId, payload) {
        const newThread = new NewThread(payload);
        return this._threadRepository.create(userId, newThread);
    }
}

module.exports = CreateThreadUseCase;