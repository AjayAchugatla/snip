import Error from '@/components/Error'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { urlState } from '@/context'
import { getClicks } from '@/db/apiClicks'
import { getUrls } from '@/db/apiUrls'
import useFetch from '@/hooks/useFetch'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const Dashboard = () => {

    const [search, setSearch] = useState("");
    const { user } = urlState()
    const { data: urls, loading, error, fn: fnUrls } = useFetch(getUrls)
    const { data: clicks, loading: loadingClicks, error: errorClicks, fn: fnClicks } = useFetch(getClicks)

    useEffect(() => {
        fnUrls(user.id)
    }, [])

    useEffect(() => {
        fnClicks(urls?.map(url => url.id))
    }, [urls?.length])

    const searchedUrls = urls?.filter((url) => url.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='flex flex-col gap-8'>
            {(loading || loadingClicks) && <BarLoader width={"100%"} color="#36d7b7" />}
            <div className='grid grid-cols-2 gap-4 mt-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Links Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>0</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>0</p>
                    </CardContent>
                </Card>
            </div>

            <div className='flex justify-between'>
                <h1 className='text-4xl font-bold'>My Links </h1>
                <Button>Create Link</Button>
            </div>

            <div className='relative'>
                <Input type="text" placeholder="Search Link..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <Search className='absolute top-2 right-2 p-1' />
            </div>
            {error && <Error message={error.message} />}
        </div >
    )
}

export default Dashboard