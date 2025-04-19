document.addEventListener("DOMContentLoaded", () => {
  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "background-container";
  document.body.appendChild(backgroundContainer);

  const categoriesContainer = document.getElementById("categories-container");
  const tasksContainer = document.getElementById("tasks-container");
  const taskList = document.getElementById("task-list");
  const resetButton = document.getElementById("reset-button");
  const resetModal = document.getElementById("reset-modal");
  const resetYesButton = document.getElementById("reset-yes");
  const resetNoButton = document.getElementById("reset-no");

  let hoverListeners = [];

  const initialBackground = "assets/original.jpg";

  const backgroundSets = {
    daily: [
      "assets/A.png",
      "assets/A1.png",
      "assets/A2.png",
      "assets/A3.png",
      "assets/A4.png",
      "assets/A5.png", 
    ],
    home: [
      "assets/B.png",
      "assets/B1.png",
      "assets/B2.png",
      "assets/B3.png",
      "assets/B4.png",
      "assets/B5.png",
    ],
    pet: [
      "assets/C.png",
      "assets/C1.png",
      "assets/C2.png",
      "assets/C3.png",
      "assets/C4.png",
      "assets/C5.png",
    ],
    friends: [
      "assets/D.png",
      "assets/D1.png",
      "assets/D2.png",
      "assets/D3.png",
      "assets/D4.png",
      "assets/D5.png",
    ],
    mind: [
      "assets/E.png",
      "assets/E1.png",
      "assets/E2.png",
      "assets/E3.png",
      "assets/E4.png",
      "assets/E5.png",
    ],
    others: [
      "assets/F.png",
      "assets/F1.png",
      "assets/F2.png",
      "assets/F3.png",
      "assets/F4.png",
      "assets/F5.png",
    ],
  };

  const deerAreas = [
    {
      id: "deer1",
      top: 530,
      left: 400,
      width: 150,
      height: 250,
      circleImage: "assets/circle_selfcare.png",
      category: "daily",
    },
    {
      id: "deer2",
      top: 570,
      left: 1510,
      width: 100,
      height: 200,
      circleImage: "assets/circle_lovedones.png",
      category: "friends",
    },
    {
      id: "deer3",
      top: 630,
      left: 1310,
      width: 100,
      height: 200,
      circleImage: "assets/circle_pets.png",
      category: "pet",
    },
    {
      id: "deer4",
      top: 540,
      left: 800,
      width: 120,
      height: 220,
      circleImage: "assets/circle_thehome.png",
      category: "home",
    },
    {
      id: "deer5",
      top: 600,
      left: 1150,
      width: 90,
      height: 160,
      circleImage: "assets/circle_themind.png",
      category: "mind",
    },
    {
      id: "deer6",
      top: 30,
      left: 1280,
      width: 150,
      height: 150,
      circleImage: "assets/circle_somethingelse.png",
      category: "others",
    },
  ];

  function removeAllListeners() {
    hoverListeners.forEach((listener) => {
      document.removeEventListener("mousemove", listener);
      document.removeEventListener("click", listener);
    });
    hoverListeners = [];
  }

  deerAreas.forEach((area) => {
    const circle = document.getElementById(`${area.id}-circle`);
    circle.style.backgroundImage = `url(${area.circleImage})`;

    const circleWidth = getComputedStyle(circle).width || "200px";
    const size = parseInt(circleWidth);
    circle.style.left = `${area.left + area.width / 2 - size / 2}px`;
    circle.style.top = `${area.top + area.height / 2 - size / 2}px`;

    const checkHover = (e) => {
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      if (
        mouseX >= area.left &&
        mouseX <= area.left + area.width &&
        mouseY >= area.top &&
        mouseY <= area.top + area.height
      ) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    };

    hoverListeners.push(checkHover);
    document.addEventListener("mousemove", checkHover);

    const handleClick = (e) => {
      if (!circle.classList.contains("hidden")) {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        if (
          mouseX >= area.left &&
          mouseX <= area.left + area.width &&
          mouseY >= area.top &&
          mouseY <= area.top + area.height
        ) {
          const categoryButton = document.querySelector(`.category-button[data-category="${area.category}"]`);
          if (categoryButton) {
            categoryButton.click();
            removeAllListeners();
          }
        }
      }
    };

    document.addEventListener("click", handleClick);
    hoverListeners.push(handleClick);
  });

  function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = reject;
      img.src = url;
    });
  }

  async function changeBackgroundWithSlide(newImageUrl) {
    try {
      await preloadImage(newImageUrl);
      return new Promise((resolve) => {
        const currentBg = backgroundContainer.querySelector(".background-slide");
        const newBg = document.createElement("div");
        newBg.className = "background-slide";
        newBg.style.opacity = "0";
        newBg.style.backgroundImage = `url(${newImageUrl})`;
        backgroundContainer.appendChild(newBg);
        newBg.offsetHeight;
        requestAnimationFrame(() => {
          newBg.style.opacity = "1";
          if (currentBg) {
            currentBg.style.opacity = "0";
            currentBg.addEventListener("transitionend", () => {
              currentBg.remove();
              resolve();
            }, { once: true });
          } else {
            resolve();
          }
        });
      });
    } catch (error) {
      console.error("Error loading image:", error);
      return Promise.resolve();
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function hideHoverCircles() {
    const hoverCircles = document.querySelectorAll(".deer-circle");
    hoverCircles.forEach((circle) => {
      circle.classList.add("hidden");
    });
  }

  function showHoverCircles() {
    const hoverCircles = document.querySelectorAll(".deer-circle");
    hoverCircles.forEach((circle) => {
      circle.classList.remove("hidden");
    });
  }

  const taskPool = {
    daily: [
      "Brush teeth for two minutes",
      "Take a relaxing shower",
      "Eat a yummy breakfast",
      "Go for a refreshing 20 minute walk",
      "Change into your favorite outfit",
      "Brush your beautiful hair",
      "Floss between all your teeth",
      "Drink three full glasses of water",
      "Eat a serving of fruits or vegetables",
      "Tidy up your bed",
      "Trim your nails",
      "Moisturize your face and body",
      "Take your medications or vitamins",
      "Put on sunscreen",
      "Take five minutes to shave",
    ],
    home: [
      "Wipe down kitchen counters and stove",
      "Vacuum your space",
      "Empty trash bins and replace bags",
      "Load or unload the dishwasher",
      "Make your bed",
      "Clean your bathroom sink, mirror, and toilet",
      "Sweep or mop the floors",
      "Stow away your clutter",
      "Wipe dining table and chairs",
      "Clean the inside of the microwave",
      "Sort mail and papers",
      "Water your plants",
      "Do a quick dusting of surfaces",
      "Put all your stray clothes in the hamper",
      "Organize your desk",
      "Do a load of laundry",
      "Wipe your electronic surfaces clean",
    ],
    pet: [
      "Provide fresh water in bowl",
      "Clean feeding area",
      "Brush fur",
      "Have dedicated playtime together",
      "Give healthy treats as rewards",
      "Monitor food and water intake",
      "Give pets attention and affection",
      "Check skin/coat for any abnormalities",
    ],
    friends: [
      "Send a thoughtful text message to someone you love",
      "Schedule a catch-up call/coffee",
      "Tell someone a nice compliment",
      "Wish someone a happy birthday today",
      "Give a meaningful compliment",
      "Share a memory/photo with someone",
      "Write a handwritten note",
      "Plan a meetup with some friends",
      "Send a short text to a friend you have not heard from lately",
      "Congratulate someone on a recent achievement",
    ],
    mind: [
      "Take 5 minutes to practice mindful breathing",
      "Write 3 things you are grateful for",
      "Listen to calming music",
      "Practice a 5 minute meditation",
      "Journal your current feelings down for ten minutes",
      "Read a chapter of your new book",
      "Follow a 10 minute stretching Youtube video",
      "Write down a list of 3 affirmations for yourself",
      "Organize one small space in your home",
      "Go outside for at least 20 minutes of fresh air",
      "Do one creative activity",
      "Practice Duolingo for 10 minutes",
    ],
  };

  function getRandomTasks(category) {
    const tasks = taskPool[category];
    return shuffleArray([...tasks]).slice(0, 5);
  }

  const hardcodedTasks = {
    daily: getRandomTasks("daily"),
    home: getRandomTasks("home"),
    pet: getRandomTasks("pet"),
    friends: getRandomTasks("friends"),
    mind: getRandomTasks("mind"),
  };

  let sortableInstance = null;

  chrome.storage.local.get("state", (data) => {
    if (data.state) {
      const { tasks, backgroundIndex, categoriesHidden, isFinalImage, selectedCategory } = data.state;
      if (isFinalImage) {
        changeBackgroundWithSlide(backgroundSets[selectedCategory][backgroundSets[selectedCategory].length - 1]).then(() => {
          tasksContainer.classList.add("hidden");
          categoriesContainer.classList.add("hidden");
          hideHoverCircles();
          document.getElementById("welcome-message").classList.add("hidden");
          const thankYouMessage = document.createElement("div");
          thankYouMessage.className = "thank-you-message";
          thankYouMessage.textContent = "Thank you for taking good care of me";
          document.body.appendChild(thankYouMessage);
        });
      } else {
        renderTasks(tasks, backgroundIndex, selectedCategory);
        if (categoriesHidden) {
          categoriesContainer.classList.add("hidden");
          hideHoverCircles();
          document.getElementById("welcome-message").classList.add("hidden");
        }
        changeBackgroundWithSlide(backgroundSets[selectedCategory][backgroundIndex]);
      }
    } else {
      document.getElementById("welcome-message").classList.remove("hidden");
      showHoverCircles();
      changeBackgroundWithSlide(initialBackground);
    }
  });

  categoriesContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("category-button")) {
      const category = event.target.dataset.category;
      hideHoverCircles();
      if (category === "others") {
        const tasks = Array(5).fill().map(() => ({ text: "", completed: false }));
        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: 0,
            categoriesHidden: true,
            isFinalImage: false,
            selectedCategory: category,
          },
        });
        changeBackgroundWithSlide(backgroundSets[category][0]).then(() => {
          renderTasks(tasks, 0, category);
        });
      } else {
        const tasks = hardcodedTasks[category].map((task) => ({ text: task, completed: false }));
        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: 0,
            categoriesHidden: true,
            isFinalImage: false,
            selectedCategory: category,
          },
        });
        changeBackgroundWithSlide(backgroundSets[category][0]).then(() => {
          renderTasks(tasks, 0, category);
        });
      }
      categoriesContainer.classList.add("hidden");
      hideHoverCircles();
      document.getElementById("welcome-message").classList.add("hidden");
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "updateSubtasks") {
      const tasks = message.subtasks.map((task) => ({ text: task, completed: false }));
      chrome.storage.local.set({
        state: {
          tasks,
          backgroundIndex: 0,
          categoriesHidden: true,
          isFinalImage: false,
          selectedCategory: "others",
        },
      });
      renderTasks(tasks, 0, "self");
    }
  });

  resetButton.addEventListener("click", () => {
    resetModal.classList.remove("hidden");
  });

  resetNoButton.addEventListener("click", () => {
    resetModal.classList.add("hidden");
  });

  resetYesButton.addEventListener("click", () => {
    chrome.storage.local.set({ state: null }, () => {
      console.log("State reset to initial state.");
    });
    tasksContainer.classList.add("hidden");
    document.getElementById("welcome-message").classList.remove("hidden");
    changeBackgroundWithSlide(initialBackground);
    const thankYouMessage = document.querySelector(".thank-you-message");
    if (thankYouMessage) {
      thankYouMessage.remove();
    }
    deerAreas.forEach((area) => {
      const circle = document.getElementById(`${area.id}-circle`);
      const checkHover = (e) => {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        if (
          mouseX >= area.left &&
          mouseX <= area.left + area.width &&
          mouseY >= area.top &&
          mouseY <= area.top + area.height
        ) {
          circle.classList.add("active");
        } else {
          circle.classList.remove("active");
        }
      };
      const handleClick = (e) => {
        if (!circle.classList.contains("hidden")) {
          const mouseX = e.pageX;
          const mouseY = e.pageY;
          if (
            mouseX >= area.left &&
            mouseX <= area.left + area.width &&
            mouseY >= area.top &&
            mouseY <= area.top + area.height
          ) {
            const categoryButton = document.querySelector(`.category-button[data-category="${area.category}"]`);
            if (categoryButton) {
              categoryButton.click();
              removeAllListeners();
            }
          }
        }
      };
      document.addEventListener("mousemove", checkHover);
      document.addEventListener("click", handleClick);
      hoverListeners.push(checkHover, handleClick);
      circle.classList.remove("hidden");
    });
    resetModal.classList.add("hidden");
  });

  function updateBackgroundState(tasks, selectedCategory) {
    const tasksWithContent = tasks.filter((task) => task.text.trim() !== "");
    const completedTasks = tasks.filter((task) => task.completed && task.text.trim() !== "").length;
    const totalTasksWithContent = tasksWithContent.length;
    let backgroundIndex;
    let isFinalImage = false;
    if (selectedCategory === "others") {
      backgroundIndex = Math.min(completedTasks, backgroundSets[selectedCategory].length - 2);
      if (completedTasks === totalTasksWithContent && totalTasksWithContent > 0) {
        backgroundIndex = backgroundSets[selectedCategory].length - 1;
        isFinalImage = true;
      }
    } else {
      if (completedTasks === totalTasksWithContent && totalTasksWithContent > 0) {
        backgroundIndex = backgroundSets[selectedCategory].length - 1;
        isFinalImage = true;
      } else {
        backgroundIndex = Math.min(completedTasks, backgroundSets[selectedCategory].length - 1);
      }
    }
    return { backgroundIndex, isFinalImage };
  }

  function sortTasksByCompletion(tasks) {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? -1 : 1;
    });
  }

  // Encouraging messages
  const encouragementMessages = [
    "Great job!",
    "You're making progress!",
    "Keep going!",
    "Well done!",
    "You're amazing!",
    "Fantastic work!",
    "You're unstoppable!",
    "Keep up the great work!",
  ];

  // Function to show speech bubble
  function showSpeechBubble(message) {
    const speechBubble = document.createElement("div");
    speechBubble.className = "speech-bubble";
    speechBubble.textContent = message;

    // Try to position near the first visible deer circle, fallback to center
    let deerElement = null;
    for (let i = 1; i <= 6; i++) {
      const el = document.getElementById(`deer${i}-circle`);
      if (el && !el.classList.contains("hidden")) {
        deerElement = el;
        break;
      }
    }
    if (!deerElement) deerElement = document.body;

    const deerRect = deerElement.getBoundingClientRect();
    // If deerElement is body, center the bubble
    if (deerElement === document.body) {
      speechBubble.style.top = "30%";
      speechBubble.style.left = "50%";
      speechBubble.style.transform = "translate(-50%, -50%)";
    } else {
      speechBubble.style.top = `${deerRect.top - 40 + window.scrollY}px`;
      speechBubble.style.left = `${deerRect.left + deerRect.width / 2 - 80 + window.scrollX}px`;
    }

    document.body.appendChild(speechBubble);

    setTimeout(() => {
      speechBubble.remove();
    }, 2200);
  }

  function renderTasks(tasks, backgroundIndex, category) {
    const tasksHeader = document.getElementById("tasks-header") || document.createElement("div");
    tasksHeader.id = "tasks-header";
    const randomChallenge = weeklyChallenges[Math.floor(Math.random() * weeklyChallenges.length)];
    tasksHeader.innerHTML = `
      <h1 class="task-title">today's list</h1>
      <p class="task-subtitle">some tasks to help you feel good</p>
    `;
    const weeklyChallengeContainer = document.getElementById("weekly-challenge-container") || document.createElement("div");
    weeklyChallengeContainer.id = "weekly-challenge-container";
    weeklyChallengeContainer.innerHTML = `
      <h2 class="weekly-challenge-title">Weekly Challenge</h2>
      <div id="weekly-challenge">
        <input type="checkbox" id="challenge-checkbox" />
        <label for="challenge-checkbox" id="challenge-text" class="task-subtitle">${randomChallenge}</label>
      </div>
    `;
    tasksHeader.appendChild(weeklyChallengeContainer);
    if (!document.getElementById("tasks-header")) {
      tasksContainer.innerHTML = "";
      tasksContainer.appendChild(tasksHeader);
      const newTaskList = document.createElement("ul");
      newTaskList.id = "task-list";
      tasksContainer.appendChild(newTaskList);
    }
    const taskListElement = document.getElementById("task-list");
    taskListElement.innerHTML = "";
    const sortedTasks = sortTasksByCompletion(tasks);
    sortedTasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add("draggable");
      taskItem.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <div class="task-text" contenteditable="true" placeholder="New task">${task.text}</div>
        ${task.text && !task.completed ? `<button class="delete-task"></button>` : ""}
        <div class="drag-handle">
         <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
      `;
      taskItem.draggable = true;
      taskItem.dataset.index = tasks.indexOf(task);
      const checkbox = taskItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        const originalIndex = tasks.indexOf(task);
        tasks[originalIndex].completed = checkbox.checked;
        if (tasks[originalIndex].completed) {
          const deleteButton = checkbox.closest("li").querySelector(".delete-task");
          if (deleteButton) deleteButton.remove();
        }
        let newPosition = 0;
        if (checkbox.checked) {
          newPosition = tasks.filter((t, i) => t.completed && i < originalIndex).length;
        } else {
          newPosition = tasks.filter((t) => t.completed).length;
        }
        const [movedTask] = tasks.splice(originalIndex, 1);
        tasks.splice(newPosition, 0, movedTask);
        const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);
        if (isFinalImage) {
          changeBackgroundWithSlide(backgroundSets[category][backgroundSets[category].length - 1]).then(() => {
            tasksContainer.classList.add("hidden");
            categoriesContainer.classList.add("hidden");
            hideHoverCircles();
            document.getElementById("welcome-message").classList.add("hidden");
            const thankYouMessage = document.createElement("div");
            thankYouMessage.className = "thank-you-message";
            thankYouMessage.textContent = "Thank you for taking good care of me";
            document.body.appendChild(thankYouMessage);
          });
        } else {
          changeBackgroundWithSlide(backgroundSets[category][newBackgroundIndex]);
        }
        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: newBackgroundIndex,
            categoriesHidden: true,
            isFinalImage,
            selectedCategory: category,
          },
        });
      feature/mood-selection

        if (checkbox.checked) {
          const randomMessage =
            encouragementMessages[
              Math.floor(Math.random() * encouragementMessages.length)
            ];
          showSpeechBubble(randomMessage);
        }
       main
        if (sortableInstance) {
          const taskItems = Array.from(taskListElement.children);
          const oldItemEl = taskItems[originalIndex];
          taskListElement.removeChild(oldItemEl);
          taskListElement.insertBefore(oldItemEl, taskListElement.children[newPosition]);
          sortableInstance.option("animation", 600);
          sortableInstance.option("onEnd", null);
          const evt = new CustomEvent("sortable:start");
          taskListElement.dispatchEvent(evt);
          oldItemEl.style.transition = "all 600ms ease";
          oldItemEl.style.animation = "moveTask 600ms ease";
          setTimeout(() => {
            oldItemEl.style.transition = "";
            oldItemEl.style.animation = "";
          }, 600);
        }
      });
      const taskTextInput = taskItem.querySelector(".task-text");
      taskTextInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          taskTextInput.blur();
        }
      });
      taskTextInput.addEventListener("input", () => {
        const originalIndex = tasks.indexOf(task);
        tasks[originalIndex].text = taskTextInput.textContent;
        const existingDeleteButton = taskItem.querySelector(".delete-task");
        if (tasks[originalIndex].text.trim() !== "" && !tasks[originalIndex].completed && !existingDeleteButton) {
          const deleteButton = document.createElement("button");
          deleteButton.className = "delete-task";
          deleteButton.addEventListener("click", () => {
            tasks.splice(originalIndex, 1);
            if (tasks.length < 5) {
              tasks.push({ text: "", completed: false });
            }
            const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);
            if (isFinalImage) {
              changeBackgroundWithSlide(backgroundSets[category][backgroundSets[category].length - 1]).then(() => {
                tasksContainer.classList.add("hidden");
                categoriesContainer.classList.add("hidden");
                document.getElementById("welcome-message").classList.add("hidden");
                const thankYouMessage = document.createElement("div");
                thankYouMessage.className = "thank-you-message";
                thankYouMessage.textContent = "Thank you for taking good care of me";
                document.body.appendChild(thankYouMessage);
              });
            } else {
              changeBackgroundWithSlide(backgroundSets[category][newBackgroundIndex]);
            }
            chrome.storage.local.set({
              state: {
                tasks,
                backgroundIndex: newBackgroundIndex,
                categoriesHidden: true,
                isFinalImage,
                selectedCategory: category,
              },
            });
            renderTasks(tasks, backgroundIndex, category);
          });
          taskItem.appendChild(deleteButton);
        }
        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex,
            categoriesHidden: true,
            isFinalImage: false,
            selectedCategory: category,
          },
        });
      });
      const deleteButton = taskItem.querySelector(".delete-task");
      if (deleteButton) {
        deleteButton.addEventListener("click", () => {
          const originalIndex = tasks.indexOf(task);
          tasks.splice(originalIndex, 1);
          if (tasks.length < 5) {
            tasks.push({ text: "", completed: false });
          }
          const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);
          if (isFinalImage) {
            changeBackgroundWithSlide(backgroundSets[category][backgroundSets[category].length - 1]).then(() => {
              tasksContainer.classList.add("hidden");
              categoriesContainer.classList.add("hidden");
              document.getElementById("welcome-message").classList.add("hidden");
              const thankYouMessage = document.createElement("div");
              thankYouMessage.className = "thank-you-message";
              thankYouMessage.textContent = "Thank you for taking good care of me";
              document.body.appendChild(thankYouMessage);
            });
          } else {
            changeBackgroundWithSlide(backgroundSets[category][newBackgroundIndex]);
          }
          chrome.storage.local.set({
            state: {
              tasks,
              backgroundIndex: newBackgroundIndex,
              categoriesHidden: true,
              isFinalImage,
              selectedCategory: category,
            },
          });
          renderTasks(tasks, newBackgroundIndex, category);
        });
      }
      taskListElement.appendChild(taskItem);
      if (!document.querySelector("#task-animations")) {
        const style = document.createElement("style");
        style.id = "task-animations";
        style.textContent = `
          @keyframes moveTask {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `;
        document.head.appendChild(style);
      }
    });
    if (sortableInstance) {
      sortableInstance.destroy();
    }
    sortableInstance = new Sortable(taskListElement, {
      animation: 600,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      onUpdate: (evt) => {
        const [movedTask] = tasks.splice(evt.oldIndex, 1);
        tasks.splice(evt.newIndex, 0, movedTask);
        const { backgroundIndex: newBackgroundIndex, isFinalImage } = updateBackgroundState(tasks, category);
        if (isFinalImage) {
          changeBackgroundWithSlide(backgroundSets[category][backgroundSets[category].length - 1]).then(() => {
            tasksContainer.classList.add("hidden");
            categoriesContainer.classList.add("hidden");
            document.getElementById("welcome-message").classList.add("hidden");
            const thankYouMessage = document.createElement("div");
            thankYouMessage.className = "thank-you-message";
            thankYouMessage.textContent = "Thank you for taking good care of me";
            document.body.appendChild(thankYouMessage);
          });
        } else {
          changeBackgroundWithSlide(backgroundSets[category][newBackgroundIndex]);
        }
        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: newBackgroundIndex,
            categoriesHidden: true,
            isFinalImage,
            selectedCategory: category,
          },
        });
      },
    });
    tasksContainer.classList.remove("hidden");
  }

  const weeklyChallenges = [
    "Drink 8 glasses of water each day",
    "Take a 10-minute walk daily",
    "Write down 3 things you're grateful for",
    "Spend 15 minutes reading a book",
    "Meditate for 5 minutes daily",
  ];

  function getCurrentWeek() {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const today = new Date();
    const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
    return Math.ceil(dayOfYear / 7);
  }

  function createWeeklyChallengeUI() {
    const container = document.createElement("div");
    container.id = "weekly-challenge-container";
    const title = document.createElement("h2");
    title.textContent = "Weekly Challenge";
    container.appendChild(title);
    const challengeDiv = document.createElement("div");
    challengeDiv.id = "weekly-challenge";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "challenge-checkbox";
    const label = document.createElement("label");
    label.htmlFor = "challenge-checkbox";
    label.id = "challenge-text";
    label.className = "task-subtitle";
    challengeDiv.appendChild(checkbox);
    challengeDiv.appendChild(label);
    container.appendChild(challengeDiv);
    return { container, checkbox, label };
  }

  function loadWeeklyChallenge(checkbox, label) {
    const currentWeek = getCurrentWeek();
    const challengeIndex = (currentWeek - 1) % weeklyChallenges.length;
    const currentChallenge = weeklyChallenges[challengeIndex];
    chrome.storage.local.get(["weeklyChallengeCompleted"], (data) => {
      const isCompleted = data.weeklyChallengeCompleted || false;
      checkbox.checked = isCompleted;
      label.textContent = currentChallenge;
    });
  }

  const todaysTaskTab = document.getElementById("todays-task-tab");
  if (todaysTaskTab) {
    const { container, checkbox, label } = createWeeklyChallengeUI();
    todaysTaskTab.appendChild(container);
    checkbox.addEventListener("change", () => {
      const isCompleted = checkbox.checked;
      chrome.storage.local.set({ weeklyChallengeCompleted: isCompleted });
    });
    loadWeeklyChallenge(checkbox, label);
  }
});
