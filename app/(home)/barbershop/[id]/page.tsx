import { db } from "@/app/_lib/prisma";

import Image from "next/image";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import BarbershopNavigation from "@/app/(home)/barbershop/[id]/_components/barbershopNavigation";

interface BarbershopDetailsPageProps {
  params: {
    id?: string,
  },
}

const BarbershopDetailsPage: React.FC<BarbershopDetailsPageProps> = async ({ params }) => {
  const barbershop = await db.barbershop.findUnique({ where: { id: params.id } });

  if (!barbershop) {
    // TODO: redirecionar para a HomePage.
    return null;
  }

  return (
    <div>

      {/* -------------- Image section --------------- */}
      <div className="relative w-full h-[250px]">
        <BarbershopNavigation barbershop={barbershop} />

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

    </div>
  )
}

export default BarbershopDetailsPage;