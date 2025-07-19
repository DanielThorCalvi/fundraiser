import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTransaction } from '../services/transactionService';

export default function TransactionList({ transactions, setTransactions, setCurrentAmount }) {
  const handleEdit = (transaction) => {
    // Logic to handle editing a transaction
    console.log('Edit transaction:', transaction);
  };
  const handleDelete = (transaction) => {
    setTransactions(prev => prev.filter(tx => tx.id !== transaction.id));
    setCurrentAmount(prev => prev - transaction.amount);
    deleteTransaction(transaction.id);
  }
  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align='right' sx={{ borderRight:'1px solid #ccc' }}>Upphæð (kr.)</TableCell>
            <TableCell sx={{ borderRight:'1px solid #ccc' }}>Lýsing</TableCell>
            <TableCell sx={{ borderRight:'1px solid #ccc' }}>Dags.</TableCell>
            <TableCell align='right'>Aðgerðir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row, idx) => (
            <TableRow key={row.id || idx}>
              <TableCell align='right'sx={{ borderRight:'1px solid #ccc' }}>{row.amount.toLocaleString('de-DE')}</TableCell>
              <TableCell sx={{ borderRight:'1px solid #ccc' }}>{row.description}</TableCell>
              <TableCell sx={{ borderRight:'1px solid #ccc' }}>{format(row.created_at, 'MM/dd/yyyy')}</TableCell>
              <TableCell align="right">
                {/* <IconButton
                  color="primary"
                  onClick={() => handleEdit(row)}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton> */}
                <IconButton
                  color="primary"
                  onClick={() => handleDelete(row)}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}