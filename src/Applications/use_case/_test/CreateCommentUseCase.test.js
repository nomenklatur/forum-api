const CreateCommentUseCase = require('../CreateCommentUseCase');
const CreatedComment = require('../../../Domains/comments/entities/CreatedComment');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('CreateCommentUseCase', () => {
  it('should orchestrating the create comment action correctly', async () => {

    const payload = {
      content: 'Some Content',
    };

    const mockNewCreatedComment = new CreatedComment({
      id: 'comment-123',
      content: payload.content,
      owner: 'user-123',
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.isAvailable = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.create = jest.fn()
      .mockImplementation(() => Promise.resolve(mockNewCreatedComment));

    const createCommentUseCase = new CreateCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const createdComment = await createCommentUseCase.execute('user-123', 'thread-123', payload);

    // Assert
    expect(createdComment).toStrictEqual(new CreatedComment({
      id: 'comment-123',
      content: payload.content,
      owner: 'user-123',
    }));
    expect(mockThreadRepository.isAvailable).toBeCalledWith('thread-123');
    expect(mockCommentRepository.create).toBeCalledWith('user-123', 'thread-123', new NewComment({
      content: payload.content,
    }));
  });
});