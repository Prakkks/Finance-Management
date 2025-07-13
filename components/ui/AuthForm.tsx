'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, email, z } from "zod"


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIns, signUps } from '@/lib/actions/user.actions';



const AuthForm = ({type}: {type:string}) => {
  const router = useRouter();
    const [user, SetUser] = useState(null);
    const [isloading, SetIsLoading] = useState(false);
    const formSchema = authFormSchema(type);

     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: '',
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async(data: z.infer<typeof formSchema >) => {
    SetIsLoading(true);
    try
    {
      // Sign up with plaid link token 
      if(type ==='sign-up')
      {
        const newUser = await signUps(data);
        SetUser(newUser);
      }
      if (type === ' sign-in')
      {
         const response = await signIns( {email: data.email, password : data.password,});
         if (response)
         {
           router.push('/');
         }
      }
    } 
    catch(error)
      {
      console.log(error)
      }
    finally{
    SetIsLoading(false);
    }

  }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
             <Link href='/' className=' cursor-pointer flex items-center gap-1 '>
        <Image alt='logo' src={'/icons/logo.svg'} width={34} height={34}  />
        <h1 className='text-26  font-ibm-plex-serif font-bold text-black-1'> Praky</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            
            <p className='text-16 font-normal text-gray-600 '>
                {user? 'Link your account to get started' : 'Please enter your details'}
            </p>
            </h1>
        </div>
        </header>
        {user? (
            <div className='flex flex-col gap-4 '>
                {/* PLaidLink  */}
            </div>
        ):
        <>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        { type === 'sign-up' && 
        <>
        <div className='flex gap-4'>
        <CustomInput control={form.control} label='First Name' name='firstname' placeholder='Enter your first name' />
        <CustomInput control={form.control} label='Last Name' name='lastname' placeholder='Enter your last name' />
        </div>
        <CustomInput control={form.control} label='Address' name='address' placeholder='Enter your specific address' />
        <div className='flex gap-4'>
        <CustomInput control={form.control} label='State' name='state' placeholder='Ex. Kathmandu' />
        <CustomInput control={form.control} label='Postal Code' name='postalCode' placeholder='Ex. 335600' />
        </div>
        <div className='flex gap-4'>
        
        <CustomInput control={form.control} label='Date of Birth' name='dob' placeholder='YYYY-MM-DD' />
        <CustomInput control={form.control} label='SSN' name='ssn' placeholder='Example> 1234' />
        </div>
        </>}
        <CustomInput control={form.control} label='Emal' name='email'placeholder='Enter your username' />
        <CustomInput control={form.control} label='Password' name='password'placeholder='Enter your password' />
        <div className='felx flex-col gap-4'>
        <Button type="submit" className='form-btn' disabled={isloading}>{
            isloading ? (<>
            <Loader2  size={20} className='animate-spin'/> Loading...
            </>): type ==='sign-in' ? 'Sign In' : 'Sign Up'
        }
</Button>
        </div>
      </form>
    </Form>
    <footer className='flex justify-center gap-1'>
        <p className='text-14 font-normal text-gray-600'> {type === 'sign-in' ? 'Dont have an account ?': 'Already have an account?'}</p>
        <Link className='form-link' href={ type === 'sign-in' ? '/sign-up' : '/sign-in'} >
        {type === 'sign-in'? 'Sign Up' : ' Sign In' }
        </Link>
    </footer>
        </>}
    </section>
  )
}

export default AuthForm