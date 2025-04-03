import { getDB } from '../../../server/db/index.js';
import { checkRole } from '../../../server/authMiddleware.js';

export default async function handler(req, res) {
  const db = getDB();

  if (req.method === 'GET') {
    try {
      const idiomsQuery = 'SELECT * FROM idioms_test ORDER BY timestamps';
      const examplesQuery = 'SELECT * FROM idioms_examples_test';

      const [idiomsResult, examplesResult] = await Promise.all([
        db.query(idiomsQuery),
        db.query(examplesQuery),
      ]);

      res.status(200).json({
        status: 'success',
        results: idiomsResult.rows.length,
        data: {
          idioms: idiomsResult.rows,
          examples: examplesResult.rows,
        },
      });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const hasRole = await checkRole(req, res, 'Admin');
    if (!hasRole) return; // checkRole already sends error if unauthorized

    const { title, title_general, definition, timestamps, contributor } =
      req.body;

    try {
      const insertQuery = `
        INSERT INTO idioms_test (title, title_general, definition, timestamps, contributor)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const result = await db.query(insertQuery, [
        title,
        title_general,
        definition,
        timestamps,
        contributor,
      ]);

      res.status(200).json({
        status: 'success',
        data: {
          idiom: result.rows[0],
        },
      });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
