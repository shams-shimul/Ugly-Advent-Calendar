const calendarContainer = document.getElementById('calendar');
const todayDate = new Date().getDate()
const gifts = ['🍫', '🍪', '🎄', '🦌', '🕯️', '🧸', '💰', '⌚', '⌨️', '🖱️']
// reading from localStorage if any gift has been opened out of any box
const openedGifts = JSON.parse(localStorage.getItem('ac_openedGifts')) ?? {}

for (let i = 1; i <= 25; i++) {
  // randomly picking a gift from the gifts array to assign to unopened boxes
  const randGift = gifts[Math.floor(Math.random() * 10)]

  let box = document.createElement('li');
  box.classList.add('calendar-box');
  let number = document.createElement('p');
  number.innerHTML = i;
  const icon = document.createElement('i');
  let description = document.createElement('p');

  // calendar box dates that are gone past will be allowed to open
  if (i <= todayDate && i < 25) {
    box.classList.add('passed')
    i == todayDate && box.classList.add('today')
    if (openedGifts[i]) { // if the box is already opened (saved in localStorage)
      box.classList.add('opened')
      icon.innerHTML = openedGifts[i]
      description.innerHTML = "You've got:"
    } else { // if the box is not opened yet, handle the click event accordingly
      icon.classList.add('fas', 'fa-gift');
      description.innerHTML = "Open me!";
      box.addEventListener('click', () => handleOpeningABox(box, i, icon, description, randGift), { once: true }) // the event listener needs to be invoked once only, hence auto-removed subsequently with {once: true}
    }
  } else { // future date box won't be allowed to open until the date is due
    description.innerHTML = "Yet to come..."
    icon.classList.add('fas', 'fa-gift');
  }

  if (i < 25) { // except the Christmas day
    box.appendChild(number);
    box.appendChild(icon);
    box.appendChild(description);
  } else { // the Christmas day
    box.classList.add('main-event')
    // box.classList.add('today') // turn on to see what happens to the 25th box on the day
    box.innerHTML = `<p>Merry Java-<wbr>Scriptmas!</p>`
  }
  calendarContainer.appendChild(box);
}

// click event handler for unopened boxes on the past dates
function handleOpeningABox(boxNode, boxNodeID, iconNode, textNode, giftItem) {
  console.log("🔥 EVENT LISTENER FIRED")
  if (!boxNode.classList.contains('opened')) {
    iconNode.classList.remove('fas', 'fa-gift')
    iconNode.innerHTML = giftItem // alloting a randomly picked gift item
    boxNode.classList.add('opened')
    textNode.innerHTML = "You've got:"
    openedGifts[boxNodeID] = giftItem // recording the opened gift item to the object to be saved in localStorage
    console.log(openedGifts)
    localStorage.setItem('ac_openedGifts', JSON.stringify(openedGifts))
  }
}