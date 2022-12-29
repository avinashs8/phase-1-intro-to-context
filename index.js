// Your code here
function createEmployeeRecord (array){
    let arryObj={}
    arryObj.firstName = array[0]
    arryObj.familyName = array[1]
    arryObj.title = array[2]
    arryObj.payPerHour = array[3]
    arryObj.timeInEvents = []
    arryObj.timeOutEvents = []
    return arryObj
}

function createEmployeeRecords (array){
    return array.map(function(arry){
        return createEmployeeRecord(arry)
    })
}

function createTimeInEvent(employee, dateStamp){
    let [date,hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour,10),
        date
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}
let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}
let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}