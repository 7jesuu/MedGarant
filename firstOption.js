/**
 * !input data
 */
const workingHours = {
  start: '09:00',
  stop: '21:00'
};

const busyIntervals = [
  {
    start: '10:30',
    stop: '10:50'
  },
  {
    start: '14:40',
    stop: '15:50'
  },
  {
    start: '16:40',
    stop: '17:20'
  },
  {
    start: '18:40',
    stop: '18:50'
  },
  {
    start: '20:05',
    stop: '20:20'
  }
];

/**
 * !function for converting time to minutes from the beginning of the day
 */
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * !function for converting minutes to time format
 */
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
  const mins = (minutes % 60).toString().padStart(2, '0');
  return `${hours}:${mins}`;
}

/**
 * !function to get available time slots
 */
function getFreeSlots(workingHours, busyIntervals, slotDuration) {
  const workStart = timeToMinutes(workingHours.start);
  const workStop = timeToMinutes(workingHours.stop);

  busyIntervals.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

  busyIntervals.unshift({ start: minutesToTime(workStart), stop: minutesToTime(workStart) });
  busyIntervals.push({ start: minutesToTime(workStop), stop: minutesToTime(workStop) });

  const freeSlots = [];

  for (let i = 0; i < busyIntervals.length - 1; i++) {
    const endCurrent = timeToMinutes(busyIntervals[i].stop);
    const startNext = timeToMinutes(busyIntervals[i + 1].start);

    if (startNext - endCurrent >= slotDuration) {
      freeSlots.push({ start: minutesToTime(endCurrent), stop: minutesToTime(endCurrent + slotDuration) });
    }
  }

  return freeSlots;
}

/**
 * !set the duration of the window to 30 minutes
 */
const slotDuration = 30;

/**
 * !obtain free time slots
 */
const freeSlots = getFreeSlots(workingHours, busyIntervals, slotDuration);

/**
 * !Outputting the result
 */
console.log('Свободные окна:', freeSlots);