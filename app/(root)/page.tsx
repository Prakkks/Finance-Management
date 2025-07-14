import HeaderBox from '@/components/ui/HeaderBox'
import RightSideBar from '@/components/ui/RightSideBar';
import TotalBlncBox from '@/components/ui/TotalBlncBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Home = async() => {
    const loggedIn = await getLoggedInUser();
    if (loggedIn) {
      console.log('logged in ', loggedIn);
    }
  return (
    <section className='home'>
        <div className='home-content'> 
            <header className='home-header'>
               <HeaderBox type='greeting' title='Welcome' user= { loggedIn?.name || 'Guest'}
               subtext = 'Access and manage your account and transactions efficiently.'
               />
            
            <TotalBlncBox  accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1256.43}  />
            </header>
            RECENT TRANSACTIONS 

        </div>
        <RightSideBar user= {loggedIn} transactions = {[]} banks= {[{currentBalance: 1230},{currentBalance: 500} ]} />
    </section>

  )
}

export default Home