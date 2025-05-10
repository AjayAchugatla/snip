import { LinkIcon, LogOut, ScissorsSquare } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { urlState } from '@/context'
import useFetch from '@/hooks/useFetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'

const Header = () => {
    const { user, fetchUser } = urlState();
    const navigate = useNavigate()
    const { loading, fn: fnLogout } = useFetch(logout)

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
                <BarLoader className={"mb-4"} width={"100%"} color="#36d7b7" />
            }
            <nav className='px-15 py-4 flex justify-between items-center border-b-2 w-full sticky top-0 bg-slate-800'>
                <Link to={'/'}>
                    <ScissorsSquare size={50} />
                </Link>

                <div>
                    {
                        !user
                            ? <Button onClick={() => navigate('/auth')} className={'cursor-pointer'}>Login</Button>
                            : <DropdownMenu >
                                <DropdownMenuTrigger className=' overflow-hidden rounded-full'>
                                    <Avatar>
                                        <AvatarImage src={user?.user_metadata?.profile_pic} className={'object-fill'} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='text-center'>
                                    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
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