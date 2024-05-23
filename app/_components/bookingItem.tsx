import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Booking, Prisma } from "@prisma/client";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      services: true;
      barbershop: true;
    }
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingFinished = isPast(booking.date);

  return (
    <Card className="min-w-full">
      <CardContent className="px-0 py-0 flex">

        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
          <Badge
            className="w-fit"
            variant={ isBookingFinished ? "secondary" : "default" }>
            {isBookingFinished ? 'Finalizado' : 'Confirmado'}
          </Badge>
          <h2 className="font-bold">{booking.services.name}</h2>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-center border-l border-solid border-secondary">
          <p className="text-sm capitalize">{format(booking.date, 'MMMM', { locale: ptBR })}</p>
          <p className="text-2xl">{format(booking.date, 'dd')}</p>
          <p className="text-sm">{format(booking.date, 'hh:mm')}</p>
        </div>

      </CardContent>
    </Card>
  )
}

export default BookingItem;