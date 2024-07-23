'use client'
import { redirect, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Redirect = () => {
  const [longUrl, setLongUrl] = useState(''); 
  const shortUrl = usePathname().slice(1);

  // console.log(shortUrl.slice(1))
  const fetchData = async () => {
    const res = await fetch('https://swift-url-api.onrender.com/api/longurl', {
      method: "POST",
      body: JSON.stringify({ shortUrl: shortUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res;
  }

  useEffect(() => {
    const res = fetchData();
    res
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.longUrl)
        setLongUrl(json.longUrl);
      });
  }, [])

  const validateUrl = (url) => {
    console.log(url);
    if (url.length < 5) {
      return false;
    }
    const re = /^https?:\/\/.+\..+/g;
    return re.test(url)
  }
  useEffect(() => {
    // console.log(longUrl)
    // console.log('jkdh ' + longUrl)
    if (longUrl?.length > 5) {
      if (validateUrl(longUrl))
        redirect(longUrl)
      else
        redirect('/error/error')
    }
    if (longUrl === undefined)
      redirect('/error/error')

  }, [longUrl])
  return (
    <div className='mt-2 p-6 h-[calc(100vh-80px)] flex items-center justify-center'>
      <div className=" font-bold">Redirecting...</div>
    </div>
  )
}

export default Redirect