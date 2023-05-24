import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { snackOff } from '../../redux/slices/snackSlice';



function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}



export default function DirectionSnackbar() {
  const snackState = useSelector((state) => state.snack.value)
  const dispatch = useDispatch();

  const [open , type , message] = snackState;

  const [transition, setTransition] = React.useState(() => TransitionLeft);

  const handleClose = () => {
    dispatch(snackOff())
  }

  React.useEffect(() => {
    let t = setTimeout(() => {
      dispatch(snackOff())
    }, 3000);
    return () => {
      dispatch(snackOff())
      clearTimeout(t)
    };
  }, []);

  return (
    <div>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="I love snacks"
        key={transition ? transition.name : ''}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}