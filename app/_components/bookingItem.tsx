import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";

const BookingItem = () => {
  return (
    <Card>
      <CardContent className="px-5 py-0 flex justify-between">
        
        <div className="flex flex-col gap-2 py-5">
          <Badge className="bg-[#221C3D] hover:bg-[#221C3D] text-primary w-fit">
            Confirmado 
          </Badge>
          <h2 className="font-bold">Corte de cabelo(nome)</h2>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png" alt=""/>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">Vintage barber</h3>
          </div>
        </div>

        <div className="px-3 flex flex-col items-center justify-center border-l border-solid border-secondary">
          <p>Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">10:30h</p>
        </div>

      </CardContent>
    </Card>
  )
}

export default BookingItem;