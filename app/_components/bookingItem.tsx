"use client";

import { Card, CardContent } from "@/app/_components/ui/card";
import { Badge } from "@/app/_components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar";
import { Booking, Prisma } from "@prisma/client";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { formatPrice } from "../(home)/barbershop/[id]/_helpers/formatPrice";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancelBooking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";


interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      services: true;
      barbershop: true;
    }
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const isBookingFinished = isPast(booking.date);

  const router = useRouter();

  const handleCancelClick = async () => {
    setIsDeletingLoading(true);
    try {
      await cancelBooking(booking.id);
      toast.success('Reserva cancelada com sucesso!')

    } catch (error) {
      console.error(error);
    } finally {
      setIsDeletingLoading(false);
      router.refresh();
    }
  }

  return (
    /* Lista de Agendamentos */
    <Sheet>
      {/* Trrigger side menu */}
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="px-0 py-0 flex">

            <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
              <Badge
                className="w-fit"
                variant={isBookingFinished ? "secondary" : "default"}>
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
      </SheetTrigger>

      {/* Side menu */}
      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">

          {/* Imagem */}
          <div className="relative h-[180px] w-full mt-6">
            <Image src="/barbershop-map.png"
              fill
              alt={booking.barbershop.name}
            />

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card className="mx-5">
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>

                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          <Badge
            className="w-fit mt-3 mb-6"
            variant={isBookingFinished ? "secondary" : "default"}>
            {isBookingFinished ? 'Finalizado' : 'Confirmado'}
          </Badge>

          {/* Infos do Agendamento */}
          <Card>
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex justify-between">
                <h2 className="font-bold">
                  {booking.services.name}
                </h2>
                <h3 className="font-bold text-sm">
                  {formatPrice(booking.services.price)}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">
                  Data
                </h3>
                <h4 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">
                  Horário
                </h3>
                <h4 className="text-sm">
                  {format(booking.date, 'hh:mm')}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-gray-400 text-sm">
                  Barbearia
                </h3>
                <h4 className="text-sm">
                  {booking.barbershop.name}
                </h4>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex-row gap-3 w-full mt-3">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full ">Voltar</Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={isBookingFinished || isDeletingLoading}
                  variant="destructive"
                  className="w-full"
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Deseja mesmo cancelar reserva?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className=" flex-row gap-3">
                  <AlertDialogCancel className="w-full mt-0">Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelClick} className="w-full">
                    {isDeletingLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem;