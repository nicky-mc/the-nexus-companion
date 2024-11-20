'use server';

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
    console.error('Login error:', error);
    return { success: false, message: error.message };
  }

  console.log('Login successful');
  return { success: true };
}

export async function signup(formData) {
  const supabase = await createClient();


  console.log('Signup data sent:', data);

  // Step 1: Create user in auth.users
  const { data: { user }, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.error('Signup error received:', error);
    return { success: false, message: error.message };
  }

  console.log('Signup successful, user:', user);

  // Step 2: Insert user into public.users
  const { error: dbError } = await supabase
    .from('users')
    .insert([{ id: user.id, username: data.username, user_email: data.email }]);

  if (dbError) {
    console.error('Database insertion error:', dbError);
    return { success: false, message: dbError.message };
  }

  console.log('User inserted into public.users');
  return { success: true };
}
