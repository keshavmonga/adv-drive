import React, { useEffect } from 'react'
import { Navbar, Main } from '@components'
import { BreadCrumbs } from '@components/MUI'
import { getcurrentUser, useStore } from '@FireContext'

const Home = () => {
  const currentUser = getcurrentUser();
  const { checkHomeDir } = useStore();

  useEffect(() => {
    checkHomeDir(currentUser?.uid)
  }, []);
  return (
    <>
      <nav>
        <Navbar name={currentUser?.displayName} img={currentUser?.photoURL} />
      </nav>
      <BreadCrumbs />
      <Main />
    </>
  )
}

export default Home
