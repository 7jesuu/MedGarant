/**
 * !function for converting time to minutes from the start of the day
 */
function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
/**
 * 
 * !function for converting minutes from the start of the day to time format 
 */
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
  const mins = (minutes % 60).toString().padStart(2, '0');
  return `${hours}:${mins}`;
}
/**
 * 
 * !function for obtaining free time intervals
 */
function getFreeSlots(workingHours, busyIntervals, slotDuration) {
  const workStart = timeToMinutes(workingHours.start);
  const workStop = timeToMinutes(workingHours.stop);

  const freeSlots = [];

  let current = workStart;
  for (const interval of busyIntervals) {
    const start = timeToMinutes(interval.start);
    const stop = timeToMinutes(interval.stop);
    
    if (start - current >= slotDuration) {
      freeSlots.push({ start: minutesToTime(current), stop: minutesToTime(start) });
    }
    
    current = Math.max(current, stop);
  }
  
  if (workStop - current >= slotDuration) {
    freeSlots.push({ start: minutesToTime(current), stop: minutesToTime(workStop) });
  }

  return freeSlots;
}

const workingHours = {
  start: '09:00',
  stop: '21:00'
};

const busyIntervals = [
  { start: '10:30', stop: '10:50' },
  { start: '14:40', stop: '15:50' },
  { start: '16:40', stop: '17:20' },
  { start: '18:40', stop: '18:50' },
  { start: '20:05', stop: '20:20' }
];

const slotDuration = 30;

const freeSlots = getFreeSlots(workingHours, busyIntervals, slotDuration);

console.log('Свободные окна:', freeSlots);
