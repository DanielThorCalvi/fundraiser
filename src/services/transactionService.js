import { supabase } from '../supabaseClient'

export async function fetchTransactions() {
  const { data, error } = await supabase
    .from('transactions')
    .select('amount, description, created_at, id')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching transactions:', error)
    return
  }
  return data;
}

export async function addTransaction(transaction) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([
      transaction
    ])
}

export async function updateTransaction(transaction) {
  const { data, error } = await supabase
    .from('transactions')
    .update(transaction)
    .eq('id', transaction.id);
}

export async function deleteTransaction(id) {
  const { data, error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting transaction:', error)
    return
  }
  return data;
}