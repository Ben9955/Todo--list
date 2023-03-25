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

}

export default new ModelCalender();
