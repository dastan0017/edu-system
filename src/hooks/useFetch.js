import axios from 'axios'
import { useState, useEffect } from 'react'
import { apiV1 } from 'utils'

export const useFetch = (url, params) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setData(null)
    setError(null)
    const controller = new AbortController()

    apiV1
      .get(url, { params, signal: controller.signal })
      .then(res => {
        setLoading(false)
        res.data && setData(res.data)
      })
      .catch(err => {
        setLoading(false)
        setError('An error occurred. Awkward..')
      })
    return () => {
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error }
}
