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
    log();
    log(`Project: ${timeEntry.project.name}`);
    log(`Task: ${timeEntry.task.name}`);
    log(`Status: ${timeEntry.is_running ? '⏳' : '✅'}`);
    log(`Started At: ${timeEntry.started_time}`);
    log(`Ended At: ${timeEntry.ended_time || '...'}`);
    log(`Notes: ${timeEntry.notes}`);
  });
}
