//declare all html element selector you'll need
const displayYear = document.querySelector("#displayYears");
const displayMonth = document.querySelector("#displayMonths");
const displayDay = document.querySelector("#displayDays");
const inputDay = document.querySelector("#inputDay");
const inputMonth = document.querySelector("#inputMonth");
const inputYear = document.querySelector("#inputYear");
const convertBtn = document.querySelector("#convertBtn");
const dayErrorDisplay = document.querySelector("#dayErrorDisplay");
const monthErrorDisplay = document.querySelector("#monthErrorDisplay");
const yearErrorDisplay = document.querySelector("#yearErrorDisplay");
const InputLabel1 = document.querySelector('label[for="inputDay"]');
const InputLabel2 = document.querySelector('label[for="inputMonth"]');
const InputLabel3 = document.querySelector('label[for="inputYear"]');
let theDate = new Date()
let currentYear = theDate.getFullYear();
let currentMonth = theDate.getMonth() + 1;
let currentDay = theDate.getDate();
let dayInterval, monthInterval, yearInterval;


//error message for day styling
inputDay.addEventListener("focus", () => {
    inputDay.classList.add("focused");
    clearResultDisplay();
})
inputDay.addEventListener("blur", () => {
    inputDay.classList.remove("focused");
    clearInterval(dayInterval)
})

inputDay.addEventListener("input", () => {
    checkInputDay();
    dayInterval = setInterval(checkInputDay, 100);
})

//error message for month styling
inputMonth.addEventListener("focus", () => {
    inputMonth.classList.add("focused");
    clearResultDisplay();
})

inputMonth.addEventListener("blur", () => {
    inputMonth.classList.remove("focused");
    clearInterval(monthInterval);
})

inputMonth.addEventListener("input", () => {
    monthInterval = setInterval(checkInputMonth, 100);
})

//error message for year styling
inputYear.addEventListener("focus", () => {
    inputYear.classList.add("focused");
    clearResultDisplay();
})

inputYear.addEventListener("blur", () => {
    inputYear.classList.remove("focused");
    clearInterval(yearInterval);
})

inputYear.addEventListener("input", () => {
    yearInterval = setInterval(checkInputYear, 100);
})

//performs the function when the button is clicked

//a click event listener that doesn't allow the converting to happen if any of all fields is/are empty;
convertBtn.addEventListener("click", ()=> {
    clearInterval(dayInterval);
    clearInterval(monthInterval);
    clearInterval(yearInterval);

    if(inputYear.value == "" && inputMonth.value == "" && inputDay.value == ""){
        isEmpty(inputDay, dayErrorDisplay, InputLabel1);
        isEmpty(inputMonth, monthErrorDisplay, InputLabel2);
        isEmpty(inputYear,yearErrorDisplay,InputLabel3);    
    }
    else if(inputYear.value == "" && inputMonth.value == ""){
        isEmpty(inputMonth, monthErrorDisplay, InputLabel2);
        isEmpty(inputYear,yearErrorDisplay,InputLabel3); 
    }
    else if(inputMonth.value == "" && inputDay.value == ""){
        isEmpty(inputDay, dayErrorDisplay, InputLabel1);
        isEmpty(inputMonth, monthErrorDisplay, InputLabel2);
    }
    else if(inputDay.value == "" && inputYear.value == ""){
        isEmpty(inputDay, dayErrorDisplay, InputLabel1);
        isEmpty(inputYear,yearErrorDisplay,InputLabel3);
    }
    else if(inputYear.value == ""){
        isEmpty(inputYear,yearErrorDisplay,InputLabel3);
    }
    else if(inputMonth.value == ""){
        isEmpty(inputMonth, monthErrorDisplay, InputLabel2);
    }
    else if(inputDay.value == ""){
        isEmpty(inputDay, dayErrorDisplay, InputLabel1);
    }
    else if((InputLabel1 || InputLabel2 || InputLabel3).style.color == "red"){
        
    }
    else{
        getAge();
    }
})


//function to determine valid date

//.value used to get the values from the input fields
//function to allocate the dates to each display output
function getAge(){ 
    let theInputDate = new Date(inputYear.value,inputMonth.value - 1,inputDay.value);
    let currentDate = new Date();
    
    // Calculate the age
    let ageInMilliseconds = currentDate - theInputDate;
    let ageInSeconds = ageInMilliseconds / 1000;
    let ageInMinutes = ageInSeconds / 60;
    let ageInHours = ageInMinutes / 60;
    let ageInDays = ageInHours / 24;
    let ageInMonths = ageInDays / 30.436875; // Average days in a month
    let ageInYears = ageInMonths / 12;

    // Extract whole years, months, and days
    var years = Math.floor(ageInYears);
    var months = Math.floor((ageInYears - years) * 12);
    var days = Math.floor(ageInDays - (years * 365) - (months * 30.436875));

    displayYear.innerHTML = years;
    displayDay.innerHTML = days;
    displayMonth.innerHTML = months;

}
function isEmpty(input , errorDisplay, label){
    if(input.value == ""){
        input.classList.add("error");
        errorDisplay.innerHTML = "This field is required";
        errorDisplay.style.visibility = "visible";
        label.style.color = "red";
    }
}
function removeErrorStyle(input, errorDisplay, label){
    input.classList.remove("error");
    errorDisplay.style.visibility = "hidden";
    label.style.color = "hsl(0, 1%, 44%)";//label for the year input field
}
function addErrorStyle(input,errorDisplay,label){
    input.classList.add("error");
    errorDisplay.style.visibility = "visible";
    label.style.color = "red";
}
function checkInputDay(){
    if((inputYear.value == currentYear && inputMonth.value == currentMonth && inputDay.value > currentDay) || (inputMonth.value == (1 || 3 || 5 || 7 || 8 || 10 || 12) && inputDay.value > 31) || (inputMonth.value == (4 || 6 || 9 || 11) && inputDay.value > 30) || ((inputYear.value)%4!=0 && inputMonth.value == 2 && inputDay.value > 28) || ((inputYear.value)%4==0 && inputMonth.value == 2 && inputDay.value > 29) || (inputDay.value > 31)){
        addErrorStyle(inputDay,dayErrorDisplay,InputLabel1);
        dayErrorDisplay.innerHTML = "Must be a valid day";
    }
    else if(inputDay.value == ""){
        isEmpty(inputDay, dayErrorDisplay, InputLabel1);
    }
    else{
        removeErrorStyle(inputDay,dayErrorDisplay,InputLabel1);
    }
}
function checkInputMonth(){
    if(inputYear.value == currentYear && inputMonth.value > currentMonth ||inputMonth.value > 12){
        addErrorStyle(inputMonth, monthErrorDisplay, InputLabel2);
        monthErrorDisplay.innerHTML = "Must be a valid month";
    }
    else if(inputMonth.value == ""){
        isEmpty(inputMonth, monthErrorDisplay, InputLabel2);
    }
    else{
        removeErrorStyle(inputMonth,monthErrorDisplay,InputLabel2);
    }
}
function checkInputYear(){
    if(inputYear.value > currentYear){
        addErrorStyle(inputYear,yearErrorDisplay,InputLabel3);
        yearErrorDisplay.innerHTML = "Must be in the past";
    }
    else if(inputYear.value == ""){
        isEmpty(inputYear,yearErrorDisplay,InputLabel3);
    }
    else{
        removeErrorStyle(inputYear,yearErrorDisplay,InputLabel3);
    }
}

function clearResultDisplay(){
    displayDay.innerHTML = "--";
    displayMonth.innerHTML = "--";
    displayYear.innerHTML = "--"
}