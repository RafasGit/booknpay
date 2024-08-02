"use client";
import { signIn, useSession, signOut } from "next-auth/react";

import { Button } from "../../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu";
  import { Navbar } from "./navbar";
  
import { LogOut } from "lucide-react";
import  React, { useEffect } from 'react'
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    const { data } = useSession();

    useEffect(() => {
      console.log(data?.user);
    }, [data]);

  return (
    <div className="p-5 shadow-sm flex justify-between">
    <div className="flex gap-8 items-center">
      <div className="md:flex items-center gap-6">
       <Navbar />
      </div>
    </div>


    <div className="mr-0 pr-0 items-end relative  left-0 right-20" >

   
      {data?.user ? (
          <div className="absolute pt-2 flex gap-4 right-0">
          <Link href="/">
                    <Button size="sm" variant="ghost">
                      <LogOut className="mr-2 h-4 w-4" />
                      <h2 className="hover:scale-105 hover:text-primary text-lg">Exit</h2>
                    </Button>
                  </Link>
          
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={data?.user?.image}
              alt="profile"
              width={35}
              height={30}
              className="rounded-full "
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/mybookings/"}>My Bookings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      ) : (
        <>
           {/* <Link href="/">
                    <Button size="sm" variant="ghost">
                      <LogOut className="mr-2 h-4 w-4" />
                      <h2 className="hover:scale-105 hover:text-primary text-lg">Exit</h2>
                    </Button>
                  </Link> */}
                  <Button onClick={() => signIn("descope")}>Login / Sign Up </Button>
        </>
       
        
      )}
      </div>
    </div>
   
  )
}

export default Header;