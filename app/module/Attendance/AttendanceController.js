'use strict';

var AttendanceController = {
  init: function() {
    return new Promise(function(resolve) {
      if (AttendanceModel.data !== null) {
        resolve();
      } else if (localStorage.getItem(AttendanceModel.localStorageData) === null) {
        AttendanceController.getJSON(resolve);
      } else {
        AttendanceController.getLocalStorage(resolve);
      }
    });
  },
  getData: function() {
    return AttendanceModel.data;
  },
  getJSON: function(resolve) {
    $.getJSON(AttendanceModel.jsonFile, function(json) {
        AttendanceModel.data = json;
        for (var i = 0; i < AttendanceModel.data.students.length; i++) {
          for (var j = 0; j < AttendanceModel.data.days; j++) {
            AttendanceModel.data.students[i].attendance.push(false);
          }
        }
        AttendanceController.saveDataToLocalStorage();
        resolve();
    });
  },
  getLocalStorage: function(resolve) {
    AttendanceModel.data = localStorage.getItem(AttendanceModel.localStorageData);
    AttendanceModel.data = JSON.parse(AttendanceModel.data);
    resolve();
  },
  saveDataToLocalStorage: function() {
    localStorage.setItem(AttendanceModel.localStorageData, JSON.stringify(AttendanceModel.data));
  },
  setAttendance: function(studentIndex, attendanceIndex) {
    AttendanceModel.data.students[studentIndex].attendance[attendanceIndex] = !AttendanceModel.data.students[studentIndex].attendance[attendanceIndex];
  },
  saveData: function() {
    AttendanceController.saveDataToLocalStorage();
  }
};
