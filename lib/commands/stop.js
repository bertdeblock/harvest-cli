import { format } from 'date-fns';
import { harvestFetch, log } from '../utils.js';

export default async function stop() {
  const { time_entries: timeEntries } = await harvestFetch('/time_entries?per_page=1');
  const lastTimeEntry = timeEntries[0];

  if (lastTimeEntry.is_running === false) {
    return log('❗ No running time entry to stop.');
  }

  await harvestFetch(`/time_entries/${lastTimeEntry.id}/stop`, { method: 'PATCH' });

  const { project, task } = lastTimeEntry;
  const end = new Date();

  log(`✅ Stopped working on "${project.name} (${task.name})" at "${format(end, 'HH:mm')}".`);
}
