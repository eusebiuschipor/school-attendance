'use strict';

(function() {

  var AttendanceView = {
    init: function() {
      AttendanceView.render();
    },
    render: function() {
      AttendanceView.clearView();
      AttendanceView.addDayCols();
      AttendanceView.addStudents();
      AttendanceView.addEvents();
    },
    addDayCols: function() {
      $('table.attendance thead tr').append('<th class="name-col">Student Name</th>');

      for (var i = 0; i < parseInt(AttendanceController.getData().days); i++) {
        $('table.attendance thead tr').append('<th>' + i + '</th>');
      }

      $('table.attendance thead tr').append('<th class="missed-col">Days Missed-col</th>');
    },
    addStudents: function() {
      var students = AttendanceController.getData().students,
          studentsLength = students.length,
          data = AttendanceController.getData();

      for (var i = 0; i < studentsLength; i++) {
        var studentName = '',
            studentAttendance = '',
            attendanceLength = data.students[i].attendance.length,
            student = '',
            totalAttendances = '',
            attendances = data.students[i].attendance.length;

        student = '<tr class="student" id="' + i + '"><td class="name-col">' + data.students[i].name + '</td>';

        for (var j = 0; j < attendanceLength; j++) {
          var attendanceValue = data.students[i].attendance[j];

          if (attendanceValue === true) {
            attendances--;
          }

          studentAttendance += '<td class="attend-col"><input type="checkbox" ' + (attendanceValue === true ? 'checked' : '') + ' id="' + j + '"></td>';
        }

        totalAttendances = '<td class="missed-col">' + attendances +'</td></tr>';
        $('table.attendance tbody').append(student + studentAttendance + totalAttendances);
      }
    },
    addEvents: function() {
      $('.attend-col input').click(function() {
        var studentIndex = $(this).parent().parent().attr('id'),
            attendanceIndex = $(this).attr('id');

        AttendanceController.setAttendance(studentIndex, attendanceIndex);
        AttendanceController.saveData();
        AttendanceView.render();
      });
    },
    clearView: function() {
      $('table.attendance').html('<thead><tr></tr></thead><tbody></tbody>');
    }
  };

  AttendanceController.init()
                      .then(AttendanceView.init);

})();
