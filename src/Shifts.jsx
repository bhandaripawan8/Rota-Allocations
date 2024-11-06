import React from 'react';

const Shifts = () => {
  const employees = [
    { name: "LEIA", hours: 37.5 }, { name: "TAMIKA", hours: 37.5 },
    { name: "FLORENTIA", hours: 37.5 }, { name: "KATHY", hours: 37.5 },
    { name: "ELEANOR", hours: 37.5 }, { name: "KINGSLEY", hours: 37.5 },
    { name: "JESS", hours: 37.5 }, { name: "PRECIOUS", hours: 37.5 },
    { name: "LEWA", hours: 37.5 }, { name: "CLAIRE", hours: 37.5 },
    { name: "MANASY", hours: 37.5 }, { name: "ADEOLA", hours: 37.5 },
    { name: "SEIJ", hours: 37.5 }, { name: "ANJALI", hours: 37.5 },
    { name: "JOAN", hours: 37.5 }, { name: "EMEDIONG", hours: 37.5 },
    { name: "BIBI", hours: 37.5 }, { name: "MALCOLM", hours: 37.5 },
    { name: "KAYLEIGH", hours: 37.5 }, { name: "BROOKE", hours: 37.5 },
    { name: "MEL", hours: 37.5 }, { name: "SACHIN", hours: 37.5 },
    { name: "ANNA", hours: 37.5 }, { name: "MICHAEL", hours: 37.5 },
    { name: "DAN", hours: 37.5 }, { name: "LORRAINE", hours: 37.5 },
    { name: "DOMINIQUE", hours: 37.5 }, { name: "HELENA", hours: 37.5 },
    { name: "AMEER", hours: 37.5 }, { name: "ONI", hours: 37.5 },
    { name: "PRANAV", hours: 37.5 }, { name: "ANGELA", hours: 37.5 },
    { name: "CAITLIN", hours: 37.5 }, { name: "MON", hours: 37.5 },
    { name: "GRACE", hours: 37.5 }, { name: "ABOSEDE", hours: 37.5 },
    { name: "GAD", hours: 37.5 }, { name: "REBECCA", hours: 37.5 },
    { name: "PHIL", hours: 48 }, { name: "TUES", hours: 48 },
    { name: "WEDS", hours: 48 }, { name: "NINA", hours: 48 },
    { name: "SITO", hours: 48 }, { name: "MARCUS", hours: 48 },
    { name: "OLUWASEUN", hours: 48 }, { name: "WED", hours: 48 },
    { name: "OLU", hours: 48 }, { name: "ANNIE", hours: 48 },
    { name: "ASWIN", hours: 48 }, { name: "ANANDU", hours: 48 },
    { name: "FRI", hours: 48 }, { name: "THURS", hours: 20 },
    { name: "NICKY", hours: 20 }, { name: "OLUWATOBI", hours: 20 },
    { name: "JACKY", hours: 20 }, { name: "SAT", hours: 20 },
    { name: "PAWAN", hours: 20 }, { name: "RESHAD", hours: 20 },
    { name: "SUN", hours: 20 }, { name: "SALIMA", hours: 20 }
  ];

  const serviceUsers = [
    { name: "KC", shifts: ["E", "E", "L", "L"] },
    { name: "OJ", shifts: ["E", "L"] },
    { name: "SB", shifts: ["E", "L"] },
    { name: "HM", shifts: ["E", "E", "L", "L"] },
    { name: "ST", shifts: ["9-9"] },
    { name: "CD", shifts: ["11-7"] },
    { name: "MJ", shifts: ["E", "L"] },
    { name: "MJ/SA", shifts: ["8-6"] },
    { name: "SA", shifts: ["E", "L"] },
    { name: "AB", shifts: ["E", "L"] },
    { name: "RT", shifts: ["E", "L", "L"] },
    { name: "SC", shifts: ["E", "E", "L", "L"] },
    { name: "MP", shifts: ["E", "L", "8-8"] }
  ];

  // Function to determine the shift pattern for each service user
  const getShiftPattern = (shifts) => {
    const earlyShiftCount = shifts.filter(shift => shift === "E").length;
    const lateShiftCount = shifts.filter(shift => shift === "L").length;
    
    if (earlyShiftCount > 0 && lateShiftCount > 0) {
      return "Early/Late";
    }
    if (earlyShiftCount > 0) {
      return "Early";
    }
    if (lateShiftCount > 0) {
      return "Late";
    }
    return "N/A";
  };

  // Function to assign shifts for the week (Monday to Sunday)
  const allocateShifts = (employees, serviceUsers) => {
    const assignments = employees.map(employee => ({
      name: employee.name,
      remainingHours: employee.hours,
      assignedShifts: {}
    }));

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    serviceUsers.forEach(serviceUser => {
      let dayIndex = 0; // Start with Monday

      serviceUser.shifts.forEach(shift => {
        let shiftDuration = 7.5;  // Default shift duration for "E" and "L"
        if (shift === "9-9") shiftDuration = 12;
        if (shift === "11-7") shiftDuration = 8;
        if (shift === "8-6" || shift === "8-8") shiftDuration = 12;

        // Assign employees based on shift type
        let remainingShifts = serviceUser.shifts.filter(s => s === shift).length;

        while (remainingShifts > 0) {
          const employee = assignments.find(emp => emp.remainingHours >= shiftDuration);

          if (employee) {
            // Assign the employee's name to the corresponding service user and shift day
            const day = daysOfWeek[dayIndex];
            if (!employee.assignedShifts[day]) {
              employee.assignedShifts[day] = [];
            }

            employee.assignedShifts[day].push({
              shift: shift,
              serviceUser: serviceUser.name,
              employeeName: employee.name
            });

            employee.remainingHours -= shiftDuration; // Subtract hours for the shift
            remainingShifts--; // Decrease remaining shifts to be assigned

            // Move to the next day (circular through the week)
            dayIndex = (dayIndex + 1) % 7;
          } else {
            console.log("No available employee for shift:", shift);
            break;
          }
        }
      });
    });

    return assignments;
  };

  const finalAssignments = allocateShifts(employees, serviceUsers);

  return (
    <div>
      <h2>Shift Assignments for the Week</h2>
      <table border="1" cellPadding="5" style={{ width: '100%', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th>Service User</th>
            <th>Shift Pattern</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {serviceUsers.map(serviceUser => (
            serviceUser.shifts.map((shift, index) => (
              <tr key={`${serviceUser.name}-${index}`}>
                <td>{serviceUser.name}</td>
                <td>{getShiftPattern(serviceUser.shifts)}</td>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
                  const shiftForDay = finalAssignments
                    .filter(emp => emp.assignedShifts[day]?.some(shift => shift.serviceUser === serviceUser.name))
                    .map(emp => emp.assignedShifts[day]?.find(shift => shift.serviceUser === serviceUser.name)?.employeeName);
                  return (
                    <td key={day}>
                      {shiftForDay ? shiftForDay.join(", ") : "No Assignment"}
                    </td>
                  );
                })}
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Shifts;
