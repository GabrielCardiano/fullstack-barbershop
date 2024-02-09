import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "@/app/_components/header";
import Search from "@/app/(home)/_components/search";
import BookingItem from "../_components/bookingItem";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershopItem";

export default async function Home() {

  const barbershop = await db.barbershop.findMany();

  return (
    <div>
      <Header />

      {/* -------- APRESENTAÇÃO ----------*/}
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Gabriel !</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM 'de' yyyy'.'", { locale: ptBR, })}
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      {/* -------- AGENDAMENTOS ----------*/}
      <div className="px-5 mt-6">
        <h2 className="text-xs font-semibold uppercase text-gray-400 mb-3 ">
          Agendamentos
        </h2>
        <BookingItem />
      </div>

      {/* -------- RECOMENDADOS ----------*/}
      <div className="mt-6 px-5">
        <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map(barbershop => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>

      {/* -------- POPULARES ----------*/}
      <div className="mt-6 px-5 mb-[4.5rem]">
        <h2 className=" text-xs mb-3 uppercase text-gray-400 font-bold">
          Populares
        </h2>

        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map(barbershop => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
