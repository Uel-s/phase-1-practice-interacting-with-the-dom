const countDisplay = document.querySelector('#count');
const plusButton = document.querySelector('#plus');
const minusButton = document.querySelector('#minus');
const likeButton = document.querySelector('#like');
const pauseButton = document.querySelector('#pause');
const restartButton = document.querySelector('#restart');
const commentInput = document.querySelector('#comment-input');
const commentButton = document.querySelector('#comment-button');
const commentList = document.querySelector('#comment-list');

let count = 0;
let intervalId;
let isPaused = false;

// Function to start the counter
function startCounter() {
  intervalId = setInterval(() => {
    count++;
    countDisplay.textContent = count;
  }, 1000);
}

// Function to increment the count
function incrementCount() {
  count++;
  countDisplay.textContent = count;
}

// Function to decrement the count
function decrementCount() {
  count--;
  countDisplay.textContent = count;
}

// Function to like the current count
function likeCount() {
  const likeItem = document.createElement('li');
  likeItem.textContent = `Liked ${count} - ${getCurrentTime()}`;
  document.querySelector('#likes').appendChild(likeItem);
}

// Function to pause the counter
function pauseCounter() {
  if (isPaused) {
    clearInterval(intervalId);
    pauseButton.textContent = 'Pause';
    enableButtons();
  } else {
    clearInterval(intervalId);
    pauseButton.textContent = 'Resume';
    disableButtons();
  }
  isPaused = !isPaused;
}

// Function to restart the counter
function restartCounter() {
  clearInterval(intervalId);
  count = 0;
  countDisplay.textContent = count;
  enableButtons();
  isPaused = false;
  pauseButton.textContent = 'Pause';
}

// Function to handle comment submission
function submitComment(event) {
  event.preventDefault();
  const commentText = commentInput.value;
  if (commentText) {
    const commentItem = document.createElement('li');
    commentItem.textContent = commentText;
    commentList.appendChild(commentItem);
    commentInput.value = '';
  }
}

// Helper function to get current time in HH:MM:SS format
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Helper function to enable all buttons
function enableButtons() {
  plusButton.disabled = false;
  minusButton.disabled = false;
  likeButton.disabled = false;
  pauseButton.disabled = false;
  restartButton.disabled = false;
}

// Helper function to disable all buttons except pause button
function disableButtons() {
  plusButton.disabled = true;
  minusButton.disabled = true;
  likeButton.disabled = true;
  restartButton.disabled = true;
}

// Event listeners
plusButton.addEventListener('click', incrementCount);
minusButton.addEventListener('click', decrementCount);
likeButton.addEventListener('click', likeCount);
pauseButton.addEventListener('click', pauseCounter);
restartButton.addEventListener('click', restartCounter);
commentButton.addEventListener('click', submitComment);

// Start the counter on page load
startCounter();