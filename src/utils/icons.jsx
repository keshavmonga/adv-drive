//Importing File type icons
import {
    SiHtml5 as Html,
    SiJavascript as Js,
    SiPhp as Php,
    SiJpeg as Jpeg,
    SiPython as Py,
    SiCss3 as Css,
    SiCplusplus as Cpp
} from 'react-icons/si'
import { TbPng as Png } from 'react-icons/tb'
import { VscNotebook as Ipynb } from 'react-icons/vsc'
import { TbJpg as Jpg } from 'react-icons/tb'
import { FcFolder } from 'react-icons/fc'

//Exporting React Icons
export { AiFillEdit as Edit, AiFillDelete as Delete } from 'react-icons/ai'
export { BsFillShareFill as Share } from 'react-icons/bs'
export { BsBalloonHeart as Favorite } from 'react-icons/bs'

export { RiMore2Fill as VerticalMenu } from 'react-icons/ri'
export { MdOutlineLogout as Logout } from 'react-icons/md';


export const fileIcons = {
    html: <Html />,
    htm: <Html />,
    css: <Css />,
    js: <Js />,
    php: <Php />,
    png: <Png />,
    jpg: <Jpg />,
    jpeg: <Jpeg />,
    py: <Py />,
    cpp: <Cpp />,
    ipynb: <Ipynb />,
    folder: <FcFolder />
}