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
      text: `
        SELECT 
          t.id as thread_id, 
          t.title, 
          t.body, 
          t.date::text, 
          tu.username AS thread_owner,
          c.id as comment_id, 
          c.is_delete,
          cu.username AS comment_owner,
          c.date as comment_date, 
          c.content
        FROM threads t
        INNER JOIN users tu ON t.owner = tu.id
        LEFT JOIN comments c ON t.id = c.thread
        LEFT JOIN users cu ON c.owner = cu.id
        WHERE t.id = $1
        ORDER BY c.date ASC;
      `,
      values: [threadId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    return result.rows;
  }

}

module.exports = ThreadRepositoryPostgres;