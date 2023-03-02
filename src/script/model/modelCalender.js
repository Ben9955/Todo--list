// const date = new Date();

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
  "Dicember",
];

class ModelCalender {
  date = new Date();
  currentMonth = this.date.getMonth();
  currentYear = this.date.getFullYear();
  months = months;
  //   lastDateMonth = this._calcLastDateMonth();

  //   _calcLastDateMonth() {
  //     this.lastDateMonth = new Date(
  //       this.currentYear,
  //       this.currentMonth + 1,
  //       0
  //     ).getDate();
  //   }
}

export default new ModelCalender();
