import { db } from '@/app/utils/dbconnection';
import { auth } from '@clerk/nextjs/server';

/**
 * GET: Fetch user data by ID.
 */
export async function GET(req) {
  await auth(); // Ensure the request is authenticated

  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), { status: 500 });
  }
}

/**
 * PUT: Update user by ID.
 */
export async function PUT(req) {
  await auth(); // Ensure the request is authenticated

  const { id } = req.params;
  const { email, username, firstName, lastName, profile_picture_url } = await req.json();

  if (!email || !username || !firstName || !lastName) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    const result = await db.query(
      'UPDATE users SET user_email = $1, username = $2, name = $3, profile_picture_url = $4 WHERE id = $5 RETURNING *',
      [email, username, `${firstName} ${lastName}`, profile_picture_url || null, id]
    );
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
  }
}

/**
 * DELETE: Delete user by ID.
 */
export async function DELETE(req) {
  await auth(); // Ensure the request is authenticated

  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
  }
}