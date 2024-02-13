"use server";

import { db } from "@/app/_lib/prisma";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const SaveBooking = async ({ serviceId, barbershopId, userId, date }: SaveBookingParams) => {
  await db.booking.create({
    data: {
      serviceId: serviceId,
      barbershopId: barbershopId,
      userId: userId,
      date: new Date(date),
    }
  });
}