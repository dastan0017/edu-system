import { useState, useEffect } from 'react'

export const usePromise = callback => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const makeReq = async () => {
      try {
        setLoading(true)
        const _data = await callback().then(response => response.data)
        setData(_data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    makeReq()
  }, [callback])

  return { loading, error, data }
}
