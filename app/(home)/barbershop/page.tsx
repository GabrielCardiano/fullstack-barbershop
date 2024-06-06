import Header from "@/app/_components/header";
import { db } from "@/app/_lib/prisma";
import BarbershopItem from "../_components/barbershopItem";
import { redirect } from "next/navigation";
import Search from "../_components/search";

interface BarberShopageProps {
  searchParams: {
    search?: string,
  }
}

async function BarberShopPage({ searchParams }: BarberShopageProps) {
  if (!searchParams.search) {
    redirect("/");
  };

  const barbershop = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  });

  return (
    <>
      <Header />


      <div className="px-5 py-6 flex flex-col gap-6">
        <Search />

        <h1 className="text-gray-400 font-bold text-xs uppercase">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershop.map(barbershop => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BarberShopPage;