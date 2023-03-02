class CalenderView {
  _curentMonthHeader = document.querySelector(".calender__currentdate");
  _daysContainer = document.querySelector(".calender__days");
  _headerbtns = document.querySelectorAll(".calender__header i");
  _deadlineInput = document.querySelector(".todo-app__deadline__input");

  //

  constructor() {
    this._daysContainer.addEventListener(
      "click",
      this._handledaysClick.bind(this)
    );
  }

  //

  renderCurrentMonth(date) {
    this._curentMonthHeader.textContent = `${date.months[date.currentMonth]} ${
      date.currentYear
    }`;

    // render days

    this._daysContainer.innerHTML = this._daysMarkup(date);
  }

  _handledaysClick(e) {
    const day = e.target.closest(".calender__day");
    if (!day) return;
    // current

    this._deadlineInput.value = `${day.innerText} ${this._curentMonthHeader.textContent}`;

    document.querySelector(".calender").classList.remove("calender--active");
    setTimeout(
      () => (document.querySelector(".calender").style.display = "none"),
      500
    );
  }

  _daysMarkup(date) {
    let days = "";

    const lastDateofLastMonth = new Date(
      date.currentYear,
      date.currentMonth,
      0
    ).getDate();

    const firstDayMonth = new Date(
      date.currentYear,
      date.currentMonth,
      1
    ).getDay();

    const lastDateMonth = new Date(
      date.currentYear,
      date.currentMonth + 1,
      0
    ).getDate();

    const lastDayMonth = new Date(
      date.currentYear,
      date.currentMonth,
      lastDateMonth
    ).getDay();

    for (let i = firstDayMonth; i > 0; i--) {
      days += `<li class="calender__day__prev">${
        lastDateofLastMonth - i + 1
      }</li>`;
    }

    for (let i = 1; i <= lastDateMonth; i++) {
      days +=
        new Date().getDate() === i &&
        new Date().getMonth() === date.currentMonth &&
        new Date().getFullYear() === date.currentYear
          ? `<li class="calender__day calender__day--active">${i}</li>`
          : `<li class="calender__day">${i}</li>`;
    }

    for (let i = lastDayMonth; i < 6; i++) {
      days += `<li class="calender__day__next">${i - lastDayMonth + 1}</li>`;
    }

    return days;
  }

  _handelBtns(handler) {
    this._headerbtns.forEach((btn) => btn.addEventListener("click", handler));
  }
}

export default new CalenderView();
