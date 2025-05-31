const CreateThread = require('../../../Domains/threads/entities/CreateThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CreateThreadUseCase = require('../CreateThreadUseCase');

describe('CreateThreadUseCase', () => {
  it('should orchestrating the create thread action correctly', async () => {

    const payload = {
      title: 'Some Title',
      body: 'Some Body',
      owner: 'user-123',
    };

    const mockNewThread = new NewThread({
      id: 'thread-123',
      title: payload.title,
      owner: payload.owner,
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.create = jest.fn()
      .mockImplementation(() => Promise.resolve(mockNewThread));

    /** creating use case instance */
    const getThreadUseCase = new CreateThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const newThread = await getThreadUseCase.execute(payload);

    // Assert
    expect(newThread).toStrictEqual(new NewThread({
      id: 'thread-123',
      title: payload.title,
      owner: payload.owner,
    }));

    expect(mockThreadRepository.create).toBeCalledWith(new CreateThread({
      title: payload.title,
      body: payload.body,
      owner: payload.owner,
    }));
  });
});
