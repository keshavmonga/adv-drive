import React from 'react'
import { useLocation } from 'react-router-dom'

const NotFound = () => {
    const a = useLocation();
    console.log(a)
  return (
    <div>
      A
    </div>
  )
}

export default NotFound
