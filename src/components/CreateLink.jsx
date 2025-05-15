import { urlState } from '@/context'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { QRCode } from 'react-qrcode-logo'
import { Input } from './ui/input'
import Error from './Error'
import { Card } from './ui/card'
import { BeatLoader } from 'react-spinners'
import { z } from 'zod'
import useFetch from '@/hooks/useFetch'
import { createUrl } from '@/db/apiUrls'

const CreateLink = () => {

    const { user } = urlState()
    const { data, fn: fnUrl, error, loading } = useFetch(createUrl)
    const ref = useRef()
    let [searchParams, setSearchParams] = useSearchParams()
    const longLink = searchParams.get("createNew")
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        custom_url: "",
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { id, value } = e.target
        setFormValues((prev) => ({
            ...prev,
            [id]: value
        }))
    }

    const createNewLink = async () => {
        setErrors({})
        try {
            const linkSchema = z.object({
                title: z.string().min(1, { message: "Enter Title" }),
                longUrl: z.string().url({ message: "Enter a valid url " }),
                custom_url: z.string().optional(),
            })

            const obj = linkSchema.safeParse(formValues)
            if (obj.success) {
                const canvas = ref.current.canvasRef.current;
                const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
                await fnUrl({ ...formValues, user_id: user.id, qrcode: blob })
            }
            else {
                const newErrors = {}
                obj.error.errors.forEach((err) => {
                    newErrors[err.path[0]] = err.message
                })
                setErrors(newErrors)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`)
        }

    }, [error, data])


    return (
        <Dialog
            defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) setSearchParams({});
            }}
        >
            <DialogTrigger asChild>
                <Button variant="destructive">Create New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                </DialogHeader>
                {formValues?.longUrl && (
                    <QRCode ref={ref} size={250} value={formValues?.longUrl} />
                )}

                <Input
                    id="title"
                    placeholder="Short Link's Title"
                    value={formValues.title}
                    onChange={handleInputChange}
                />
                {errors.title && <Error message={errors.title} />}
                <Input
                    id="longUrl"
                    placeholder="Enter your Loooong URL"
                    value={formValues.longUrl}
                    onChange={handleInputChange}
                />
                {errors.longUrl && <Error message={errors.longUrl} />}
                <div className="flex items-center gap-2">
                    <Card className="p-2">snipapp.vercel.app</Card> /
                    <Input
                        id="custom_url"
                        placeholder="Custom Link (optional)"
                        value={formValues.custom_url}
                        onChange={handleInputChange}
                    />
                </div>
                {error && <Error message={errors.message} />}
                <DialogFooter className="sm:justify-start">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={createNewLink}
                        disabled={loading}
                    >
                        {loading ? <BeatLoader size={10} color="white" /> : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateLink