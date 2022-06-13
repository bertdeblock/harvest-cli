import { error, harvestFetch, log } from '../utils.js';

export default async function cancel() {
  const { time_entries: timeEntries } = await harvestFetch('/time_entries?per_page=1');
  const lastTimeEntry = timeEntries[0];

  if (lastTimeEntry.is_running === false) {
    return error('No running time entry to cancel.');
  }

  await harvestFetch(`/time_entries/${lastTimeEntry.id}`, { method: 'DELETE' });

  const { project, task } = lastTimeEntry;

  log(`❌ Time entry "${project.name} (${task.name})" was cancelled.`);
}
