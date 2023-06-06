import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import UploadIcon from '@mui/icons-material/Upload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useStore, getcurrentUser } from '@FireContext';
import { useSelector, useDispatch } from 'react-redux'
import { portalOn } from '../../redux/slices/portalSlice'
import { snackOn, snackOff } from '../../redux/slices/snackSlice'
import { loading } from '../../redux/slices/loaderSlice';
import Portal from './Portal';
import { refresh } from '../../redux/slices/updateSlice';
import { useParams } from 'react-router-dom';


export default function SpeedDialMenu() {

  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [meta, setMeta] = React.useState({});

  const currentUser = getcurrentUser();
  const { uploadFile, createFolder } = useStore();

  const folderId = useParams().folderId ?? 'home';

  const dispatch = useDispatch();
  const inputRef = React.useRef();

  const acceptedTypes = ".html , .css , .js , .png , .jpg , .jpeg , .ipynb , .xml , .py , .cpp, .php, .htm";

  const actions = [
    { icon: <UploadIcon />, name: 'Upload', action: () => { inputRef.current.click() } },
    { icon: <CreateNewFolderIcon />, name: 'New Folder', action: () => { dispatch(portalOn({ create: true, rename: false })) } },
  ];

  const handle = () => setOpen((prev) => !prev);

  const handleChange = (e) => {
    e.stopPropagation();
    dispatch(loading(true))
    setFile(e.target.files[0])
    setMeta({
      name: e.target.files[0]?.name,
      type: e.target.files[0]?.type,
      size: e.target.files[0]?.size,
    })
  }

  const upload = async () => {
    await uploadFile(currentUser.uid, folderId, File, meta)
    dispatch(snackOn({ type: "success", message: "File Uploaded" }))
    setFile(null)
    dispatch(refresh())
  }

  const handleCreate = async (name) => {
    await createFolder(currentUser.uid, name, folderId)
  }

  React.useEffect(() => {
    file && upload()
  }, [file]);

  return (
    <>
      <Portal
        placeholder='Enter folder name'
        title='Create folder'
        fn={handleCreate}
      />
      <input
        ref={inputRef}
        onChange={handleChange}
        hidden
        accept={acceptedTypes}
        type="file"
      />
      <Backdrop sx={{ position: 'fixed', inset: 0, zIndex: 1000 }} open={open} />
      <SpeedDial
        FabProps={{ sx: { background: '#8739F9', '&:hover': { background: '#662abe' } } }}
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', bottom: 64, right: 64 }}
        icon={<SpeedDialIcon />}
        onClick={handle}
        open={open}
      >
        {actions.map(action =>
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
          />
        )}
      </SpeedDial>
    </>
  );
}