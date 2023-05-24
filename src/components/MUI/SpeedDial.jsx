import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import UploadIcon from '@mui/icons-material/Upload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useStore , getcurrentUser } from '@FireContext';
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../../redux/slices/portalSlice'
import { snackOn , snackOff } from '../../redux/slices/snackSlice'
import Portal from './Portal';
import { useParams } from 'react-router-dom';


export default function SpeedDialMenu() {

  const currentUser = getcurrentUser();
  let { folderId } = useParams();

  if (folderId === undefined) { folderId = "home" }

  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [meta, setMeta] = React.useState({});

  const { uploadFile  } = useStore();

  const portal = useSelector((state) => state.portal.value)
  const dispatch = useDispatch()
  const inputRef = React.useRef();

  const handle = () => setOpen((prev) => !prev);

  const handleChange = (e) => {
    setFile(e.target.files[0])
    setMeta({
      name: e.target.files[0]?.name,
      type: e.target.files[0]?.type,
      size: e.target.files[0]?.size,
    })
    e.stopPropagation();
  }

  const actions = [
    { icon: <UploadIcon />, name: 'Upload', action: () => { inputRef.current.click() } },
    { icon: <CreateNewFolderIcon />, name: 'New Folder', action: () => { dispatch(toggle()) } },
  ];

  const get = async () => {
    await uploadFile(currentUser.uid,folderId, File, meta)
    dispatch(snackOn({type:"error",message:"file Uploaded"}))
    setFile(null)
  }

  React.useEffect(() => {
    file && get()
  }, [file]);

  return (
    <>
      <Portal />
      <input ref={inputRef} onChange={handleChange} hidden accept=".html , .css , .js , .png , .jpg , .jpeg , .ipynb , .xml , .py , .cpp, .php" type="file" />
      <Backdrop sx={{ position: 'fixed', inset: 0, zIndex: 1000 }} open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', bottom: 64, right: 64 }}
        icon={<SpeedDialIcon />}
        onClick={handle}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </>
  );
}