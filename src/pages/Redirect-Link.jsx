import Loader from '@/components/Loader'
import { storeClicks } from '@/db/apiClicks'
import { getLongUrl } from '@/db/apiUrls'
import useFetch from '@/hooks/useFetch'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const RedirectLink = () => {

    const { id } = useParams()
    const { data, loading, fn } = useFetch(getLongUrl)

    const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks)

    useEffect(() => {
        fn(id)
    }, [])

    useEffect(() => {
        if (!loading && data)
            fnStats({ id: data?.id, originalUrl: data?.original_url })
    }, [loading])

    if (loading || loadingStats) {
        return (
            <>
                <Loader />
                <br />
                Redirecting...
            </>
        )
    }


    return null
}

export default RedirectLink