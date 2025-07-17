import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';

export default function TransactionList({ transactions }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="transactions table">
        <TableHead>
          <TableRow>
            <TableCell align='right'>Upphæð (kr.)</TableCell>
            <TableCell>Lýsing</TableCell>
            <TableCell>Dags.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row, idx) => (
            <TableRow key={row.id || idx}>
              <TableCell align='right'>{row.amount.toLocaleString('de-DE')}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{format(row.created_at, 'MM/dd/yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}