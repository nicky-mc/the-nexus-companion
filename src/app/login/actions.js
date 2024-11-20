'use server';
import { db } from '@/utils/dbConnection';
import { createClient } from '@/utils/server'; 
export async function login(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  console.log('Login data sent:', data);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log('Login error received:', error);
    return { success: false, message: error.message };
  }

  console.log('Login successful');
  return { success: true };
}

export async function signup(formData) {
  const supabase = await createClient();

  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  console.log('Signup data sent:', data);

  const { user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.log('Signup error received:', error);
    return { success: false, message: error.message };
  }

  console.log('Signup successful, user:', user);

  // Save username in the database
  if (user) {
    const { error: dbError } = await supabase
      .from('users')
      .insert([{ username: data.username, user_email: data.email, id: user.id }]);

    if (dbError) {
      console.log('Database error received:', dbError);
      return { success: false, message: dbError.message };
    }
  }

  return { success: true };
}
