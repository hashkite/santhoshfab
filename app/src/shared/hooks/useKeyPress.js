import { useEffect } from 'react'

export const useKeyPress = (targetKey, callback) => {
  const downHandler = ({ key }) => {
    if (key === targetKey && callback) callback()
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [downHandler])
}
