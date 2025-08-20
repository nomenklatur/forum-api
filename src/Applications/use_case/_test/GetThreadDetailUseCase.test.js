const GetThreadDetailUseCase = require('../GetThreadDetailUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe("GetThreadDetailUseCase", () => {
    it("should orchestrating the get thread detail action correctly", async () => {
        const comments = [
            {
                id: 'comment-123',
                content: 'This is a comment',
                date: new Date().toISOString(),
                username: 'dicoding',
            }
        ];

        const threadDetail = {
            id: 'thread-123',
            title: 'Thread Title',
            body: 'Thread Body',
            date: new Date().toISOString(),
            username: 'dicoding',
            comments,
        }

        const mockThreadRepository = new ThreadRepository();

        mockThreadRepository.isAvailable = jest.fn(() => Promise.resolve());
        mockThreadRepository.getDetail = jest.fn(() => Promise.resolve(threadDetail));

        /** creating use case instance */
        const getThreadDetailUseCase = new GetThreadDetailUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const result = await getThreadDetailUseCase.execute('thread-123');

        // Assert
        expect(mockThreadRepository.isAvailable).toHaveBeenCalledWith('thread-123');
        expect(mockThreadRepository.getDetail).toHaveBeenCalledWith('thread-123');
        expect(result).toEqual(threadDetail);
    });
})