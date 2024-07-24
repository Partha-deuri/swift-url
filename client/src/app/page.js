'use client'

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [result, setResult] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState(null);
  const inpRef = useRef();
  const outputRef = useRef();

  const handlePaste = () => {
    setResult(false)
    navigator.clipboard.readText().then((res) => {
      inpRef.current.value = res;
    })
  }
  const handleCopy = async () => {
    navigator.clipboard.writeText(outputRef.current.innerText);
  }
  const fetchData = async (url) => {
    setResult(false)
    const res = await fetch('https://swift-url-api.onrender.com/api/shorturl', {
      method: "POST",
      body: JSON.stringify({ longUrl: url }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res;
  }
  const validateUrl = (url) => {
    console.log(url);
    if (url.length < 5) {
      return false;
    }
    const re = /^https?:\/\/.+\..+/g;
    return re.test(url)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = inpRef.current.value
    if (validateUrl(url)) {
      const res = fetchData(url);
      // console.log(res);
      res
        .then((response) => response.json())
        .then(json => {
          setShortUrl('https://swift-url.onrender.com/' + json.shortUrl);
          setResult(true);
          // console.log(json);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  return (
    <main >
      <div className="pt-2 ">
        <div className="p-2">
          <div className="">
            {/* <div className="flex  justify-center my-2 p-2 bg-black text-white font-bold text-2xl">
              Swift URL
            </div> */}
            <div className="mb-4 p-2 bg-slate-200">
              <span>
                Tired of long and complex links?
              </span>
              <br />
              <span className="text-sm">
                Try out swift URL which shorthens your urls and make them easy to remember and use.
              </span>
            </div>
          </div>
          <div className="p-6  flex gap-4 items-center flex-col border-2 rounded shadow-lg ">
            <div className="flex justify-center items-center gap-2 w-[80%]">
              <input onChange={() => setResult(false)} ref={inpRef} placeholder="Paste your long link here..." type="text" className="border-2 active:border h-full rounded w-11/12 p-2" />
              <button className="bg-orange-200 p-2 rounded w-fit font-bold" onClick={handlePaste}>Paste</button>
            </div>
            <div className="">
              <div className="">
                <button onClick={handleSubmit} className="bg-lime-500 p-2 rounded-lg text-white font-semibold">Let's Go!</button>
              </div>
            </div>
            <div className={result ? '' : 'hidden'}>
              <div className=" text-center">Here is your short url. </div>
              <div className="my-4 flex flex-col items-center gap-1 sm:flex-row">
                <div className="border p-2 rounded" ref={outputRef}>{shortUrl}</div>
                <div onClick={handleCopy} className="bg-blue-600 p-2 font-bold text-white rounded-md w-fit cursor-pointer">Copy</div>
                <Link href={shortUrl} className="bg-green-600 p-2 font-bold text-white rounded-md w-fit cursor-pointer">Goto Link</Link>
              </div>
            </div>
          </div>
          <div className="border-2 rounded mt-4 p-2 shadow-lg ">
            <div className="flex gap-4 justify-around h-[140px] font-semibold mb-6 flex-wrap">
              <div className="bg-black text-white w-1/5 min-w-fit p-2 flex justify-center items-center rounded">
                {/* <img src="" alt="" /> */}
                <div className="">Easy and Fast</div>
              </div>
              <div className="border-2 border-black w-1/5 min-w-fit p-2 flex justify-center items-center rounded">

                <div className="">Clean and Simple</div>
              </div>
              <div className="bg-black text-white w-1/5 min-w-fit p-2 flex justify-center items-center rounded">

                <div className="">User Friendly</div>
              </div>
              <div className="border-2 border-black w-1/5 min-w-fit p-2 flex justify-center items-center rounded">
                <div className=''>
                  Check out the code at
                  <Link href='https://github.com/Partha-deuri/swift-url' className="">swift-url</Link>
                </div>
              </div>
            </div>
            <div className="">
              <div className="text-center font-semibold">Created by Partha</div>
              <div className="text-center text-sm font-semibold">Only for educational purpose.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
