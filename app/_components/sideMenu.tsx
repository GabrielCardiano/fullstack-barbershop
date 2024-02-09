"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

const SideMenu = () => {
  const { data, status } = useSession();

  const handleLoginClick = () => signIn("google");

  const handleLogoutClick = () => signOut();

  return (
       <>
            <SheetHeader className="border-b border-solid border-secondary p-5">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
              <div className="flex justify-between px-5 py-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                  </Avatar>

                  <h2 className="font-bold">{data.user.name}</h2>
                </div>

                <Button
                  onClick={handleLogoutClick}
                  variant="secondary"
                  size="icon"
                >
                  <LogOutIcon />
                </Button>
              </div>


            ) : (
              <div className="px-5 py-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <UserIcon size={32} />
                  <h2 className="font-bold">
                    Olá, faça seu login!
                  </h2>
                </div>
                <Button
                  onClick={handleLoginClick}
                  variant="secondary"
                  className="w-full flex justify-start">
                  <LogInIcon size={18} className="mr-2" />
                  Fazer login
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-3 px-5">
              <Button variant="outline" className="justify-start" asChild>
                <Link href="/">
                  <HomeIcon size={18} className="mr-2" />
                  Início
                </Link>
              </Button>

              {data?.user && (
                <Button variant="outline" className="justify-start" asChild>
                  <Link href="/bookings">
                    <CalendarIcon size={18} className="mr-2" />
                    Início
                  </Link>
                </Button>
              )}

            </div>
          </>
  )
}

export default SideMenu;
