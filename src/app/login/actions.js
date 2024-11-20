'use server';

import { createClient } from '@/utils/server';

export async function login(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}

export async function signup(formData) {
  const supabase = await createClient();

  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  // Save username in the database
  if (user) {
    const { error: dbError } = await supabase
      .from('users')
      .insert([{ username: data.username, user_email: data.email, id: user.id }]);

    if (dbError) {
      return { success: false, message: dbError.message };
    }
  }

  return { success: true };
}
