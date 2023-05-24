import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

export default function Loader() {

    const loader = useSelector((state) => state.loader.value)

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000000 }}
            open={loader}
        >
            <CircularProgress />
        </Backdrop>
    );
}