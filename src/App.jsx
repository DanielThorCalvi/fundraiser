import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'
import FundraiserProgress from './components/FundraiserProgress'
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import TabPanel from './components/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function App() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState(0);
  const goalAmount = 10000000; // 1 million kr

  useEffect(() => {
    async function fetchTotal() {
      const { data, error } = await supabase
        .from('transactions')
        .select('amount, description, created_at')

      if (error) {
        console.error('Error fetching transactions:', error)
        return
      }

      const totalAmount = data.reduce((acc, tx) => acc + parseFloat(tx.amount), 0)
      setTransactions(data);
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
    setTransactions(prev => [...prev, { ...transaction, created_at: new Date() }]);
    setCurrentAmount(prev => prev + transaction.amount);
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Fundraiser" />
            <Tab label="Table" />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <FundraiserProgress goalAmount={goalAmount} currentAmount={currentAmount} />
          <TransactionForm onDonate={handleDonate} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <TransactionList transactions={transactions} />
        </TabPanel>
      </Box> 
    </>
  )
}

export default App
