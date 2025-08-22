const GetThreadDetailUseCase = require('../GetThreadDetailUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe("GetThreadDetailUseCase", () => {
    it("should orchestrating the get thread detail action correctly", async () => {
        const comments = [
            {
                id: 'comment-123',
                content: 'This is a comment',
                date: "2025-08-22T02:15:21.048Z",
                username: 'dicoding',
            }
        ];

        const threadDetail = {
            id: 'thread-123',
            title: 'Thread Title',
            body: 'Thread Body',
            date: "2025-08-22T02:15:21.048Z",
            username: 'dicoding',
            comments,
        }

        const mockThreadRepository = new ThreadRepository();

        mockThreadRepository.isAvailable = jest.fn(() => Promise.resolve());
        mockThreadRepository.getDetail = jest.fn(() => Promise.resolve([
            {
                thread_id: 'thread-123',
                title: 'Thread Title',
                body: 'Thread Body',
                date: "2025-08-22T02:15:21.048Z",
                thread_owner: 'dicoding',
                comment_id: 'comment-123',
                is_delete: false,
                comment_owner: 'dicoding',
                comment_date: "2025-08-22T02:15:21.048Z",
                content: 'This is a comment'
            }
        ]));

        /** creating use case instance */
        const getThreadDetailUseCase = new GetThreadDetailUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const result = await getThreadDetailUseCase.execute('thread-123');

        // Assert
        expect(mockThreadRepository.isAvailable).toHaveBeenCalledWith('thread-123');
        expect(mockThreadRepository.getDetail).toHaveBeenCalledWith('thread-123');
        expect(result).toStrictEqual(threadDetail);
    });

    it('should display deleted comment message as **komentar telah dihapus**', async () => {
        const comments = [
            {
                id: 'comment-123',
                content: "**komentar telah dihapus**",
                date: "2025-08-22T02:15:21.048Z",
                username: 'dicoding',
            }
        ];

        const threadDetail = {
            id: 'thread-123',
            title: 'Thread Title',
            body: 'Thread Body',
            date: "2025-08-22T02:15:21.048Z",
            username: 'dicoding',
            comments,
        }

        const mockThreadRepository = new ThreadRepository();

        mockThreadRepository.isAvailable = jest.fn(() => Promise.resolve());
        mockThreadRepository.getDetail = jest.fn(() => Promise.resolve([
            {
                thread_id: 'thread-123',
                title: 'Thread Title',
                body: 'Thread Body',
                date: "2025-08-22T02:15:21.048Z",
                thread_owner: 'dicoding',
                comment_id: 'comment-123',
                is_delete: true,
                comment_owner: 'dicoding',
                comment_date: "2025-08-22T02:15:21.048Z",
                content: 'This is a comment'
            }
        ]));

        /** creating use case instance */
        const getThreadDetailUseCase = new GetThreadDetailUseCase({
            threadRepository: mockThreadRepository,
        });

        // Action
        const result = await getThreadDetailUseCase.execute('thread-123');

        // Assert
        expect(mockThreadRepository.isAvailable).toHaveBeenCalledWith('thread-123');
        expect(mockThreadRepository.getDetail).toHaveBeenCalledWith('thread-123');
        expect(result).toStrictEqual(threadDetail);
    });
})