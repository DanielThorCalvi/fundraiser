import { useState, useEffect } from 'react';
import FundraiserProgress from './components/FundraiserProgress'
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import TabPanel from './components/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import ListIcon from '@mui/icons-material/List';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { addTransaction, fetchTransactions } from './services/transactionService';
import { addGoal, fetchGoals } from './services/goalService';
import GoalList from './components/GoalList';

function App() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [tab, setTab] = useState(0);
  const goalAmount = 10000000; // 1 million kr

  useEffect(() => {
    async function startup() {
      const transactionsData = await fetchTransactions();
      const goalsData = await fetchGoals(); // Assuming you have a similar function for goals

      setGoals(goalsData || []);
      setTransactions(transactionsData);

      const totalAmount = transactionsData.reduce((acc, tx) => acc + parseFloat(tx.amount), 0)
      setCurrentAmount(totalAmount)    
    }

    startup()
  }, [])

  const handleDonate = async (transaction) => {
    addTransaction(transaction);
    setTransactions(prev => [{ ...transaction, created_at: new Date() },...prev]);
    setCurrentAmount(prev => prev + transaction.amount);
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center', // <- aligns logo and tabs vertically
              px: 2,
              height: 64, // optional: make sure there's enough height
              borderBottom: 1,
              borderColor: 'divider',
              justifyContent: 'center', // center tabs
            }}
          >
            <Box component="img" src={`${import.meta.env.BASE_URL}/logo.svg`} alt="Logo" 
              sx={{ 
                height: 40, 
                mr: 4, 
                position: 'absolute',
                left: 16,
              }}
            />
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab icon={<ThermostatIcon />} />
              <Tab icon={<ListIcon />} />
              <Tab icon={<EmojiEventsIcon />} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <FundraiserProgress goalAmount={goalAmount} currentAmount={currentAmount} />
            <TransactionForm onDonate={handleDonate} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Box sx={{ width: '100%', justifyItems: 'center' }}>
              <Box sx={{ width: '70vw' }}>
                <TransactionList  transactions={transactions} setTransactions={setTransactions} setCurrentAmount={setCurrentAmount}/>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Box sx={{ width: '100%', justifyItems: 'center' }}>
              <Box sx={{ width: '70vw' }}>
                <GoalList  goals={goals} setGoals={setGoals}/>
              </Box>
            </Box>
          </TabPanel>
        </Box> 
      </ThemeProvider>
    </>
  )
}

export default App
