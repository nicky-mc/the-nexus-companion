//utils/dbutils.js
import { createClient as createBrowserClient } from './client'; // Client-side Supabase client
import { createClient as createServerClient } from './server'; // Server-side Supabase client

// Function to create the appropriate Supabase client
export function createSupabaseClient(isServer = false) {
  return isServer ? createServerClient() : createBrowserClient();
}
// Utility functions for the `ability_scores` table
export async function getAbilityScores() {
  const res = await db.query('SELECT * FROM ability_scores');
  return res.rows;
}

export async function getAbilityScoreById(id) {
  const res = await db.query('SELECT * FROM ability_scores WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createAbilityScore(data) {
  const { character_id, strength, dexterity, constitution, intelligence, wisdom, charisma } = data;
  const res = await db.query(
    'INSERT INTO ability_scores (character_id, strength, dexterity, constitution, intelligence, wisdom, charisma) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [character_id, strength, dexterity, constitution, intelligence, wisdom, charisma]
  );
  return res.rows[0];
}

export async function updateAbilityScore(id, data) {
  const { character_id, strength, dexterity, constitution, intelligence, wisdom, charisma } = data;
  const res = await db.query(
    'UPDATE ability_scores SET character_id = $1, strength = $2, dexterity = $3, constitution = $4, intelligence = $5, wisdom = $6, charisma = $7 WHERE id = $8 RETURNING *',
    [character_id, strength, dexterity, constitution, intelligence, wisdom, charisma, id]
  );
  return res.rows[0];
}

export async function deleteAbilityScore(id) {
  const res = await db.query('DELETE FROM ability_scores WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `attacks` table
export async function getAttacks() {
  const res = await db.query('SELECT * FROM attacks');
  return res.rows;
}

export async function getAttackById(id) {
  const res = await db.query('SELECT * FROM attacks WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createAttack(data) {
  const { character_id, attack_name, attack_bonus, damage, damage_type } = data;
  const res = await db.query(
    'INSERT INTO attacks (character_id, attack_name, attack_bonus, damage, damage_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [character_id, attack_name, attack_bonus, damage, damage_type]
  );
  return res.rows[0];
}

export async function updateAttack(id, data) {
  const { character_id, attack_name, attack_bonus, damage, damage_type } = data;
  const res = await db.query(
    'UPDATE attacks SET character_id = $1, attack_name = $2, attack_bonus = $3, damage = $4, damage_type = $5 WHERE id = $6 RETURNING *',
    [character_id, attack_name, attack_bonus, damage, damage_type, id]
  );
  return res.rows[0];
}

export async function deleteAttack(id) {
  const res = await db.query('DELETE FROM attacks WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `characters` table
export async function getCharacters() {
  const res = await db.query('SELECT * FROM characters');
  return res.rows;
}

export async function getCharacterById(id) {
  const res = await db.query('SELECT * FROM characters WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createCharacter(data) {
  const { name, race, class: charClass, background, alignment, experience_points, level, player_name } = data;
  const res = await db.query(
    'INSERT INTO characters (name, race, class, background, alignment, experience_points, level, player_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [name, race, charClass, background, alignment, experience_points, level, player_name]
  );
  return res.rows[0];
}

export async function updateCharacter(id, data) {
  const { name, race, class: charClass, background, alignment, experience_points, level, player_name } = data;
  const res = await db.query(
    'UPDATE characters SET name = $1, race = $2, class = $3, background = $4, alignment = $5, experience_points = $6, level = $7, player_name = $8 WHERE id = $9 RETURNING *',
    [name, race, charClass, background, alignment, experience_points, level, player_name, id]
  );
  return res.rows[0];
}

export async function deleteCharacter(id) {
  const res = await db.query('DELETE FROM characters WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `equipment` table
export async function getEquipment() {
  const res = await db.query('SELECT * FROM equipment');
  return res.rows;
}

export async function getEquipmentById(id) {
  const res = await db.query('SELECT * FROM equipment WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createEquipment(data) {
  const { character_id, item_name, item_type, quantity, description, weight } = data;
  const res = await db.query(
    'INSERT INTO equipment (character_id, item_name, item_type, quantity, description, weight) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [character_id, item_name, item_type, quantity, description, weight]
  );
  return res.rows[0];
}

export async function updateEquipment(id, data) {
  const { character_id, item_name, item_type, quantity, description, weight } = data;
  const res = await db.query(
    'UPDATE equipment SET character_id = $1, item_name = $2, item_type = $3, quantity = $4, description = $5, weight = $6 WHERE id = $7 RETURNING *',
    [character_id, item_name, item_type, quantity, description, weight, id]
  );
  return res.rows[0];
}

export async function deleteEquipment(id) {
  const res = await db.query('DELETE FROM equipment WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `features_and_traits` table
export async function getFeaturesAndTraits() {
  const res = await db.query('SELECT * FROM features_and_traits');
  return res.rows;
}

export async function getFeatureAndTraitById(id) {
  const res = await db.query('SELECT * FROM features_and_traits WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createFeatureAndTrait(data) {
  const { character_id, feature_name, description } = data;
  const res = await db.query(
    'INSERT INTO features_and_traits (character_id, feature_name, description) VALUES ($1, $2, $3) RETURNING *',
    [character_id, feature_name, description]
  );
  return res.rows[0];
}

export async function updateFeatureAndTrait(id, data) {
  const { character_id, feature_name, description } = data;
  const res = await db.query(
    'UPDATE features_and_traits SET character_id = $1, feature_name = $2, description = $3 WHERE id = $4 RETURNING *',
    [character_id, feature_name, description, id]
  );
  return res.rows[0];
}

export async function deleteFeatureAndTrait(id) {
  const res = await db.query('DELETE FROM features_and_traits WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `groups` table
export async function getGroups() {
  const res = await db.query('SELECT * FROM groups');
  return res.rows;
}

export async function getGroupById(id) {
  const res = await db.query('SELECT * FROM groups WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createGroup(data) {
  const { group_name, description, owner_id } = data;
  const res = await db.query(
    'INSERT INTO groups (group_name, description, owner_id) VALUES ($1, $2, $3) RETURNING *',
    [group_name, description, owner_id]
  );
  return res.rows[0];
}

export async function updateGroup(id, data) {
  const { group_name, description, owner_id } = data;
  const res = await db.query(
    'UPDATE groups SET group_name = $1, description = $2, owner_id = $3 WHERE id = $4 RETURNING *',
    [group_name, description, owner_id, id]
  );
  return res.rows[0];
}

export async function deleteGroup(id) {
  const res = await db.query('DELETE FROM groups WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `hit_points` table
export async function getHitPoints() {
  const res = await db.query('SELECT * FROM hit_points');
  return res.rows;
}

export async function getHitPointById(id) {
  const res = await db.query('SELECT * FROM hit_points WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createHitPoint(data) {
  const { character_id, max_hit_points, current_hit_points, temporary_hit_points } = data;
  const res = await db.query(
    'INSERT INTO hit_points (character_id, max_hit_points, current_hit_points, temporary_hit_points) VALUES ($1, $2, $3, $4) RETURNING *',
    [character_id, max_hit_points, current_hit_points, temporary_hit_points]
  );
  return res.rows[0];
}

export async function updateHitPoint(id, data) {
  const { character_id, max_hit_points, current_hit_points, temporary_hit_points } = data;
  const res = await db.query(
    'UPDATE hit_points SET character_id = $1, max_hit_points = $2, current_hit_points = $3, temporary_hit_points = $4 WHERE id = $5 RETURNING *',
    [character_id, max_hit_points, current_hit_points, temporary_hit_points, id]
  );
  return res.rows[0];
}

export async function deleteHitPoint(id) {
  const res = await db.query('DELETE FROM hit_points WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `messaging_board` table
export async function getMessages() {
  const res = await db.query('SELECT * FROM messaging_board');
  return res.rows;
}

export async function getMessageById(id) {
  const res = await db.query('SELECT * FROM messaging_board WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createMessage(data) {
  const { group_id, user_id, message } = data;
  const res = await db.query(
    'INSERT INTO messaging_board (group_id, user_id, message) VALUES ($1, $2, $3) RETURNING *',
    [group_id, user_id, message]
  );
  return res.rows[0];
}

export async function updateMessage(id, data) {
  const { group_id, user_id, message } = data;
  const res = await db.query(
    'UPDATE messaging_board SET group_id = $1, user_id = $2, message = $3 WHERE id = $4 RETURNING *',
    [group_id, user_id, message, id]
  );
  return res.rows[0];
}

export async function deleteMessage(id) {
  const res = await db.query('DELETE FROM messaging_board WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `notes` table
export async function getNotes() {
  const res = await db.query('SELECT * FROM notes');
  return res.rows;
}

export async function getNoteById(id) {
  const res = await db.query('SELECT * FROM notes WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createNote(data) {
  const { character_id, note_text } = data;
  const res = await db.query(
    'INSERT INTO notes (character_id, note_text) VALUES ($1, $2) RETURNING *',
    [character_id, note_text]
  );
  return res.rows[0];
}

export async function updateNote(id, data) {
  const { character_id, note_text } = data;
  const res = await db.query(
    'UPDATE notes SET character_id = $1, note_text = $2 WHERE id = $3 RETURNING *',
    [character_id, note_text, id]
  );
  return res.rows[0];
}

export async function deleteNote(id) {
  const res = await db.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `saving_throws` table
export async function getSavingThrows() {
  const res = await db.query('SELECT * FROM saving_throws');
  return res.rows;
}

export async function getSavingThrowById(id) {
  const res = await db.query('SELECT * FROM saving_throws WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createSavingThrow(data) {
  const { character_id, ability, proficiency } = data;
  const res = await db.query(
    'INSERT INTO saving_throws (character_id, ability, proficiency) VALUES ($1, $2, $3) RETURNING *',
    [character_id, ability, proficiency]
  );
  return res.rows[0];
}

export async function updateSavingThrow(id, data) {
  const { character_id, ability, proficiency } = data;
  const res = await db.query(
    'UPDATE saving_throws SET character_id = $1, ability = $2, proficiency = $3 WHERE id = $4 RETURNING *',
    [character_id, ability, proficiency, id]
  );
  return res.rows[0];
}

export async function deleteSavingThrow(id) {
  const res = await db.query('DELETE FROM saving_throws WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `skills` table
export async function getSkills() {
  const res = await db.query('SELECT * FROM skills');
  return res.rows;
}

export async function getSkillById(id) {
  const res = await db.query('SELECT * FROM skills WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createSkill(data) {
  const { character_id, skill_name, proficiency, ability_modifier } = data;
  const res = await db.query(
    'INSERT INTO skills (character_id, skill_name, proficiency, ability_modifier) VALUES ($1, $2, $3, $4) RETURNING *',
    [character_id, skill_name, proficiency, ability_modifier]
  );
  return res.rows[0];
}

export async function updateSkill(id, data) {
  const { character_id, skill_name, proficiency, ability_modifier } = data;
  const res = await db.query(
    'UPDATE skills SET character_id = $1, skill_name = $2, proficiency = $3, ability_modifier = $4 WHERE id = $5 RETURNING *',
    [character_id, skill_name, proficiency, ability_modifier, id]
  );
  return res.rows[0];
}

export async function deleteSkill(id) {
  const res = await db.query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `spell_slots` table
export async function getSpellSlots() {
  const res = await db.query('SELECT * FROM spell_slots');
  return res.rows;
}

export async function getSpellSlotById(id) {
  const res = await db.query('SELECT * FROM spell_slots WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createSpellSlot(data) {
  const { character_id, spell_level, max_slots, used_slots } = data;
  const res = await db.query(
    'INSERT INTO spell_slots (character_id, spell_level, max_slots, used_slots) VALUES ($1, $2, $3, $4) RETURNING *',
    [character_id, spell_level, max_slots, used_slots]
  );
  return res.rows[0];
}

export async function updateSpellSlot(id, data) {
  const { character_id, spell_level, max_slots, used_slots } = data;
  const res = await db.query(
    'UPDATE spell_slots SET character_id = $1, spell_level = $2, max_slots = $3, used_slots = $4 WHERE id = $5 RETURNING *',
    [character_id, spell_level, max_slots, used_slots, id]
  );
  return res.rows[0];
}

export async function deleteSpellSlot(id) {
  const res = await db.query('DELETE FROM spell_slots WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `spells` table
export async function getSpells() {
  const res = await db.query('SELECT * FROM spells');
  return res.rows;
}

export async function getSpellById(id) {
  const res = await db.query('SELECT * FROM spells WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createSpell(data) {
  const { character_id, spell_name, spell_level, school, casting_time, range, components, duration, description } = data;
  const res = await db.query(
    'INSERT INTO spells (character_id, spell_name, spell_level, school, casting_time, range, components, duration, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [character_id, spell_name, spell_level, school, casting_time, range, components, duration, description]
  );
  return res.rows[0];
}

export async function updateSpell(id, data) {
  const { character_id, spell_name, spell_level, school, casting_time, range, components, duration, description } = data;
  const res = await db.query(
    'UPDATE spells SET character_id = $1, spell_name = $2, spell_level = $3, school = $4, casting_time = $5, range = $6, components = $7, duration = $8, description = $9 WHERE id = $10 RETURNING *',
    [character_id, spell_name, spell_level, school, casting_time, range, components, duration, description, id]
  );
  return res.rows[0];
}
// Utility functions for the `spells` table
export async function getSpells() {
  const res = await db.query('SELECT * FROM spells');
  return res.rows;
}

export async function getSpellById(id) {
  const res = await db.query('SELECT * FROM spells WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createSpell(data) {
  const { character_id, spell_name, spell_level, school, casting_time, range, components, duration, description } = data;
  const res = await db.query(
    'INSERT INTO spells (character_id, spell_name, spell_level, school, casting_time, range, components, duration, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [character_id, spell_name, spell_level, school, casting_time, range, components, duration, description]
  );
  return res.rows[0];
}

export async function deleteSpell(id) {
  const res = await db.query('DELETE FROM spells WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Repeat similar utility functions for other tables like `attacks`, `characters`, etc.

// Utility functions for the `characters` table
export async function getCharacters() {
  const res = await db.query('SELECT * FROM characters');
  return res.rows;
}

export async function getCharacterById(id) {
  const res = await db.query('SELECT * FROM characters WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createCharacter(data) {
  const { name, race, class: characterClass, background, alignment, experience_points, level, player_name } = data;
  const res = await db.query(
    'INSERT INTO characters (name, race, class, background, alignment, experience_points, level, player_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [name, race, characterClass, background, alignment, experience_points, level, player_name]
  );
  return res.rows[0];
}

export async function updateCharacter(id, data) {
  const { name, race, class: characterClass, background, alignment, experience_points, level, player_name } = data;
  const res = await db.query(
    'UPDATE characters SET name = $1, race = $2, class = $3, background = $4, alignment = $5, experience_points = $6, level = $7, player_name = $8 WHERE id = $9 RETURNING *',
    [name, race, characterClass, background, alignment, experience_points, level, player_name, id]
  );
  return res.rows[0];
}

export async function deleteCharacter(id) {
  const res = await db.query('DELETE FROM characters WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `spell_slots` table
export async function getSpellSlots() {
  const res = await db.query('SELECT * FROM spell_slots');
  return res.rows;
}

export async function getSpellSlotById(id) {
  const res = await db.query('SELECT * FROM spell_slots WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createSpellSlot(data) {
  const { character_id, spell_level, max_slots, used_slots } = data;
  const res = await db.query(
    'INSERT INTO spell_slots (character_id, spell_level, max_slots, used_slots) VALUES ($1, $2, $3, $4) RETURNING *',
    [character_id, spell_level, max_slots, used_slots]
  );
  return res.rows[0];
}

export async function updateSpellSlot(id, data) {
  const { character_id, spell_level, max_slots, used_slots } = data;
  const res = await db.query(
    'UPDATE spell_slots SET character_id = $1, spell_level = $2, max_slots = $3, used_slots = $4 WHERE id = $5 RETURNING *',
    [character_id, spell_level, max_slots, used_slots, id]
  );
  return res.rows[0];
}

export async function deleteSpellSlot(id) {
  const res = await db.query('DELETE FROM spell_slots WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `spells` table
export async function getSpells() {
  const res = await db.query('SELECT * FROM spells');
  return res.rows;
}

export async function getSpellById(id) {
  const res = await db.query('SELECT * FROM spells WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createSpell(data) {
  const { character_id, spell_name, spell_level, school, casting_time, range, components, duration, description } = data;
  const res = await db.query(
    'INSERT INTO spells (character_id, spell_name, spell_level, school, casting_time, range, components, duration, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [character_id, spell_name, spell_level, school, casting_time, range, components, duration, description]
  );
  return res.rows[0];
}

export async function updateSpell(id, data) {
  const { character_id, spell_name, spell_level, school, casting_time, range, components, duration, description } = data;
  const res = await db.query(
    'UPDATE spells SET character_id = $1, spell_name = $2, spell_level = $3, school = $4, casting_time = $5, range = $6, components = $7, duration = $8, description = $9 WHERE id = $10 RETURNING *',
    [character_id, spell_name, spell_level, school, casting_time, range, components, duration, description, id]
  );
  return res.rows[0];
}

export async function deleteSpell(id) {
  const res = await db.query('DELETE FROM spells WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `users` table
export async function getUsers() {
  const res = await db.query('SELECT * FROM public.users;');
  return res.rows;
}

export async function getUserById(id) {
  const res = await db.query('SELECT * FROM public.users WHERE id = $1;', [id]);
  return res.rows[0];
}

export async function createUser(data) {
  const { username, user_email } = data;
  // Adjusted to only include fields provided by Clerk
  const user_bio = null; // Default value or handle as needed
  const name = null; // Default value or handle as needed
  const profile_picture_url = null; // Default value or handle as needed
  const res = await db.query(
    'INSERT INTO public.users (username, user_bio, user_email, name, profile_picture_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
    [username, user_bio, user_email, name, profile_picture_url]
  );
  return res.rows[0];
}

export async function updateUser(id, data) {
  const { username, user_bio, user_email, name, profile_picture_url } = data;
  const res = await db.query(
    'UPDATE public.users SET username = $1, user_bio = $2, user_email = $3, name = $4, profile_picture_url = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *;',
    [username, user_bio, user_email, name, profile_picture_url, id]
  );
  return res.rows[0];
}

export async function deleteUser(id) {
  const res = await db.query('DELETE FROM public.users WHERE id = $1 RETURNING *;', [id]);
  return res.rows[0];
}
// Utility functions for the `user_following` table
export async function getUserFollowings() {
  const res = await db.query('SELECT * FROM user_following');
  return res.rows;
}

export async function getUserFollowingById(id) {
  const res = await db.query('SELECT * FROM user_following WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createUserFollowing(data) {
  const { follower_id, followed_id } = data;
  const res = await db.query(
    'INSERT INTO user_following (follower_id, followed_id) VALUES ($1, $2) RETURNING *',
    [follower_id, followed_id]
  );
  return res.rows[0];
}

export async function deleteUserFollowing(id) {
  const res = await db.query('DELETE FROM user_following WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}
// Utility functions for the `posts` table
export async function getPosts() {
  const res = await db.query('SELECT * FROM posts');
  return res.rows;
}

export async function getPostById(id) {
  const res = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createPost(data) {
  const { user_id, post_content } = data;
  const res = await db.query(
    'INSERT INTO posts (user_id, post_content) VALUES ($1, $2) RETURNING *',
    [user_id, post_content]
  );
  return res.rows[0];
}

export async function updatePost(id, data) {
  const { user_id, post_content } = data;
  const res = await db.query(
    'UPDATE posts SET user_id = $1, post_content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [user_id, post_content, id]
  );
  return res.rows[0];
}

export async function deletePost(id) {
  const res = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `likes` table
export async function getLikes() {
  const res = await db.query('SELECT * FROM likes');
  return res.rows;
}

export async function getLikeById(id) {
  const res = await db.query('SELECT * FROM likes WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createLike(data) {
  const { post_id, user_id } = data;
  const res = await db.query(
    'INSERT INTO likes (post_id, user_id) VALUES ($1, $2) RETURNING *',
    [post_id, user_id]
  );
  return res.rows[0];
}

export async function deleteLike(id) {
  const res = await db.query('DELETE FROM likes WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

// Utility functions for the `comments` table
export async function getComments() {
  const res = await db.query('SELECT * FROM comments');
  return res.rows;
}

export async function getCommentById(id) {
  const res = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
  return res.rows[0];
}

export async function createComment(data) {
  const { post_id, user_id, comment_content } = data;
  const res = await db.query(
    'INSERT INTO comments (post_id, user_id, comment_content) VALUES ($1, $2, $3) RETURNING *',
    [post_id, user_id, comment_content]
  );
  return res.rows[0];
}

export async function updateComment(id, data) {
  const { post_id, user_id, comment_content } = data;
  const res = await db.query(
    'UPDATE comments SET post_id = $1, user_id = $2, comment_content = $3 WHERE id = $4 RETURNING *',
    [post_id, user_id, comment_content, id]
  );
  return res.rows[0];
}

export async function deleteComment(id) {
  const res = await db.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
}

