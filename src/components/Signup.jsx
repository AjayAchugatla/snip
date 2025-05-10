import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import { z } from 'zod'
import useFetch from '@/hooks/useFetch'
import { signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { urlState } from '@/context'

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: null
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const longLink = searchParams.get("createNew")

    const handleInputChange = (e) => {
        const { name, value, files } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const { data, error, loading, fn: fnSignup } = useFetch(signup)
    const { fetchUser } = urlState()
    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`)
            fetchUser()
        }

    }, [data, error])

    const handleSignup = async () => {
        setErrors({})
        try {
            const userSchema = z.object({
                name: z.string().min(1, { message: "Enter Name" }),
                email: z.string()
                    .email({ message: "Invalid email address" }),
                password: z.string()
                    .min(6, { message: "Password length must be at least 6 characters" }),
                profile_pic: z.instanceof(File, { message: "File is required" })
            })

            const obj = userSchema.safeParse(formData)
            if (obj.success) {
                await fnSignup(formData)
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
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>if you don't have an account</CardDescription>
                    {error && <Error message={error.message} />}
                </CardHeader>
                <CardContent className={'space-y-2 '}>
                    <div className='space-y-1'>
                        <Input name='name' type={'text'} placeholder="Enter Name" onChange={handleInputChange} />
                        {errors.name ? <Error message={errors.name} /> : null}
                    </div>
                    <div className='space-y-1'>
                        <Input name='email' type={'email'} placeholder="Enter Email" onChange={handleInputChange} />
                        {errors.email ? <Error message={errors.email} /> : null}
                    </div>
                    <div className='space-y-1'>
                        <Input name='password' type={'password'} placeholder="Enter Password" onChange={handleInputChange} />
                        {errors.password ? <Error message={errors.password} /> : null}
                    </div>
                    <div className='space-y-1'>
                        <Input name='profile_pic' type={'file'} onChange={handleInputChange}
                            accept="image/*"
                            required />
                        {errors.profile_pic ? <Error message={errors.profile_pic} /> : null}
                    </div>
                </CardContent>
                <CardFooter className={'flex justify-center'}>
                    <Button className="cursor-pointer" onClick={handleSignup}>{loading ? <BeatLoader size={10} color='#36d7b7' /> : "Signup"}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signup