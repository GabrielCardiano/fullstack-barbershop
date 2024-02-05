"use client";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BarbershopNavigationProps {
  barbershop: Barbershop,
}

const BarbershopNavigation: React.FC<BarbershopNavigationProps> = ({barbershop}) => {
  const router = useRouter();

  const handleBackCLick = () => {
    router.back();
  }

  return (
    <>
      <Button 
      onClick={handleBackCLick}
        variant="outline" 
        size="icon"
         className="absolute z-50 top-2 left-2">
          <ChevronLeftIcon />
        </Button>

        <Button variant="outline" size="icon" className="absolute z-50 top-2 right-2">
          <MenuIcon />
        </Button>
    </>
  )
}

export default BarbershopNavigation;