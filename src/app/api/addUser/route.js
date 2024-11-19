import { db } from '@/app/utils/dbConnection'; // Adjust based on utils path
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    const { userId } = await auth(); // Clerk-provided authenticated user ID

    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`, // Use Clerk API Key in .env
      },
    });

    if (!userResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch user data from Clerk' }), {
        status: 500,
      });
    }

    const { emailAddresses, username } = await userResponse.json();

    // Insert user data into your database
    await db.query(
      `INSERT INTO users (clerk_id, user_email, username) VALUES ($1, $2, $3)`,
      [userId, emailAddresses[0].emailAddress, username]
    );

    return new Response(JSON.stringify({ message: 'User added successfully' }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error in /api/addUser:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
