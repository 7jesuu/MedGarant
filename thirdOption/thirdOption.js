const { format, addMinutes, differenceInMinutes } = require('date-fns');

function getFreeSlots(workingHours, busyIntervals, slotDuration) {
  const { start: workStart, stop: workStop } = workingHours;

  const workStartTime = new Date(`2000-01-01 ${workStart}`);
  const workStopTime = new Date(`2000-01-01 ${workStop}`);

  const freeSlots = [];

  for (let i = 0; i < busyIntervals.length - 1; i++) {
    const busyEnd = new Date(`2000-01-01 ${busyIntervals[i].stop}`);
    const nextBusyStart = new Date(`2000-01-01 ${busyIntervals[i + 1].start}`);

    const diffMinutes = differenceInMinutes(nextBusyStart, busyEnd);
    if (diffMinutes >= slotDuration) {
      const slotsCount = Math.floor(diffMinutes / slotDuration);
      for (let j = 0; j < slotsCount; j++) {
        const start = addMinutes(busyEnd, j * slotDuration);
        freeSlots.push({
          start: format(start, 'HH:mm'),
          stop: format(addMinutes(start, slotDuration), 'HH:mm')
        });
      }
    }
  }

  // Проверяем свободное время после последнего занятого интервала
  const lastBusyEnd = new Date(`2000-01-01 ${busyIntervals[busyIntervals.length - 1].stop}`);
  const diffMinutes = differenceInMinutes(workStopTime, lastBusyEnd);
  if (diffMinutes >= slotDuration) {
    const slotsCount = Math.floor(diffMinutes / slotDuration);
    for (let i = 0; i < slotsCount; i++) {
      const start = addMinutes(lastBusyEnd, i * slotDuration);
      if (start >= workStopTime) break;
      freeSlots.push({
        start: format(start, 'HH:mm'),
        stop: format(addMinutes(start, slotDuration), 'HH:mm')
      });
    }
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
