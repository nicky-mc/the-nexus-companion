import { db } from '@/utils/dbConnection';

export async function GET(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}

export async function PUT(req, res) {
  const { id } = req.params;
  const { email, username, firstName, lastName } = await req.json();

  try {
    const result = await db.query(
      'UPDATE users SET user_email = $1, username = $2, name = $3 WHERE id = $4 RETURNING *',
      [email, username, `${firstName} ${lastName}`, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function DELETE(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}