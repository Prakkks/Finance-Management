import AuthForm from '@/components/ui/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const SignIn = async() => {
  const loggedinUser = await getLoggedInUser();
  console.log(loggedinUser);

  return (
    <section className='flex-center size-full max-sm:px-6'>
    <AuthForm type='sign-in' />
    </section>
  )
}

export default SignIn