syncData();

// Update the locker header with the chosen location
function updateLockerHeader() {
  let pos = localStorage.getItem('lockerPosition');
  console.log(pos);
  if (pos !== null) {
    document.getElementById("locker-type").textContent = document.getElementById("locker-type").textContent + ' - ' + pos;
    localStorage.removeItem('lockerPosition');
  }
}

updateLockerHeader();

// ----------------------------
// --- Calendar starts here ---
// ----------------------------

const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
let selectedDates = [];

// Preset of occupied dates
let occupiedDates = {
  '2024-0': [1, 2, 3], // January 2024
  '2024-4': [4, 5, 6], // February 2024
  '2024-5': [7, 8, 9, 10], // December 2023
  // ... and so on for each month and year
};


function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  let currentMonthOccupiedDates = occupiedDates[`${year}-${month}`] || [];

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    if (currentMonthOccupiedDates.includes(i)) {
      className = ' class="red"';
    }
    if (selectedDates.includes(i)) {
      className = ' class="selected"';
    }
    datesHtml += `<li${className}>${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;

  const dateElements = dates.querySelectorAll("li:not(.inactive)");
  dateElements.forEach((el) => {
  el.addEventListener("click", (e) => {
    const day = parseInt(e.target.textContent);
    if (currentMonthOccupiedDates.includes(day)) {
      // If the date is in the occupiedDates array, prevent the selection
      return;
    }
    if (selectedDates.includes(day)) {
      selectedDates = selectedDates.filter(d => d !== day);
      e.target.classList.remove("selected");
    } else {
      selectedDates.push(day);
      e.target.classList.add("selected");
    }
    console.log(selectedDates); // This will log the selected dates to the console
  });
  });
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();
