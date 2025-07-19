import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { deleteGoal } from '../services/goalService';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import GoalForm from './GoalForm';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';


export default function GoalList({ goals, setGoals }) {
  const [open, setOpen] = useState(false);

  const handleEdit = (goal) => {
    // Logic to handle editing a goal
    console.log('Edit goal:', goal);
  };
  const handleDelete = (goal) => {
    setGoals(prev => prev.filter(tx => tx.id !== goal.id));
    deleteGoal(goal.id);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Box display="flex" justifyContent="right" sx={{ minWidth: 650, borderBottom:'1px solid #ccc' }}>
          <IconButton color="primary" aria-label="add to shopping cart"  onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </Box>
        <Table size="small" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderRight:'1px solid #ccc' }}>Nafn</TableCell>
              <TableCell align='right' sx={{ borderRight:'1px solid #ccc' }}>Upphæð (kr.)</TableCell>
              <TableCell sx={{ borderRight:'1px solid #ccc' }}>Dags.</TableCell>
              <TableCell align='center' sx={{ borderRight:'1px solid #ccc' }}><Icon> <CheckIcon /></Icon></TableCell>
              <TableCell align='right'>Aðgerðir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((row, idx) => (
              <TableRow key={row.id || idx}>
                <TableCell sx={{ borderRight:'1px solid #ccc' }}>{row.name}</TableCell>
                <TableCell align='right'sx={{ borderRight:'1px solid #ccc' }}>{row.amount.toLocaleString('de-DE')}</TableCell>
                <TableCell sx={{ borderRight:'1px solid #ccc' }}>{format(row.created_at, 'MM/dd/yyyy')}</TableCell>
                <TableCell align='center' sx={{ borderRight:'1px solid #ccc' }}><Checkbox checked={row.achieved} disabled /></TableCell>
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

      <Dialog open={open} onClose={() => {}}>
        <DialogTitle>Setja markmið</DialogTitle>
         <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <GoalForm setOpen={setOpen} setGoals={setGoals}></GoalForm>
        </DialogContent>
      </Dialog>
    </>
  );
}