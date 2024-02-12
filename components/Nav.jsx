"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import{signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const { data: session }= useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, [])

  console.log('this is the session', session);

 
  return (
    <nav className='flex-between w-full md-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" 
        alt='Promptopia Logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
      
      {/* desktop navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-post" className='black_btn'>
            Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            <Link href="/profile">
            <Image
            src={session?.user.image}
            alt='Profile Image'
            width={37}
            height={37}
            className='rounded-full'
            />
            </Link>
          </div>
        ):(
          <>
          {providers && Object.values(providers).map((provider)=>(
            <button
            type='button'
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className='black_btn'
            >
              Sign In
            </button>
          ))}
          </>
        )}

      </div>
      {/**Mobile Novigation */}
      <div className='sm:hidden flex-relative'>
        {session?.user ?(
          <div className='flex'>
            <Image
            src="/assets/images/logo.svg"
            alt='Profile Image'
            width={37}
            height={37}
            className='rounded-full'
            onClick ={()=> settoggleDropdown((prev)=> !prev)}
            />
            {toggleDropdown && (
              <div className='dropdown' >
                <Link href='/profile'  className='dropdown_link' onClick={()=> settoggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href='/create-prompt'  className='dropdown_link' onClick={()=> settoggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button type='button' onClick={()=>{
                  settoggleDropdown(false)
                  signOut()
                }}
                className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>

              </div>
            )}
          </div>
        ):(
        <>
        {providers && Object.values(providers).map((provider)=>(
            <button
            type='button'
            key={provider.name}
            onClick={()=> signIn(provider.id)}
            className='black_btn'
            >
              Sign In
            </button>
          ))}

        </>)}
      </div>
      </nav>
  )
}

export default Nav