/* Your Code Here */
const createEmployeeRecord = function(employeeArr){
    return {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = function(arrayOfEmployees){
    return arrayOfEmployees.map(employeeArr => createEmployeeRecord(employeeArr));
}

const createTimeInEvent = function(dateStamp){
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: +dateStamp.split(' ')[1],
        date: dateStamp.split(' ')[0]
    })
    return this;
}

const createTimeOutEvent = function(dateStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: +dateStamp.split(' ')[1],
        date: dateStamp.split(' ')[0]
    })
    return this;
};

const hoursWorkedOnDate = function(date){
    const timeIn = this.timeInEvents.find(e => e.date === date);
    const timeOut = this.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = function(date){
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
}

const allWagesFor = function() {
   return this.timeInEvents.reduce((acc, e) => {
        return acc += wagesEarnedOnDate.call(this, e.date)
    }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(employee => employee.firstName === firstName);
}

const calculatePayroll = function(employeeRecords){
    return employeeRecords.reduce((acc, employee) => {
        return acc += allWagesFor.call(employee);
    }, 0)
}