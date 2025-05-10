import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
const AppLayout = () => {
    return (
        <div>
            <main className='min-h-screen'>
                <Header />
                <div className='px-6'>
                    {<Outlet />}
                </div>
            </main>
            <div className='sm:mt-8 p-5 text-center bg-gray-800'>
                Made by Ajay
            </div>
        </div>
    )
}

export default AppLayout