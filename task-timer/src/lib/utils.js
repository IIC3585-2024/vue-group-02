import {v4 as uuidv4} from 'uuid';

function zeroPadded(number) {
  return number >= 10 ? number.toString() : `0${number}`;
}

export function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const ss = zeroPadded(totalSeconds % 60);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const mm = zeroPadded(totalMinutes % 60);
  const hh = zeroPadded(Math.floor(totalMinutes / 60));
  return `${hh}:${mm}:${ss}`;
}

export async function importExampleTasks() {
  try {
    let projectsWithTasks = [];
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await usersResponse.json();
    
    const todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await todosResponse.json();

    const randomUser = users[Math.floor(Math.random() * users.length)];
    todos.filter(todo => todo.userId === randomUser.id)
      .forEach((todo) => {
        projectsWithTasks.push({
          id: uuidv4(),
          project: randomUser.company.name,
          name: todo.title,
          duration: Math.floor(Math.random() * 1000000) + 1000
        });
      });

    return projectsWithTasks;
  } catch (error) {
    console.error(error);
    return [];
  }
}