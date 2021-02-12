import JSSoup from 'jssoup';
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const random = require("request");
const JSON = require("json");
const request = new XMLHttpRequest()

// nodejs
const JSSoup = require('jssoup').default;

// request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
// request.onload = function () {
//     // Begin accessing JSON data here
//     const data = JSON.parse(this.response)
//     console.log(data)
//     if (request.status >= 200 && request.status < 400) {
//     data.forEach((movie) => {
//         console.log(movie.title)
//     })
//     } else {
//     console.log('error')
//     }
// }

const Http = new XMLHttpRequest();
const url='https://api.gambitprofit.com/gambit-plays?_sort=PlayDate:DESC';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    const gambitGames = Http.responseText;
    // const jsonfile = JSON.parse(gambitGames);
    // console.log(gambitGames)
    // console.log(typeof jsonfile)
    console.log(typeof gambitGames);
    console.log(gambitGames.length)
    // for (const game in gambitGames){
    //     console.log(game)
    // }

}



