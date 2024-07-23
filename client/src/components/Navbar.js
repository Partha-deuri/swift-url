import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    
    return (
        <div className='flex justify-between bg-black py-3'>
            <Link href={'/'} className="cursor-pointer p-2 ml-2 font-bold text-white rounded-md hover:text-gray-400">
                Swift URL
            </Link>
            <div className="flex justify-around items-center gap-5 mr-5 text-white font-semibold">
                <Link href={'/'} className="cursor-pointer p-2 rounded-md hover:text-gray-400">
                    Home
                </Link>
                {/* <Link href={'/auth'} className="border border-white p-2 rounded-md cursor-pointer hover:bg-white hover:text-black">
                    Log in
                </Link> */}
            </div>
        </div>
    )
}

export default Navbar