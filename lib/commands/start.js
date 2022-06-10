import { format } from 'date-fns';
import inquirer from 'inquirer';
import { harvestFetch, log } from '../utils.js';

export default async function start() {
  const { project_assignments: projectAssignments } = await harvestFetch('/users/me/project_assignments');
  const { notes, projectAssignment, task } = await inquirer.prompt([
    {
      choices: projectAssignments
        .map((projectAssignment) => ({
          name: projectAssignment.project.name,
          value: projectAssignment,
        }))
        .sort(sortByName),
      message: 'Project',
      name: 'projectAssignment',
      type: 'list',
    },
    {
      choices: ({ projectAssignment }) =>
        projectAssignment.task_assignments
          .map((taskAssignment) => ({
            name: taskAssignment.task.name,
            value: taskAssignment.task,
          }))
          .sort(sortByName),
      message: 'Task',
      name: 'task',
      type: 'list',
    },
    {
      default: '/',
      message: 'Notes',
      name: 'notes',
      type: 'input',
    },
  ]);

  const { project } = projectAssignment;
  const start = new Date();

  await harvestFetch('/time_entries', {
    body: {
      notes,
      project_id: project.id,
      spent_date: format(start, 'yyyy-MM-dd'),
      task_id: task.id,
    },
    method: 'POST',
  });

  log(`🚀 Started working on "${project.name} (${task.name})" at "${format(start, 'HH:mm')}".`);
}

function sortByName(a, b) {
  if (a.name > b.name) {
    return 1;
  }

  if (a.name < b.name) {
    return -1;
  }

  return 0;
}
