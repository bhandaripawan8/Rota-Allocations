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

  const shiftPatterns = [
    { shift: "E", hours: 7.5, requiredShifts: 13 },
    { shift: "L", hours: 7.5, requiredShifts: 14 },
    { shift: "9-9", hours: 12, requiredShifts: 1 },
    { shift: "11-7", hours: 8, requiredShifts: 1 },
    { shift: "8-6", hours: 10, requiredShifts: 1 },
    { shift: "8-8", hours: 12, requiredShifts: 1 }
  ];

  // Function to allocate shifts
  const allocateShifts = (employees, shiftPatterns) => {
    const assignments = employees.map(employee => ({
      name: employee.name,
      remainingHours: employee.hours,
      assignedShifts: []
    }));

    shiftPatterns.forEach(pattern => {
      for (let i = 0; i < pattern.requiredShifts; i++) {
        const employee = assignments.find(emp => emp.remainingHours >= pattern.hours);
        
        if (employee) {
          employee.assignedShifts.push(pattern.shift);
          employee.remainingHours -= pattern.hours;
        } else {
          console.log("No available employee for", pattern.shift);
        }
      }
    });
    
    return assignments;
  };

  const finalAssignments = allocateShifts(employees, shiftPatterns);

  return (
    <div>
      <h2>Shift Assignments</h2>
      {finalAssignments.map(employee => (
        <div key={employee.name}>
          <strong>{employee.name}</strong>: Assigned Shifts: {employee.assignedShifts.join(", ")}, Remaining Hours: {employee.remainingHours}
        </div>
      ))}
    </div>
  );
};

export default Shifts;
