class GetThreadDetailUseCase {
    constructor({ threadRepository }) {
        this._threadRepository = threadRepository;
    }

    async execute(threadId) {
        await this._threadRepository.isAvailable(threadId);
        return this._threadRepository.getDetail(threadId);
    }
}

module.exports = GetThreadDetailUseCase;