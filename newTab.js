document.addEventListener("DOMContentLoaded", () => {
  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "background-container";
  document.body.appendChild(backgroundContainer);

  const categoriesContainer = document.getElementById("categories-container");
  const tasksContainer = document.getElementById("tasks-container");
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
      "assets/A5.png"
    ],
    home: [
      "assets/B.png",
      "assets/B1.png",
      "assets/B2.png",
      "assets/B3.png",
      "assets/B4.png",
      "assets/B5.png"
    ],
    pet: [
      "assets/C.png",
      "assets/C1.png",
      "assets/C2.png",
      "assets/C3.png",
      "assets/C4.png",
      "assets/C5.png"
    ],
    friends: [
      "assets/D.png",
      "assets/D1.png",
      "assets/D2.png",
      "assets/D3.png",
      "assets/D4.png",
      "assets/D5.png"
    ],
    mind: [
      "assets/E.png",
      "assets/E1.png",
      "assets/E2.png",
      "assets/E3.png",
      "assets/E4.png",
      "assets/E5.png"
    ],
    others: [
      "assets/F.png",
      "assets/F1.png",
      "assets/F2.png",
      "assets/F3.png",
      "assets/F4.png",
      "assets/F5.png"
    ]
  };

  const deerAreas = [
    { id: "deer1", top: 530, left: 400, width: 150, height: 250, circleImage: "assets/circle_selfcare.png", category: "daily" },
    { id: "deer2", top: 570, left: 1510, width: 100, height: 200, circleImage: "assets/circle_lovedones.png", category: "friends" },
    { id: "deer3", top: 630, left: 1310, width: 100, height: 200, circleImage: "assets/circle_pets.png", category: "pet" },
    { id: "deer4", top: 540, left: 800, width: 120, height: 220, circleImage: "assets/circle_thehome.png", category: "home" },
    { id: "deer5", top: 600, left: 1150, width: 90, height: 160, circleImage: "assets/circle_themind.png", category: "mind" },
    { id: "deer6", top: 30, left: 1280, width: 150, height: 150, circleImage: "assets/circle_somethingelse.png", category: "others" }
  ];

  function removeAllListeners() {
    hoverListeners.forEach(fn => {
      document.removeEventListener("mousemove", fn);
      document.removeEventListener("click", fn);
    });
    hoverListeners = [];
  }

  deerAreas.forEach(area => {
    const circle = document.getElementById(`${area.id}-circle`);
    circle.style.backgroundImage = `url(${area.circleImage})`;
    const size = parseInt(getComputedStyle(circle).width) || 200;
    circle.style.left = `${area.left + area.width / 2 - size / 2}px`;
    circle.style.top = `${area.top + area.height / 2 - size / 2}px`;

    const onHover = e => {
      const x = e.pageX, y = e.pageY;
      if (x >= area.left && x <= area.left + area.width && y >= area.top && y <= area.top + area.height) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    };
    document.addEventListener("mousemove", onHover);
    hoverListeners.push(onHover);

    const onClick = e => {
      if (!circle.classList.contains("hidden")) {
        const x = e.pageX, y = e.pageY;
        if (x >= area.left && x <= area.left + area.width && y >= area.top && y <= area.top + area.height) {
          const btn = document.querySelector(`.category-button[data-category="${area.category}"]`);
          if (btn) {
            btn.click();
            removeAllListeners();
          }
        }
      }
    };
    document.addEventListener("click", onClick);
    hoverListeners.push(onClick);
  });

  function preloadImage(src) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => res(src);
      img.onerror = () => rej(src);
      img.src = src;
    });
  }

  async function changeBackgroundWithSlide(src) {
    await preloadImage(src).catch(() => {});
    return new Promise(res => {
      const oldBg = backgroundContainer.querySelector(".background-slide");
      const newBg = document.createElement("div");
      newBg.className = "background-slide";
      newBg.style.opacity = "0";
      newBg.style.backgroundImage = `url(${src})`;
      backgroundContainer.appendChild(newBg);
      newBg.offsetHeight;
      requestAnimationFrame(() => {
        newBg.style.opacity = "1";
        if (oldBg) {
          oldBg.style.opacity = "0";
          oldBg.addEventListener("transitionend", () => { oldBg.remove(); res(); }, { once: true });
        } else {
          res();
        }
      });
    });
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function hideHoverCircles() {
    document.querySelectorAll(".deer-circle").forEach(c => c.classList.add("hidden"));
  }
  function showHoverCircles() {
    document.querySelectorAll(".deer-circle").forEach(c => c.classList.remove("hidden"));
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
      "Take five minutes to shave"
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
      "Wipe your electronic surfaces clean"
    ],
    pet: [
      "Provide fresh water in bowl",
      "Clean feeding area",
      "Brush fur",
      "Have dedicated playtime together",
      "Give healthy treats as rewards",
      "Monitor food and water intake",
      "Give pets attention and affection",
      "Check skin/coat for any abnormalities"
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
      "Congratulate someone on a recent achievement"
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
      "Practice Duolingo for 10 minutes"
    ]
  };

  function getRandomTasks(cat) {
    return shuffle([...taskPool[cat]]).slice(0, 5);
  }

  const hardcodedTasks = {
    daily: getRandomTasks("daily"),
    home: getRandomTasks("home"),
    pet: getRandomTasks("pet"),
    friends: getRandomTasks("friends"),
    mind: getRandomTasks("mind")
  };

  let sortable;

  // weekly challenge data
  const weeklyChallenges = [
    "Drink 8 glasses of water each day",
    "Take a 10-minute walk daily",
    "Write down 3 things you're grateful for",
    "Spend 15 minutes reading a book",
    "Meditate for 5 minutes daily"
  ];

  function getCurrentWeek() {
    const first = new Date(new Date().getFullYear(), 0, 1);
    const now = new Date();
    const dayOfYear = Math.floor((now - first) / (1000 * 60 * 60 * 24));
    return Math.ceil((dayOfYear + 1) / 7);
  }

  function createWeeklyUI() {
    const container = document.createElement("div");
    container.id = "weekly-challenge-container";
    container.innerHTML = `
      <h2 class="weekly-challenge-title">Weekly Challenge</h2>
      <div id="weekly-challenge">
        <input type="checkbox" id="challenge-checkbox" />
        <label for="challenge-checkbox" id="challenge-text" class="task-subtitle"></label>
      </div>`;
    return container;
  }

  function loadWeekly(checkbox, label) {
    const idx = (getCurrentWeek() - 1) % weeklyChallenges.length;
    label.textContent = weeklyChallenges[idx];
    chrome.storage.local.get("weeklyChallengeCompleted", data => {
      checkbox.checked = data.weeklyChallengeCompleted || false;
    });
    checkbox.addEventListener("change", () => {
      chrome.storage.local.set({ weeklyChallengeCompleted: checkbox.checked });
    });
  }

  // encouraging messages
  const encouragementMessages = [
    "Great job!",
    "You're making progress!",
    "Keep going!",
    "Well done!",
    "You're amazing!",
    "Fantastic work!",
    "You're unstoppable!",
    "Keep up the great work!"
  ];

  // speech bubble
  function showSpeechBubble(msg) {
    const bubble = document.createElement("div");
    bubble.className = "speech-bubble";
    bubble.textContent = msg;
    let anchor = document.body;
    for (let i = 1; i <= 6; i++) {
      const el = document.getElementById(`deer${i}-circle`);
      if (el && !el.classList.contains("hidden")) {
        anchor = el;
        break;
      }
    }
    const rect = anchor.getBoundingClientRect();
    if (anchor === document.body) {
      bubble.style.top = "30%";
      bubble.style.left = "50%";
      bubble.style.transform = "translate(-50%, -50%)";
    } else {
      bubble.style.top = `${rect.top - 40 + window.scrollY}px`;
      bubble.style.left = `${rect.left + rect.width / 2 - 80 + window.scrollX}px`;
    }
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2200);
  }

  function sortByDone(tasks) {
    return [...tasks].sort((a, b) => a.completed === b.completed ? 0 : (a.completed ? -1 : 1));
  }

  function updateBackgroundState(tasks, cat) {
    const doneCount = tasks.filter(t => t.completed && t.text.trim()).length;
    const total = tasks.filter(t => t.text.trim()).length;
    const maxIdx = backgroundSets[cat].length - (cat === "others" ? 2 : 1);
    let idx = Math.min(doneCount, maxIdx);
    let finalImg = false;
    if (doneCount === total && total > 0) {
      idx = backgroundSets[cat].length - 1;
      finalImg = true;
    }
    return { backgroundIndex: idx, isFinalImage: finalImg };
  }

  function renderTasks(tasks, bgIndex, cat) {
    tasksContainer.innerHTML = "";
    const header = document.createElement("div");
    header.id = "tasks-header";

    addInspirationalQuoteBox();

    header.innerHTML = `
      <h1 class="task-title">today's list</h1>
      <p class="task-subtitle">some tasks to help you feel good</p>`;
    const weeklyUI = createWeeklyUI();
    header.appendChild(weeklyUI);
    tasksContainer.appendChild(header);

    const checkbox = weeklyUI.querySelector("#challenge-checkbox");
    const label = weeklyUI.querySelector("#challenge-text");
    loadWeekly(checkbox, label);

    const ul = document.createElement("ul");
    ul.id = "task-list";
    sortByDone(tasks).forEach(task => {
      const li = document.createElement("li");
      li.className = "draggable";
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <div class="task-text" contenteditable="true">${task.text}</div>
        ${task.text && !task.completed ? `<button class="delete-task"></button>` : ""}
        <div class="drag-handle">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>`;
      ul.appendChild(li);

      const cb = li.querySelector("input[type=checkbox]");
      cb.addEventListener("change", () => {
        const idx = tasks.indexOf(task);
        tasks[idx].completed = cb.checked;
        const { backgroundIndex: newBg, isFinalImage } = updateBackgroundState(tasks, cat);
        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: newBg,
            categoriesHidden: true,
            isFinalImage,
            selectedCategory: cat
          }
        });
        if (cb.checked) {
          const msg = encouragementMessages[
            Math.floor(Math.random() * encouragementMessages.length)
          ];
          showSpeechBubble(msg);
        }
        changeBackgroundWithSlide(
          backgroundSets[cat][isFinalImage ? backgroundSets[cat].length - 1 : newBg]
        );
      });

      const txt = li.querySelector(".task-text");
      txt.addEventListener("keydown", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          txt.blur();
        }
      });
      txt.addEventListener("input", () => {
        tasks[tasks.indexOf(task)].text = txt.textContent;
        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: bgIndex,
            categoriesHidden: true,
            isFinalImage: false,
            selectedCategory: cat
          }
        });
      });
    });
    tasksContainer.appendChild(ul);
    tasksContainer.classList.remove("hidden");

    if (sortable) sortable.destroy();
    sortable = new Sortable(ul, {
      animation: 600,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      onUpdate: evt => {
        const [m] = tasks.splice(evt.oldIndex, 1);
        tasks.splice(evt.newIndex, 0, m);
        const { backgroundIndex: nb, isFinalImage } = updateBackgroundState(tasks, cat);
        chrome.storage.local.set({
          state: {
            tasks,
            backgroundIndex: nb,
            categoriesHidden: true,
            isFinalImage,
            selectedCategory: cat
          }
        });
        changeBackgroundWithSlide(
          backgroundSets[cat][isFinalImage ? backgroundSets[cat].length - 1 : nb]
        );
      }
    });
  }

  function addInspirationalQuoteBox() {
    const quoteBox = document.createElement("div");
    quoteBox.className = "quote-overlay";
    const quotes = [
      "Believe in yourself and all that you are.",
      "Every day is a second chance.",
      "You are capable of amazing things.",
      "Stay positive, work hard, make it happen.",
      "Dream big and dare to fail."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteBox.textContent = randomQuote;
    tasksContainer.appendChild(quoteBox);
  }

  chrome.storage.local.get("state", data => {
    if (data.state) {
      const s = data.state;
      if (s.isFinalImage) {
        changeBackgroundWithSlide(backgroundSets[s.selectedCategory].slice(-1)[0]).then(() => {
          tasksContainer.classList.add("hidden");
          categoriesContainer.classList.add("hidden");
          hideHoverCircles();
          document.getElementById("welcome-message").classList.add("hidden");
          const thanks = document.createElement("div");
          thanks.className = "thank-you-message";
          thanks.textContent = "Thank you for taking good care of me";
          document.body.appendChild(thanks);
        });
      } else {
        renderTasks(s.tasks, s.backgroundIndex, s.selectedCategory);
        if (s.categoriesHidden) {
          categoriesContainer.classList.add("hidden");
          hideHoverCircles();
          document.getElementById("welcome-message").classList.add("hidden");
        }
        changeBackgroundWithSlide(backgroundSets[s.selectedCategory][s.backgroundIndex]);
      }
    } else {
      document.getElementById("welcome-message").classList.remove("hidden");
      showHoverCircles();
      changeBackgroundWithSlide(initialBackground);
    }
  });

  categoriesContainer.addEventListener("click", e => {
    if (!e.target.classList.contains("category-button")) return;
    const cat = e.target.dataset.category;
    hideHoverCircles();
    categoriesContainer.classList.add("hidden");
    document.getElementById("welcome-message").classList.add("hidden");
    let tasks = [];
    if (cat === "others") {
      tasks = Array(5).fill().map(() => ({ text: "", completed: false }));
    } else {
      tasks = hardcodedTasks[cat].map(t => ({ text: t, completed: false }));
    }
    chrome.storage.local.set({
      state: {
        tasks,
        backgroundIndex: 0,
        categoriesHidden: true,
        isFinalImage: false,
        selectedCategory: cat
      }
    });
    changeBackgroundWithSlide(backgroundSets[cat][0]).then(() => renderTasks(tasks, 0, cat));
  });

  resetButton.addEventListener("click", () => resetModal.classList.remove("hidden"));
  resetNoButton.addEventListener("click", () => resetModal.classList.add("hidden"));
  resetYesButton.addEventListener("click", () => {
    chrome.storage.local.set({ state: null }, () => {});
    tasksContainer.classList.add("hidden");
    document.getElementById("welcome-message").classList.remove("hidden");
    changeBackgroundWithSlide(initialBackground);
    const t = document.querySelector(".thank-you-message");
    if (t) t.remove();
    deerAreas.forEach(area => {
      const circle = document.getElementById(`${area.id}-circle`);
      circle.classList.remove("hidden");
    });
    resetModal.classList.add("hidden");
  });
});
