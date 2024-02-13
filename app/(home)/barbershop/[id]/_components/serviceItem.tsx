"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateTimeList } from "../_helpers/hours";
import { format } from "date-fns/format";
import { formatPrice } from "../_helpers/formatPrice";
import { SaveBooking } from "../_actions/saveBooking";
import { setHours, setMinutes } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getAllDayBookings } from "../_actions/getAllDayBookings";
import { time } from "console";

interface ServiceItemProps {
  service: Service,
  barbershop: Barbershop,
  isAuthenticated?: boolean,
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, barbershop, isAuthenticated }) => {
  const router = useRouter();
  const { data } = useSession();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const [dayBookings, setDayBookins] = useState<Booking[]>([]);

  useEffect(() => {
    if (!date) return;

    const updateAvailableHours = async () => {
      const avaiableDayBookings = await getAllDayBookings(date);
      setDayBookins(avaiableDayBookings);
    };

    updateAvailableHours();
  }, [date]);


  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  }

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }

    // TODO: abrir modal de agendamento
  }

  const handleHourClick = (time: string) => {
    setHour(time);
  }

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);

    try {
      if (!date || !hour || !data?.user) return;

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await SaveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        userId: (data?.user as any).id,
        date: newDate,
      })

      toast("Reserva agendada!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", { locale: ptBR }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    }
    catch (error) {
      console.log(error);
    } finally {
      setSubmitIsLoading(false);
      setSideMenu(false);
      setDate(undefined)
      setHour(undefined);
    }
  }

  const timeList = useMemo(() => {
    if (!date) return [];

    return generateTimeList(date).filter(time => {
      // Formato time: "09:00"
      // se houver reser em "dayBookings" com hora e minuto igual à time, não incluir.
      const timeHour = Number(time.split(":")[0]);
      const timeMin = Number(time.split(":")[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMin = booking.date.getMinutes();

        //  Verifica se já tem algum booking com  mesma hora e minuto dos horários da lista generateTimeList;
        return bookingHour === timeHour && bookingMin === timeMin;
      });

      if (!booking) return true;

      return false
    })
  }, [date, dayBookings]);

  return (
    <Card>
      <CardContent className="p-3 w-full">

        <div className="flex items-center gap-4 w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </div>

          {/* Card de serviços */}
          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-primary font-bold">
                {formatPrice(service.price)}
              </p>

              <Sheet open={sideMenu} onOpenChange={setSideMenu}>
                <SheetTrigger asChild>
                  <Button onClick={handleBookingClick} variant="secondary">
                    Reservar
                  </Button>
                </SheetTrigger>

                {/* Menu lateral */}
                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-solid border-secondary border-b">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  {/* Calendários de agendamento */}
                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={new Date()}
                      styles={{
                        head_cell: { width: "100%", textTransform: "capitalize" },
                        cell: { width: "100%" },
                        button: { width: "100%" },
                        nav_button_previous: { width: "32px", height: "32px" },
                        nav_button_next: { width: "32px", height: "32px" },
                        caption: { textTransform: "capitalize" }
                      }}
                    />
                  </div>


                  {/* Horários disponíveis para agendamento */}
                  {date && (
                    <div className="
                      px-5 
                      py-6 
                      border-y
                      border-solid 
                      border-secondary
                      flex
                      gap-3
                      overflow-x-auto
                      [&::-webkit-scrollbar]:hidden
                      ">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Infos do agendamento */}
                  <div className="py-6 px-4 border-solid border-secondary">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">
                            {service.name}
                          </h2>
                          <h3 className="font-bold text-sm">
                            {formatPrice(service.price)}
                          </h3>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">
                              Data
                            </h3>
                            <h4 className="text-sm">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h4>
                          </div>
                        )}

                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-gray-400 text-sm">
                              Horário
                            </h3>
                            <h4 className="text-sm">
                              {hour}
                            </h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-gray-400 text-sm">
                            Barbearia
                          </h3>
                          <h4 className="text-sm">
                            {barbershop.name}
                          </h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Botão de confirmação de reserva */}
                  <SheetFooter className="px-5">
                    <Button
                      onClick={handleBookingSubmit}
                      disabled={!date || !hour || submitIsLoading}
                    >
                      {submitIsLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
                      Confirmar reserva
                    </Button>
                  </SheetFooter>

                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card >
  )
}

export default ServiceItem;