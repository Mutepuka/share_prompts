"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import{signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const userLoggedIn = true;
  return (
    <nav className='flex-between w-full md-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" 
        alt='Promptopia Logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>Promptopia Logo</p>
      </Link>
      {/** mobile navigation */}
      <div className='sm:flex hidden'>
        {userLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-post" className='black_btn'>
            Create Post
            </Link>
          </div>
        ):(
          <div></div>
        )}

      </div>
      </nav>
  )
}

export default Nav