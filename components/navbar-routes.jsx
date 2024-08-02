'use client'

 import { useSession } from 'next-auth/react'
 import Image from 'next/image'
 import Link from 'next/link'


import { Button } from '@/components/ui/button'

export const NavbarRoutes = () => {
  const { data } = useSession();
  
  return (
    <>
    
     
        <div className=" hidden md:block">       
     {data?.user ? (
      <div className="ml-auto flex gap-x-2">
       
       <Link href="/">
            <Button size="sm" variant="ghost">  
             <Image src="/logo.svg" alt="logo" width={50} height={50} />
            </Button>
          </Link>
       

        <Link href="/">
            <Button size="sm" variant="ghost">  
            <h2 className="hover:scale-105 hover:text-primary text-lg">Home</h2>
            </Button>
          </Link>
       
          <Link href="/search/datascience">
            <Button size="sm" variant="ghost">
            <h2 className="hover:scale-105 hover:text-primary text-lg">Services</h2>

            </Button>
          </Link>
       
      </div>
     ) :
      <>
        <Link href="/">
            <Button size="sm" variant="ghost">  
             <Image src="/logo.svg" alt="logo" width={50} height={50} />
            </Button>
          </Link>
      </>
    }
     </div>

    </>
  )
}