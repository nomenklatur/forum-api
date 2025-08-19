const DeleteCommentUseCase = require('../DeleteCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.isAvailable = jest.fn(() => Promise.resolve());
    mockCommentRepository.remove = jest.fn(() => Promise.resolve());

    /** creating use case instance */
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentUseCase.execute('user-123', 'thread-123', 'comment-123');

    // Assert
    expect(mockThreadRepository.isAvailable).toHaveBeenCalledWith(
      'thread-123',
    );
    
    expect(mockCommentRepository.remove).toHaveBeenCalledWith(
      "comment-123",
      "user-123"
    );
  });
});