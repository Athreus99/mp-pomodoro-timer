let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pomodoroButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const container = document.getElementById('container');
const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

function updateTimerDisplay() {
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        isRunning = false;
        alert('Tempo acabou!');
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }, 1000);
}

function setTimer(mins, modeClass) {
  clearInterval(timer);
  isRunning = false;
  minutes = mins;
  seconds = 0;
  updateTimerDisplay();

  // Remove todas as classes do body relacionadas ao modo
  document.body.classList.remove('pomodoro-mode', 'short-break-mode', 'long-break-mode');
  // Adiciona a classe do modo selecionado
  document.body.classList.add(modeClass);

  // Ajusta a cor do container
  container.className = `container ${modeClass}`;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);
    taskInput.value = "";
  }
}

pomodoroButton.addEventListener('click', () => setTimer(25, 'pomodoro-mode'));
shortBreakButton.addEventListener('click', () => setTimer(5, 'short-break-mode'));
longBreakButton.addEventListener('click', () => setTimer(15, 'long-break-mode'));
startButton.addEventListener('click', startTimer);
addTaskButton.addEventListener('click', addTask);

updateTimerDisplay();
