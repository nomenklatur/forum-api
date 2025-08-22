const UsersTableTestHelper = require('../../../../../../tests/UsersTableTestHelper');
const TableHelper = require('../../../../../../tests/TableHelper');
const NotFoundError = require('../../../../../Commons/exceptions/NotFoundError');
const NewThread = require('../../../../../Domains/threads/entities/NewThread');
const pool = require('../../../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const CreatedThread = require('../../../../../Domains/threads/entities/CreatedThread');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await TableHelper.emptyTable('threads');
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('isAvailable function', () => {
    it('should throw NotFoundError when thread not available', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await expect(threadRepositoryPostgres.isAvailable('thread-123'))
        .rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when thread available', async () => {
      const userId = 'user-123';
      const threadId = 'thread-123';

      await UsersTableTestHelper.addUser({ id: userId });
      await TableHelper.createNewThread({ id: threadId, owner: userId });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      await expect(threadRepositoryPostgres.isAvailable(threadId))
        .resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('create function', () => {
    beforeEach(async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
    });

    it('should persist new thread', async () => {
      const newThread = new NewThread({
        title: 'Thread Title',
        body: 'Thread Body',
      });

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, () => '123');
      await threadRepositoryPostgres.create('user-123', newThread);
      const threads = await TableHelper.findById('thread-123', 'threads');
      expect(threads).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const newThread = new NewThread({
        title: 'A thread',
        body: 'A long thread',
      });

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.create('user-123', newThread);

      // Assert
      expect(addedThread).toStrictEqual(new CreatedThread({
        id: 'thread-123',
        title: 'A thread',
        owner: 'user-123',
      }));
    });
  });

  describe('getDetail function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.getDetail('thread-123'))
        .rejects.toThrowError(NotFoundError);
    });

    it('should return thread correctly', async () => {
      // Arrange
      const userId = 'user-123';
      const threadId = 'thread-123';
      const date = new Date().toISOString();

      await UsersTableTestHelper.addUser({ id: userId, username: 'dicoding' });
      await UsersTableTestHelper.addUser({ id: "user-456", username: 'newuser' });
      await TableHelper.createNewThread({
        id: threadId,
        title: 'Thread Title',
        body: 'Thread Body',
        date,
        owner: userId,
      });
      await TableHelper.createNewComment({
        id: 'comment-123',
        content: 'This is a comment',
        date,
        thread: threadId,
        owner: userId,
      });
      await TableHelper.createNewComment({
        id: 'comment-456',
        content: 'This is a comment',
        date,
        thread: threadId,
        owner: "user-456",
      });


      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action
      const thread = await threadRepositoryPostgres.getDetail(threadId);

      // Assert
      expect(thread).toHaveLength(2);
      expect(thread[0].thread_id).toStrictEqual(threadId);
      expect(thread[0].title).toStrictEqual('Thread Title');
      expect(thread[0].comment_id).toStrictEqual('comment-123');
      expect(thread[0].comment_owner).toStrictEqual('dicoding');
      expect(thread[0].comment_date).toBeTruthy();
      expect(thread[0].content).toStrictEqual('This is a comment');
      expect(thread[0].is_delete).toBeFalsy();
      expect(thread[0].body).toStrictEqual('Thread Body');
      expect(thread[0].date).toBeTruthy();
      expect(thread[0].thread_owner).toStrictEqual('dicoding');
    });
  });
});
