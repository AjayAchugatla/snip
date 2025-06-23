import CreateLink from '@/components/CreateLink'
import Error from '@/components/Error'
import LinkCard from '@/components/LinkCard'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { urlState } from '@/context'
import { getAllClicks } from '@/db/apiClicks'
import { getUrls } from '@/db/apiUrls'
import useFetch from '@/hooks/useFetch'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'


const Dashboard = () => {

    const [search, setSearch] = useState("");
    const { user } = urlState()
    const { data: urls, loading, error, fn: fnUrls } = useFetch(getUrls)
    const { data: clicks, loading: loadingClicks, error: errorClicks, fn: fnClicks } = useFetch(getAllClicks)

    useEffect(() => {
        fnUrls(user.id)
    }, [])

    useEffect(() => {
        fnClicks(urls?.map(url => url.id))
    }, [urls?.length])

    const searchedUrls = urls?.filter((url) => url.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='flex flex-col gap-8'>
            {(loading || loadingClicks) && <Loader />}
            <div className='grid grid-cols-2 gap-4 mt-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Links Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{urls?.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{clicks?.length}</p>
                    </CardContent>
                </Card>
            </div>

            <div className='flex justify-between'>
                <h1 className='text-4xl font-bold'>My Links </h1>
                <CreateLink />
            </div>

            <div className='relative z-0'>
                <Input type="text" placeholder="Search Link..." value={search} onChange={(e) => setSearch(e.target.value)} className={''} />
                <Search className='absolute top-2 right-2 p-1' />
            </div>
            {error && <Error message={error.message} />}
            {(searchedUrls || []).map((url, i) => {
                return <LinkCard url={url} fetchUrls={fnUrls} key={i} />
            })}
        </div >
    )
}

export default Dashboard