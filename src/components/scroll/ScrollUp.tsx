import { useEffect } from 'react'
import { useLocation } from 'react-router'

const ScrollUp = (props: any) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  return <>{props.children}</>
}

export default ScrollUp
