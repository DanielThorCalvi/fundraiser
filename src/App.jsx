import { useState, useEffect } from 'react';
import FundraiserProgress from './components/FundraiserProgress'
import TransactionForm from './components/TransactionForm';
import { supabase } from './supabaseClient'

function App() {
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      const { data, error } = await supabase
        .from('transactions')
        .select('amount')

      if (error) {
        console.error('Error fetching transactions:', error)
        return
      }

      const totalAmount = data.reduce((acc, tx) => acc + parseFloat(tx.amount), 0)
      setCurrentAmount(totalAmount)
    }

    fetchTotal()
  }, [])

  const handleDonate = async (transaction) => {
    const { data, error } = await supabase
    .from('transactions')
    .insert([
      transaction
    ])
    setCurrentAmount(prev => prev + transaction.amount);
  }


  return (
    <>
      <FundraiserProgress goalAmount={10000000} currentAmount={currentAmount} />
      <TransactionForm onDonate={handleDonate} />
    </>
  )
}

export default App
