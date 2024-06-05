import { setHours, setMinutes, format, addMinutes } from "date-fns";

// função que retorna lista de horários em intervalos de 45min, começão a partir de 8:00hs
export function generateTimeList(date: Date): string[] {
  const startTime = setMinutes(setHours(date, 9), 0); // set start time to 9:00hs
  const endTime = setMinutes(setHours(date, 21), 0); // set end time to 21:00hs
  const intervalTime = 45; // interval time in minutes
  const timeList: string[] = [];

  let currentTime = startTime;
  const hourNow = new Date();

  if (startTime <= hourNow) {
    currentTime = new Date();   
  }

  while (currentTime <= endTime) {
    timeList.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, intervalTime);
  }

  return timeList;
}