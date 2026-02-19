document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("tasksContainer");
  const titleElement = document.getElementById("taskTitle");
  const timeElement = document.getElementById("taskTime");
  const playButton = document.querySelector(".fa-play");
  const pauseButton = document.querySelector(".bg-black");
  const resetButton = document.querySelector(".fa-rotate-left");    

  if (container) {
    const tasks = [
      { title: "Short Motivational", category: "Motivation", sessions: 1, time: 25 },
      { title: "Study JavaScript", category: "Study", sessions: 2, time: 25 },
      { title: "Workout", category: "Health", sessions: 1, time: 25 }
    ];

    container.innerHTML = "";

    tasks.forEach(task => {
      const div = document.createElement("div");
      div.className = "flex items-center justify-between bg-[#FBC3B1] p-4 rounded-2xl border border-orange-200 cursor-pointer";
      div.innerHTML = `
        <div class="flex items-center gap-6">
          <div class="bg-white p-3 rounded-2xl">
            <i class="fa-solid fa-spa text-orange-400 text-2xl"></i>
          </div>
          <div>
            <h4 class="font-bold text-sm">${task.title}</h4>
            <p class="text-xs text-gray-700">Category: ${task.category}</p>
          </div>
          <div class="text-center text-xs font-bold">
            <p>0/${task.sessions}</p>
            <p>${task.time} Mts</p>
          </div>
        </div>
      `;
      div.addEventListener("click", () => selectTask(task.time, task.title));
      container.appendChild(div);
    });
  }
  if (titleElement && timeElement) {
    let timerInterval = null;
    
    const savedTitle = localStorage.getItem("taskTitle") || "No Task Selected";
    const savedTimeMinutes = parseInt(localStorage.getItem("taskTime")) || 25;

    let minutes = savedTimeMinutes;
    let seconds = 0;

    titleElement.textContent = savedTitle;
    updateTimeDisplay();

    function updateTimeDisplay() {
      timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
      if (timerInterval) return;
      
      timerInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Succes !");
            return;
          }
          minutes--;
          seconds = 59;
        } else {
          seconds--;
        }
        updateTimeDisplay();
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    function resetTimer() {
      pauseTimer();
      minutes = savedTimeMinutes;
      seconds = 0;             
      updateTimeDisplay();
    }

    if (playButton) {
      playButton.closest('div, button').addEventListener("click", startTimer);
    }
    if (pauseButton) {
      pauseButton.closest('div, button').addEventListener("click", pauseTimer);
    }
    if (resetButton) {
      resetButton.addEventListener("click", resetTimer);
    }
  }
});

function selectTask(time, title) {
  localStorage.setItem("taskTime", time);
  localStorage.setItem("taskTitle", title);
  window.location.href = "index_1.html";
}

function goHome() {
  window.location.href = "index.html";
}