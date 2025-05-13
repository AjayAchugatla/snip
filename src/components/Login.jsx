import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import { z } from 'zod'
import useFetch from '@/hooks/useFetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { urlState } from '@/context'

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const longLink = searchParams.get("createNew")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const { data, error, loading, fn: fnLogin } = useFetch(login)
    const { fetchUser } = urlState()
    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
            fetchUser()
        }

    }, [data, error])

    const handleLogin = async () => {
        setErrors({})
        try {
            const userSchema = z.object({
                email: z.string()
                    .email({ message: "Invalid email address" }),
                password: z.string()
                    .min(6, { message: "Password length must be at least 6 characters" })
            })

            const obj = userSchema.safeParse(formData)
            if (obj.success) {
                await fnLogin(formData)
            }
            else {
                const newErrors = {}
                obj.error.errors.forEach((err) => {
                    newErrors[err.path[0]] = err.message
                })
                setErrors(newErrors)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>to your account if you already have one</CardDescription>
                    {error && <Error message={error.message} />}
                </CardHeader>
                <CardContent className={'space-y-2 '}>
                    <div className='space-y-1'>
                        <Input name='email' type={'email'} placeholder="Enter Email" onChange={handleInputChange} />
                        {errors.email ? <Error message={errors.email} /> : null}
                    </div>
                    <div className='space-y-1'>
                        <Input name='password' type={'password'} placeholder="Enter Password" onChange={handleInputChange} />
                        <Error message={""} />
                        {errors.password ? <Error message={errors.password} /> : null}
                    </div>
                </CardContent>
                <CardFooter className={'flex justify-center'}>
                    <Button className="cursor-pointer" onClick={handleLogin}>{loading ? <BeatLoader size={10} color='#36d7b7' /> : "Login"}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login