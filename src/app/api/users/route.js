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
    const body = await req.json();
    console.log("Request body:", body);

    const { username, user_email } = body;

    if (!username || !user_email) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    console.log("Inserting user with values:", { username, user_email, userId });

    const result = await db.query(
      `INSERT INTO users (username, user_email, clerk_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [username, user_email, userId]
    );

    console.log("Insert result:", result);

    return new Response(JSON.stringify({ message: 'User created successfully', user: result.rows[0] }), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}