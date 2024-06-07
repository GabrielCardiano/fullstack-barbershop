import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "@/app/_components/header";
import Search from "@/app/(home)/_components/search";
import BookingItem from "../_components/bookingItem";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershopItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershop, popularBarbershop, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({ orderBy: { name: 'asc' } }),

    session?.user ? await db.booking.findMany({
      where: {
        userId: (session?.user as any).id,
        date: { gte: new Date() },
      },
      include: {
        services: true,
        barbershop: true,
      },
    }) : Promise.resolve([])
  ]);

  return (
    <div>
      <Header />

      {/* -------- APRESENTAÇÃO ----------*/}
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold pb-1">
          Olá, {session?.user ? session.user.name?.split(' ')[0] : 'vamos agendar um corte?'}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM 'de' yyyy'.'", { locale: ptBR, })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      {/* -------- AGENDAMENTOS ----------*/}
      <div className="mt-6 pr-5">
        <h2 className="pl-5 text-xs font-semibold uppercase text-gray-400 mb-3 ">
          Agendamentos
        </h2>

        <div className="pl-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => <BookingItem key={booking.id} booking={booking} />)}
        </div>
      </div>

      {/* -------- RECOMENDADOS ----------*/}
      <div className="mt-6 px-5">
        <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map(barbershop => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      {/* -------- POPULARES ----------*/}
      <div className="mt-6 px-5 mb-[4.5rem]">
        <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershop.map(barbershop => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
