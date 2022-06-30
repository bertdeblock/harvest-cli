import { format } from 'date-fns';
import { error, harvestFetch, log } from '../utils.js';

export default async function resume() {
  const { time_entries: timeEntries } = await harvestFetch('/time_entries?per_page=1');
  const lastTimeEntry = timeEntries[0];

  if (lastTimeEntry.is_running) {
    return error('Cannot resume a time entry that is already running.');
  }

  const { project, task } = lastTimeEntry;
  const start = new Date();

  await harvestFetch('/time_entries', {
    body: {
      notes: lastTimeEntry.notes,
      project_id: project.id,
      spent_date: format(start, 'yyyy-MM-dd'),
      task_id: task.id,
    },
    method: 'POST',
  });

  log(`🚀 Resumed working on "${project.name} (${task.name})" at "${format(start, 'HH:mm')}".`);
}
