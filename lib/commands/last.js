import { harvestFetch, log } from '../utils.js';

export default async function last() {
  const { time_entries: timeEntries } = await harvestFetch('/time_entries?per_page=1');
  const lastTimeEntry = timeEntries[0];

  const { project, task } = lastTimeEntry;
  const emoji = lastTimeEntry.is_running ? '⏳' : '✅';

  log(`🔍 Last time entry is "${project.name} (${task.name})".`);
  log(`Status: ${emoji}`);
  log(`Started At: ${lastTimeEntry.started_time}`);
  log(`Ended At: ${lastTimeEntry.ended_time || '...'}`);
  log(`Notes: ${lastTimeEntry.notes}`);
}
