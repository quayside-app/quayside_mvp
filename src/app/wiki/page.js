'use client'
import { useEffect } from 'react'

export default function redirectToWiki () {
  useEffect(() => {
    window.location.assign('https://quayside-app.github.io/Wiki/#/')
  })
  return (<></>)
}
