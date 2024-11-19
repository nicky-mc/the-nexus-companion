import { db } from "@/app/utils/dbconnection";
import { auth } from "@clerk/nextjs/server";

/**
 * GET: Fetch the current authenticated user's data.
 */
export async function GET(req) {
  const { userId } = await auth();

  try {
    const result = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

/**
 * POST: Create a new user associated with the authenticated Clerk user.
 */
export async function POST(req) {
  const { userId } = await auth();

  try {
    const { username, bio, profile_picture_url } = await req.json();

    if (!username || !bio) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // Optional handling for profile_picture_url
    const pictureUrl = profile_picture_url || null;

    await db.query(
      `INSERT INTO users (username, user_bio, profile_picture_url, clerk_id)
       VALUES ($1, $2, $3, $4)`,
      [username, bio, pictureUrl, userId]
    );

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}