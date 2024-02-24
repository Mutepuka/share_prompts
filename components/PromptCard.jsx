"use client";

import {useState} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete}) => {

  console.log('this is the post data', post);

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div>
      
        </div>
      </div>
      </div>
  )
}

export default PromptCard