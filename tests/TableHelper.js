const pool = require('../src/Infrastructures/database/postgres/pool');

const TableHelper = {

    async emptyTable(tableName) {
        await pool.query(`DELETE FROM ${tableName}`);
    },

    async findById(id, tableName) {
        const query = {
            text: `SELECT * FROM ${tableName} WHERE id = $1`,
            values: [id],
        };
        const result = await pool.query(query);
        return result.rows;
    },

    async createNewThread({
        id = 'thread-123',
        title = 'Thread Title',
        body = 'Thread Body',
        date = new Date().toISOString(),
        owner = 'user-123',
    }) {
        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
            values: [id, title, body, owner, date],
        };
        await pool.query(query);
    }
}

module.exports = TableHelper;