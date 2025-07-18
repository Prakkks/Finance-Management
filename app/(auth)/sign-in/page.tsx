import AuthForm from '@/components/ui/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const SignIn = async() => {
  const loggedinUser = await getLoggedInUser();
  if (loggedinUser) 
  console.log('from signin page',loggedinUser);
    
  return (
    <section className='flex-center size-full max-sm:px-6'>
    <AuthForm type='sign-in' />
    </section>
  )
}

export default SignIn