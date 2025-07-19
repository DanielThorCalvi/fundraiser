import { supabase } from '../supabaseClient'

export async function fetchGoals() {
  const { data, error } = await supabase
    .from('goals')
    .select('amount, name, created_at, id, achieved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching goals:', error)
    return
  }
  return data;
}

export async function addGoal(goal) {
  const { data, error } = await supabase
    .from('goals')
    .insert([
      goal
    ])
    .select();
  return data[0];
}

export async function updateGoal(goal) {
  const { data, error } = await supabase
    .from('goals')
    .update(goal)
    .eq('id', goal.id);
}

export async function deleteGoal(id) {
  const { data, error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting goal:', error)
    return
  }
  return data;
}