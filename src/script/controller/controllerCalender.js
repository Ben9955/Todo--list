import ModelCalender from "../model/modelCalender";
import CalenderView from "../view/calenderView";

const controlRenderDate = function () {
  CalenderView.renderCurrentMonth(ModelCalender);
};

const controlBtnHeader = function (e) {
  e.target.id === "prev" && ModelCalender.currentMonth--;
  e.target.id === "next" && ModelCalender.currentMonth++;

  if (ModelCalender.currentMonth < 0 || ModelCalender.currentMonth > 11) {
    ModelCalender.date = new Date(
      ModelCalender.currentYear,
      ModelCalender.currentMonth
    );
    ModelCalender.currentYear = ModelCalender.date.getFullYear();
    ModelCalender.currentMonth = ModelCalender.date.getMonth();
  }
  CalenderView.renderCurrentMonth(ModelCalender);
  console.log(ModelCalender);
};

export default calederInit = function () {
  controlRenderDate();
  CalenderView._handelBtns(controlBtnHeader);
};
