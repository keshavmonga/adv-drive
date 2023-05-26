const primary = "#8739F9"
const secondary = "#37b9f1"
const offWhite = "#F2F5F5"

export const buttonSX = {
  px: 4,
  borderRadius: 5,
  py: 1,
  boxShadow: 2,
  bgcolor: "hsla(40, 88%, 97%, 1)",
  color: "black",
  "fontSize": "medium",
  "fontWeight": "800",
  borderColor: "#8739F9",
  "&:hover": {
    color: "#8739F9",
    borderColor: "white",
    boxShadow: 3,
  },
};

export const toggleSX = {
  height: 40,
  borderRadius: 3,
  boxShadow: 3,
  px: 2,
  color: "black",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "hsla(40, 88%, 97%, 1)",
    backgroundColor: 'rgb(33, 74, 149)'
  }
}

export const FormSX = {
  display: "flex",
  justifyContent: "space-between",
  "flex-direction": "column",
  p: 3,
  borderRadius: 8,
  '& .MuiTextField-root': { m: 1, color: "white" },
}
export const SearchSX = {
  height: '2.3rem',
  width: "15rem",
  bgcolor: "white",
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  position: 'fixed',
  top: 17,
  right: 300,
  zIndex:100,
  border:'2px solid #8739F9',
  "&:hover":{
    boxShadow:2
  }
}

export const gridSX = {
  borderBottom: '1px solid grey',
  '&:hover': {
    cursor: 'pointer',
    background: 'lightgrey',
    boxShadow: 1,
  }
}
export const gridButtonSX = {
  gap: `max(1rem , calc(100% - 38rem))`,
  background: 'none',
}
export const gridAvatarSX = {
  display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' },
  backgroundColor: 'none',
  borderRadius: 3,
  '&:hover': {
    boxShadow: 2,
    backgroundColor: '#F2F5F5',
  }
}
