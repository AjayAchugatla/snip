import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {
    const [longUrl, setLongUrl] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (longUrl)
            navigate(`/auth?createNew=$ {longUrl}`)
    }
    return (
        <div className='flex flex-col items-center'>
            <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center
            font-extrabold leading-24'>
                The only URL Shortener <br /> you'll ever need!
            </h2>

            <form className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/3 gap-2' onSubmit={handleSubmit}>
                <Input type='url'
                    className={'border-white px-4 h-full'} autoFocus
                    placeholder='Enter your long url'
                    onChange={(e) => setLongUrl(e.target.value)}
                    value={longUrl}
                />
                <Button
                    className={'h-full cursor-pointer'} type='submit' variant={'destructive'}>
                    Shorten!
                </Button>
            </form>

            <Accordion type="multiple" collapsible className="w-full md:px-11 my-20">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        How does the URL shortener works?
                    </AccordionTrigger>
                    <AccordionContent>
                        When you enter a long URL, our system generates a shorter version of
                        that URL. This shortened URL redirects to the original long URL when
                        accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Do I need an account to use the app?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. Creating an account allows you to manage your URLs, view
                        analytics, and customize your short URLs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        What analytics are available for my shortened URLs?
                    </AccordionTrigger>
                    <AccordionContent>
                        You can view the number of clicks, geolocation data of the clicks
                        and device types (mobile/desktop) for each of your shortened URLs.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
