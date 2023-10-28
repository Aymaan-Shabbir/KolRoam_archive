Shery.imageEffect(".back", {
  style: 5,
  config: {
    a: { value: 2, range: [0, 30] },
    b: { value: 0.75, range: [-1, 1] },
    aspect: { value: 2.16284395530463 },
    gooey: { value: true },
    infiniteGooey: { value: true },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1.5, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: true },
    maskVal: { value: 1, range: [1, 5] },
    scrollType: { value: 0 },
    geoVertex: { range: [1, 64], value: 1 },
    noEffectGooey: { value: false },
    onMouse: { value: 1 },
    noise_speed: { value: 0.2, range: [0, 10] },
    metaball: { value: 0.2, range: [0, 2] },
    discard_threshold: { value: 0.5, range: [0, 1] },
    antialias_threshold: { value: 0, range: [0, 0.1] },
    noise_height: { value: 0.5, range: [0, 2] },
    noise_scale: { value: 10, range: [0, 100] },
  },
  gooey: true,
});

var elems = document.querySelectorAll(".elem");

elems.forEach(function (elem) {
  var h1s = elem.querySelectorAll("h1");
  var index = 0;
  var animating = false;
  document.querySelector(".main").addEventListener("click", function () {
    if (!animating) {
      animating = true;
      gsap.to(h1s[index], {
        top: "-=100%",
        ease: Expo.easeInOut,
        duration: 0.5,
        onComplete: function () {
          gsap.set(this._targets[0], { top: "100%" });
          // btn.style.pointerEvents = all;
          animating = false;
        },
      });
      index === h1s.length - 1 ? (index = 0) : index++;

      gsap.to(h1s[index], {
        top: "-=100%",
        ease: Expo.easeInOut,
        duration: 0.5,
      });
    }
  });
});

var menuToggle = document.getElementById("menu-toggle");
var nleft = document.getElementById("nleft");
var nright = document.getElementById("nright");
var nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {
  nleft.style.display =
    nleft.style.display === "none" || nleft.style.display === ""
      ? "flex"
      : "none";
  nright.style.display =
    nright.style.display === "none" || nright.style.display === ""
      ? "flex"
      : "none";

  // If the menu is open, set flex direction to column for nleft and nright
  if (nleft.style.display === "flex") {
    nleft.style.flexDirection = "column";
    nright.style.flexDirection = "column";
    nav.style.background = "#000000";
    menuToggle.style.marginRight = "1rem";
  } else {
    // If the menu is closed, reset flex direction to row for nleft and nright
    nleft.style.flexDirection = "row";
    nright.style.flexDirection = "row";
    nav.style.background = "#000000";
    menuToggle.style.marginRight = "0";
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    nleft.style.display = "flex";
    nright.style.display = "flex";
  } else {
    nleft.style.display = "none";
    nright.style.display = "none";
    menuToggle.style.marginRight = "0";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var exploreButton = document.querySelector(".btn");
  var chatbotContainer = document.getElementById("chatbot-container");
  var greetingMessage = document.getElementById("chat-greeting");
  var optionsContainer = document.getElementById("chat-options");
  var exitButton = document.getElementById("exit-btn");
  var userInput = document.getElementById("user-input");
  var sendButton = document.getElementById("send-btn");
  var chatMessages = document.getElementById("chat-messages");

  exploreButton.addEventListener("click", function () {
    chatbotContainer.style.display = "block";
    chatbotContainer.classList.add("open");
    greetingMessage.textContent =
      "Hi, I am Pattrick! My master has ordered me to serve you today. How can I assist you?";
    optionsContainer.style.display = "block";
  });

  exitButton.addEventListener("click", function () {
    greetingMessage.textContent = "My master greets you goodbye!";
    optionsContainer.style.display = "none";
    chatbotContainer.classList.remove("open");
    clearChatMessages();
    setTimeout(function () {
      chatbotContainer.style.display = "none";
    }, 2000);
  });

  function clearChatMessages() {
    chatMessages.innerHTML = "";
  }

  document.getElementById("explore-btn").addEventListener("click", function () {
    handleOptionClick("explore");
  });

  document.getElementById("gallery-btn").addEventListener("click", function () {
    handleOptionClick("gallery");
  });

  document
    .getElementById("about-dev-btn")
    .addEventListener("click", function () {
      handleOptionClick("about");
    });
  document.getElementById("post-btn").addEventListener("click", function () {
    handleOptionClick("post");
  });

  // Handle option buttons
  function handleOptionClick(option) {
    switch (option) {
      case "explore":
        window.location.href = "/places";
        break;
      case "gallery":
        window.location.href = "/gallery";
        break;

      case "post":
        window.location.href = "/login";
        break;
      case "about":
        window.location.href = "/about";
        break;

      case "exit":
        // Exit the chatbot
        greetingMessage.textContent = "My master greets you goodbye!";
        optionsContainer.style.display = "none";
        clearChatMessages();
        setTimeout(function () {
          chatbotContainer.style.display = "none";
        }, 2000);
        break;
    }
  }

  // Handle user input
  function handleUserInput() {
    var userMessage = userInput.value.trim();
    displayMessage(userMessage, true);
    handleUserQuery(userMessage.toLowerCase());
    userInput.value = "";
    chatbotContainer.scrollTop = chatbotContainer.scrollHeight;
  }

  // Display message in the chat
  function displayMessage(message, isUser) {
    var messageElement = document.createElement("p");
    messageElement.textContent = message;
    if (isUser) {
      messageElement.classList.add("user-message");
    } else {
      messageElement.classList.add("bot-message");
    }
    chatMessages.insertBefore(messageElement, chatMessages.firstChild);
    chatbotContainer.scrollTop = chatbotContainer.scrollHeight;
  }

  // Function to extract the name from the user's input
  function extractName(userQuery) {
    const regex = /my name is (.+)$/i;
    const match = userQuery.match(regex);

    return match ? match[1] : null;
  }

  // Handle different user queries
  function handleUserQuery(query) {
    switch (query) {
      case "":
        displayMessage("Please , add a message i wont ghost you !", false);
        break;
      case "hi":
        displayMessage("hello !", false);
        break;
      case "hii":
        displayMessage("hello !", false);
        break;
      case "hii":
        displayMessage("hello !", false);
        break;

      case "what is your name":
        displayMessage(
          "Greetings, My name is Pattrick, i am your KolRoam's chatbot messiah!",
          false
        );
        break;
      case "what is your name?":
        displayMessage(
          "Greetings, My name is Pattrick, i am your KolRoam's chatbot messiah!",
          false
        );
        break;
      case "who are you?":
        displayMessage(
          "Greetings, My name is Pattrick, i am your KolRoam's chatbot messiah!",
          false
        );
        break;
      case "who are you":
        displayMessage(
          "Greetings, My name is Pattrick, i am your KolRoam's chatbot messiah!",
          false
        );
        break;

      case "how are you?":
        displayMessage("I am doing well, what about you?", false);
        break;
      case "how are you":
        displayMessage("I am doing well, what about you?", false);
        break;

      case "what can you do?":
        displayMessage(
          "I am programmed to take you to places through Kolroam. I can show you places around kolkata, click ,Explore Kolkata for more.. Also i can tell you about my master and show you the KolRoam's gallery, everything is mentioned in the options menu above. I wish i could play Valorant :( like my master. ",
          false
        );
        break;

      case "what can you do":
        displayMessage(
          "I am programmed to take you to places through Kolroam. I can show you places around kolkata, click ,Explore Kolkata for more.. Also i can tell you about my master and show you the KolRoam's gallery, everything is mentioned in the options menu above. I wish i could play Valorant :( like my master .",
          false
        );
        break;

      case "who is your master":
        displayMessage(
          "Aymaan Shab... I can't take his entire name, he is the bat!",
          false
        );
        break;

      case "who is your master?":
        displayMessage(
          "Aymaan Shab... I can't take his entire name, he is the bat!",
          false
        );
        break;
      case "who is your developer?":
        displayMessage(
          "Aymaan Shab... I can't take his entire name, he is the bat!",
          false
        );
        break;
      case "who is your developer":
        displayMessage(
          "Aymaan Shab... I can't take his entire name, he is the bat!",
          false
        );
        break;

      case "who developed you":
        displayMessage(
          "Aymaan Shab... I can't take his entire name, he is the bat!",
          false
        );
        break;

      case "who developed you?":
        displayMessage(
          "Aymaan Shab... I can't take his entire name, he is the bat!",
          false
        );
        break;

      case "tell me something about kolkata":
        displayMessage(
          "Kolkata, the city of JOY!!! The 'City of Joy' earned its nickname because of its unfettered enthusiasm for its culture, traditions, literature, history, food, and more. Kolkata is the perfect amalgamation of old-world charm and modern India.",
          false
        );

        break;
      case "what is this website about":
        displayMessage(
          "KolRoam guides you to the breathtaking places in Kolkata.",
          false
        );
        break;
      case "what is this website about?":
        displayMessage(
          "KolRoam guides you to the breathtaking places in Kolkata.",
          false
        );
        break;
      case "what is kolroam?":
        displayMessage(
          "KolRoam guides you to the breathtaking places in Kolkata.",
          false
        );
        break;
      case "what is kolroam":
        displayMessage(
          "KolRoam guides you to the breathtaking places in Kolkata.",
          false
        );
        break;
      default:
        if (query.toLowerCase().includes("my name is")) {
          const userName = extractName(query);
          if (userName) {
            displayMessage(
              `Hi, ${userName}! How can I assist you today?`,
              false
            );
            return; // Don't proceed to the default message
          }
        }
        displayMessage(
          "I'm sorry, I couldn't answer that. Can you ask another question?",
          false
        );
    }
  }

  // Add event listener for send button click
  sendButton.addEventListener("click", handleUserInput);

  // Add event listener for user pressing Enter key
  userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleUserInput();
    }
  });
});
