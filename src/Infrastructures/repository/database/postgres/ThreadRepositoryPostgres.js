const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const CreatedThread = require("../../../../Domains/threads/entities/CreatedThread");
const NotFoundError = require("../../../../Commons/exceptions/NotFoundError");

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async create(userId, newThread) {
    const threadId = `thread-${this._idGenerator()}`;
    const { title, body } = newThread;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [threadId, title, body, userId, date],
    }

    const queryResult = await this._pool.query(query);
    return new CreatedThread(queryResult.rows[0]);
  }

  async isAvailable(threadId) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }
  }

  async getDetail(threadId) {
    const query = {
      text: 'SELECT threads.id, threads.title, threads.body, threads.date::text, users.username FROM threads LEFT JOIN users ON users.id = threads.owner WHERE threads.id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    return result.rows[0];
  }

}

module.exports = ThreadRepositoryPostgres;