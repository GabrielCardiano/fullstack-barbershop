import { db } from "@/app/_lib/prisma";

import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";

import BarbershopNavigation from "@/app/(home)/barbershop/[id]/_components/barbershopNavigation";
import ServiceItem from "@/app/(home)/barbershop/[id]/_components/serviceItem";

interface BarbershopDetailsPageProps {
  params: {
    id?: string,
  },
}

const BarbershopDetailsPage: React.FC<BarbershopDetailsPageProps> = async ({ params }) => {
  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
    include: { services: true }
  });

  if (!barbershop) {
    // TODO: redirecionar para a HomePage.
    return null;
  }

  return (
    <div>
      <BarbershopNavigation barbershop={barbershop} />

      <div className="px-5 flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
          />
        ))}
      </div>

    </div>
  )
}

export default BarbershopDetailsPage;