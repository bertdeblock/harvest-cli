import formatDuration from 'format-duration';
import { error, harvestFetch, log } from '../utils.js';

export default async function last({ amount }) {
  if (amount < 1) {
    return error('Amount must be 1 or higher.');
  }

  const { time_entries: timeEntries } = await harvestFetch(`/time_entries?per_page=${amount}`);

  if (amount === 1) {
    log(`🔍 Last time entry is:`);
  } else {
    log(`🔍 Last ${amount} time entries are:`);
  }

  timeEntries.reverse().forEach((timeEntry) => {
    const duration = hoursToMilliseconds(timeEntry.hours);

    log();
    log(`Client: ${timeEntry.client.name}`);
    log(`Project: ${timeEntry.project.name}`);
    log(`Project Code: ${timeEntry.project.code}`);
    log(`Task: ${timeEntry.task.name}`);
    log(`Status: ${timeEntry.is_running ? '⏳' : '✅'}`);
    log(`Date: ${timeEntry.spent_date}`);
    log(`Started At: ${timeEntry.started_time}`);
    log(`Ended At: ${timeEntry.ended_time || '...'}`);
    log(`Duration: ${formatDuration(duration, { leading: true })}`);
    log(`Notes: ${timeEntry.notes}`);
  });
}

function hoursToMilliseconds(hours) {
  return hours * 3_600_000;
}
