import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useStore, getcurrentUser } from '@FireContext';
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../../redux/slices/portalSlice'
import { useParams } from 'react-router-dom';
import { refresh } from '../../redux/slices/updateSlice';

export default function Portal() {
  let { folderId } = useParams();
  const { createFolder } = useStore();

  if (folderId === undefined) { folderId = "home" }

  const open = useSelector((state) => state.portal.value)
  
  let { path,pathName } = useSelector((state) => state.path.value)
  const [name, setName] = React.useState("");

  const dispatch = useDispatch()

  const currentUser = getcurrentUser();

  const handleClose = () => {
    dispatch(toggle())
  };

  const handleCreate = async () => {
    if (pathName === undefined) { pathName = "home" }
    await createFolder(currentUser.uid, { name, path, pathName }, folderId)
    setName("")
    dispatch(refresh())
    dispatch(toggle())
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new folder</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => { setName(e.target.value) }}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Enter folder name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}