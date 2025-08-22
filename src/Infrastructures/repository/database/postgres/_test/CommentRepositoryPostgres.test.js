const UsersTableTestHelper = require('../../../../../../tests/UsersTableTestHelper');
const TableHelper = require('../../../../../../tests/TableHelper');
const NotFoundError = require('../../../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../../../Commons/exceptions/AuthorizationError');
const NewComment = require('../../../../../Domains/comments/entities/NewComment');
const CreatedComment = require('../../../../../Domains/comments/entities/CreatedComment');
const pool = require('../../../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await TableHelper.emptyTable('threads');
    await TableHelper.emptyTable('comments');
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('isAvailable function', () => {
    it('should throw NotFoundError when comment not available', async () => {
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
        await expect(commentRepositoryPostgres.isAvailable('comment-123'))
            .rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when comment available', async () => {
        const userId = 'user-123';
        const threadId = 'thread-123';
        const commentId = 'comment-123';

        await UsersTableTestHelper.addUser({ id: userId });
        await TableHelper.createNewThread({ id: threadId, owner: userId });
        await TableHelper.createNewComment({ id: commentId, owner: userId, threadId });

        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

        await expect(commentRepositoryPostgres.isAvailable(commentId))
            .resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('create function', () => {
    beforeEach(async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await TableHelper.createNewThread({ id: 'thread-123', owner: 'user-123' });
    });

    it('should persist new comment', async () => {
      const newComment = new NewComment({
        content: 'This is a comment',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => '123');
      await commentRepositoryPostgres.create('user-123', 'thread-123', newComment);
      const comments = await TableHelper.findById('comment-123', 'comments');
      expect(comments).toHaveLength(1);
    });

    it('should return created comment correctly', async () => {
      const newComment = new NewComment({
        content: 'This is a comment',
      });

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, () => '123');
      const createdComment = await commentRepositoryPostgres.create('user-123', 'thread-123', newComment);

      expect(createdComment).toBeInstanceOf(CreatedComment);
      expect(createdComment.id).toEqual('comment-123');
      expect(createdComment.content).toEqual(newComment.content);
      expect(createdComment.owner).toEqual('user-123');
    });
  });

  describe('remove function', () => {
    beforeEach(async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await TableHelper.createNewThread({ id: 'thread-123', owner: 'user-123' });
      await TableHelper.createNewComment({ id: 'comment-123', owner: 'user-123', threadId: 'thread-123' });
    });

    it('should throw AuthorizationError when comment not owned by user', async () => {
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
        await expect(commentRepositoryPostgres.remove('comment-123', 'user-234'))
            .rejects.toThrowError(AuthorizationError);
    });

    it('should throw NotFoundError when comment not found', async () => {
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
        await expect(commentRepositoryPostgres.remove('comment-999', 'user-123'))
            .rejects.toThrowError(NotFoundError);
    });

    it('should mark comment as deleted when user is the owner', async () => {
        const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});
        await expect(commentRepositoryPostgres.remove("comment-123", "user-123"))
            .resolves.not.toThrowError(AuthorizationError);
    });
  });
});
