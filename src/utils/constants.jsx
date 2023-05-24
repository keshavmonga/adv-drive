export { FcGoogle } from 'react-icons/fc'
export { buttonSX, toggleSX } from "../scss/SX";
export { Button, ToggleButton, ToggleButtonGroup, Chip, Avatar, Stack } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
export { Fab, AddIcon }
import { AiFillHtml5 as Html } from "react-icons/ai"
import { RiCss3Line as Css } from 'react-icons/ri'
import { IoLogoJavascript as Js } from 'react-icons/io'
import { SiPhp as Php } from 'react-icons/si'
import { TbPng as Png } from 'react-icons/tb'
import { SiJpeg as Jpeg } from 'react-icons/si'
import { VscNotebook as Ipynb } from 'react-icons/vsc'
import { SiPython as Py } from 'react-icons/si'
import { TbBrandCpp as Cpp } from 'react-icons/tb'
import { TbJpg as Jpg } from 'react-icons/tb'
import { FcFolder } from 'react-icons/fc'

export const icons = {
    html: [<Html />, "orange"],
    css: [<Css />, "blue"],
    js: [<Js />, "#ffbf00"],
    php: [<Php />, "#787CB5"],
    png: [<Png />, "#787CB5"],
    jpg: [<Jpg />, "#787CB5"],
    jpeg: [<Jpeg />, "#787CB5"],
    py: [<Py />, "white"],
    cpp: [<Cpp />, "cornflowerblue"],
    ipynb: [<Ipynb />, "orange"],
    xml: ["xml", "orange"],
    folder: [<FcFolder />, "white"]
}