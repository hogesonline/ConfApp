const main = document.querySelector('main');

window.addEventListener('load', async e => {
    buildSchedule();
    
    if('serviceWorker' in navigator){
        try {
          navigator.serviceWorker.register('sw.js');  
          console.log(`SW registered`);
        } catch (error) {
            console.log(`I have issues!`);
        }
    }
});

// deal with data and build the page
async function buildSchedule() {
    const res  = await fetch(`homeData.json`);
    const json = await res.json();



    main.innerHTML = json.homePage.speakers.map(createHome).join('\n');
}

function createHome(speaker){
    return `
    <div class="article">
        <div id="banner">
            <h3>${speaker.firstName} ${speaker.lastName}</h3>
        </div>    
        <div id= "avatar">
              <img src="${speaker.image}">
        </div>
        <div id="banner">
              <p style = 'margin-left: 70px;'>${speaker.bio50}</p>
        </div>
    </div>
    `;
}
//      Adding streams for day one pseudo
//      [Do you agree? How would you go about it?]
// - adjust the json file to have day 1 sessions and day 2 sessions
// - load day 1 sessions here
// - adjust the app.js file to accurately load day 2 sessions

