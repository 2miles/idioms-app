import { getDB } from '../../../server/db/index.js';

export default async function handler(req, res) {
  const db = getDB();

  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    try {
      const idiomQuery = await db.query(
        `SELECT * FROM idioms_test WHERE id = $1`,
        [id],
      );
      const examplesQuery = await db.query(
        `SELECT * FROM idioms_examples_test WHERE idiom_id = $1`,
        [id],
      );

      res.status(200).json({
        status: 'success',
        data: {
          idiom: idiomQuery.rows[0],
          examples: examplesQuery.rows,
        },
      });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
