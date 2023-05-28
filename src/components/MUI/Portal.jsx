import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../../redux/slices/portalSlice'
import { refresh } from '../../redux/slices/updateSlice';

export default function Portal({placeholder , fn , title}) {

  const open = useSelector((state) => state.portal.value)
  const [name, setName] = React.useState("");

  const dispatch = useDispatch()

  const msg = title.split(' ')[0]

  const handleClose = () => {
    dispatch(toggle());
  };

  const handleClick = async () => {
    await fn(name)
    setName("")
    dispatch(refresh())
    dispatch(toggle())
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => { setName(e.target.value) }}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label={placeholder}
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>{msg}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}