//Importing File type icons
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

//Exporting React Icons
export { AiFillEdit as Edit, AiFillDelete as Delete } from 'react-icons/ai'
export { BsFillShareFill as Share } from 'react-icons/bs'
export { MdFavoriteBorder as Favorite } from 'react-icons/md'

//exporting MUI icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logout from '@mui/icons-material/Logout';


export { MoreVertIcon as VerticalMenu , Logout }


export const fileIcons = {
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