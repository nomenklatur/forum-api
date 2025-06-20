const CreatedThread = require('../../../Domains/threads/entities/CreatedThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CreateThreadUseCase = require('../CreateThreadUseCase');

describe('CreatedThreadUseCase', () => {
  it('should orchestrating the create thread action correctly', async () => {

    const payload = {
      title: 'Some Title',
      body: 'Some Body',
    };

    const mockNewCreatedThread = new CreatedThread({
      id: 'thread-123',
      title: payload.title,
      owner: 'user-123',
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.create = jest.fn()
      .mockImplementation(() => Promise.resolve(mockNewCreatedThread));

    const createThreadUseCase = new CreateThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const createdThread = await createThreadUseCase.execute('user-123', payload);

    // Assert
    expect(createdThread).toStrictEqual(new CreatedThread({
      id: 'thread-123',
      title: payload.title,
      owner: 'user-123',
    }));

    expect(mockThreadRepository.create).toBeCalledWith('user-123', new NewThread({
      title: payload.title,
      body: payload.body,
    }));
  });
});
