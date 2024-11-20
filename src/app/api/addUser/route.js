import { db } from '@/app/utils/dbConnection'; // Adjust based on utils path
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    const { userId } = await auth(); // Clerk-provided authenticated user ID

    console.log("Authenticated user ID:", userId);

    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`, // Use Clerk API Key in .env
      },
    });

    if (!userResponse.ok) {
      console.error("Failed to fetch user data from Clerk:", userResponse.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch user data from Clerk' }), {
        status: 500,
      });
    }

    const userData = await userResponse.json();
    console.log("User data from Clerk:", userData);

    const { emailAddresses, username } = userData;

    // Insert user data into your database
    const result = await db.query(
      `INSERT INTO users (clerk_id, user_email, username) VALUES ($1, $2, $3) RETURNING *`,
      [userId, emailAddresses[0].emailAddress, username]
    );

    console.log("Insert result:", result);

    return new Response(JSON.stringify({ message: 'User added successfully', user: result.rows[0] }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error in /api/addUser:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}