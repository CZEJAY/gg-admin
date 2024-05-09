
import React, { useEffect, useState } from 'react'

const useOrigin = () => {
    const [mounted, setIsMounted] = useState(false)
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    useEffect(() => {
        setIsMounted(true)
    })
    if(!mounted) return null

  return origin
}

export default useOrigin