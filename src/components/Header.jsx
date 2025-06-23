import { LinkIcon, LogOut } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarImage } from './ui/avatar'
import { urlState } from '@/context'
import useFetch from '@/hooks/useFetch'
import { logout } from '@/db/apiAuth'
import Loader from './Loader'

const Header = () => {
    const { user, fetchUser } = urlState();
    const navigate = useNavigate()
    const { loading, fn: fnLogout } = useFetch(logout)
    const currentUrl = window.location.pathname;
    const handleLogout = () => {
        fnLogout().then(() => {
            fetchUser();
            navigate('/')
        })
    }

    return (
        <>
            {
                loading &&
                <Loader />
            }
            <nav className='px-15 py-4 flex justify-between items-center border-b-2 w-full sticky top-0 bg-sky-50 z-10 text-black'>
                <Link to={'/'} className='flex gap-1'>
                    <LinkIcon size={38} />
                    <span className='text-2xl font-extrabold'>Snip</span>
                </Link>
                <div className='hidden lg:flex items-center justify-around gap-20'>
                    <Link to={'/'} className={`text-lg font-semibold hover:underline ${currentUrl === '/' ? 'text-blue-700' : ''}`}>Home</Link>
                    <span className='mx-2'>|</span>
                    <Link to={'/dashboard   '} className={`text-lg font-semibold hover:underline ${currentUrl === '/dashboard' ? 'text-blue-700' : ''}`}>
                        Dashboard
                    </Link>
                </div>
                <div>
                    {
                        !user
                            ? <div>
                                <Button variant={'primary'} className={'text-lg font-semibold hover:underline cursor-pointer'}
                                    onClick={() => navigate('/auth')} >Login
                                </Button>
                            </div>

                            : <DropdownMenu >
                                <DropdownMenuTrigger className=' overflow-hidden rounded-full'>
                                    <Avatar>
                                        <AvatarImage src={user?.user_metadata?.profile_pic} className={'object-fill'} />
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='text-center'>
                                    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                                        <LinkIcon className='mr-1 size-4' /><span>My Links</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className={'text-red-500'} onClick={handleLogout}>
                                        <LogOut className='mr-1 size-4' /><span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                    }
                </div>
            </nav>
        </>
    )
}

export default Header