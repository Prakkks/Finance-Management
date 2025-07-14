import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import router from 'next/router'
import React from 'react'

const Footer = ({user,type= 'desktop'}: FooterProps) => {
  const handleLogOut = async()=> {
    const loggedOut = await logoutAccount();
    if (loggedOut)
      router.push('/sign-in');
  }
  return (
    <footer className='footer'>
        <div className={type === 'desktop' ? 'footer_name' : 'footer_name-mobile'}>
            <p className='text-xl font-bold text-gray-700'>
            {user?.name[0]}
            </p> 

        </div>
        <div className={type === 'mobile'? 'footer_email-mobile': 'footer_email'}>
            <h1 className='text-14 truncate font-normal text-gray-600 '>{user?.name}</h1>
            <p className='text-14 truncate font-normal text-gray-600'>{user?.email}</p>
        </div>
        {/* <div className="footer_image" onClick={handleLogOut}>
          <Image src={'/icons/logout.svg'} alt='logo-logout' height={20} width={20}  />
        </div> */}
    </footer>
  )
}

export default Footer