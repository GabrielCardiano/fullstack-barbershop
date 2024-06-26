import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./sideMenu";
import Link from "next/link";

const Header = () => {

  return (
    <Card>
      <CardContent className="py-8 px-5 flex flex-row justify-between items-center">
        
        <Link href="/">
          <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={16} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header;