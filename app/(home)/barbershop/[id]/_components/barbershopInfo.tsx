"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/sideMenu";

interface BarbershopNavigationProps {
  barbershop: Barbershop,
}

const BarbershopNavigation: React.FC<BarbershopNavigationProps> = ({ barbershop }) => {
  const router = useRouter();

  const handleBackCLick = () => {
    router.back();
  }

  return (
    <>
      {/* -------------- Image section --------------- */}
      <Button
        onClick={handleBackCLick}
        variant="outline"
        size="icon"
        className="absolute z-50 top-2 left-2">
        <ChevronLeftIcon />
      </Button>



      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute z-50 top-2 right-2">
            <MenuIcon size={16}/>
          </Button>
        </SheetTrigger>

        <SheetContent className="p-0">
          <SideMenu />
        </SheetContent>
      </Sheet>


      <div className="relative w-full h-[250px]">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-85"
        />
      </div>

      {/* -------------- Barbershop infos ---------------  */}
      <div className="px-5 py-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">
          {barbershop.name}
        </h1>

        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon size={18} className="text-primary fill-secondary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <StarIcon size={18} className="text-primary" />
          <p className="text-sm">5.0 (699 avaliações)</p>
        </div>
      </div>
    </>
  )
}

export default BarbershopNavigation;