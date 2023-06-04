// const { response } = require("express");

function getCurrentImageOfTheDay(){
    const API_Key = "aOgpBJOgtSzo8wajRuNcjkjWJe7wqL2keI8HXu9h" ;
    const currentDate = new Date().toISOString().split("T")[0]; 


    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${API_Key}`)
    .then(response => response.json())
    .then(data =>{
        const imgContainer = document.getElementById("img-container") ; 

        imgContainer.innerHTML = 
        `<h1> Picture on ${currentDate} </h1>
         <img src="${data.url}" alt ="${data.title}">
         <h3>${data.title}</h3>
         <p>${data.explanation}</p>` ;
    })
    .catch(error =>{
        console.log(error) ;
    }) ;
}

function getImageOfTheDay(date){
    const apiKey = "aOgpBJOgtSzo8wajRuNcjkjWJe7wqL2keI8HXu9h" ;

    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
           
            const imgContainer = document.getElementById("img-container");
            imgContainer.innerHTML = `
            <h1>NASA Picture of the Day</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>`;

            // Save the date 
            saveSearch(data);
            addSearchToHistory(date);
        })
        .catch(error => console.log(error));
}

function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
    const searchHistory = document.getElementById("search-history");
    const para = document.createElement("p");
    const link = document.createElement("a");
    link.href = "javascript:void(0)";
    link.textContent = date;
    link.addEventListener("click", function() {
        getImageOfTheDay(date);
    });
    para.appendChild(link);
    searchHistory.appendChild(para);
}


document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedDate = document.getElementById("date-input").value;
    getImageOfTheDay(selectedDate);
});


getCurrentImageOfTheDay();