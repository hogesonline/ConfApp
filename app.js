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


//Manage the personal schedule
function starSelect() {
    var element = document.getElementById("star");
    element.classList.toggle("checked");
    // get the session id from the star toggle
    //add that session to personal schedule
}

//Deal with data and build the pages
async function buildSchedule() {
    const res  = await fetch(`data.json`);
    const json = await res.json();



    main.innerHTML = json.schedule.sessions.map(createSession).join('\n');
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function createSession(session){
    let time = new Date(session.time);
    let endTime = new Date(session.endTime);

    start = `${time.getHours()}:${addZero(time.getMinutes())}`
    end = `${endTime.getHours()}:${addZero(endTime.getMinutes())}`

    if (session.type == "break") {
        return `
        <div class="article" id="break">
            <div id="banner">
                <h3>${start}</h3>
                <h2>${session.title}</h2>
            </div>
        </div>
        `;
    }
    else if(session.type == "stream"){
        let streams = session.streams.map(createStream).join('\n')
        return `
        <div class="article">
            <div id="banner">
                <h3>${start}</h3>
                <h2>Session ${session.streamNum}</h2>
            </div>
            <div class="streams">
                ${streams}
            </div>
        </div>
        `
    }
    else {
        return `
        <div class="article">
            <div id="banner">
                <h3>${start}</h3>
                <h2>${session.title}</h2>
                <span class="fa fa-star checked"></span>
            </div>
            <div id="detail">
            <img src="${session.photo}">
            <H4>${session.firstName}  ${session.lastName} </h4>
            
            <p>${session.desc}</p>
            </div>
        </div>
        `;
    }

    
    }

function createStream(stream) {
    let speakers = stream.speakers.map(createSpeaker).join('\n')
    return  `
    <div id="${stream.theme.replace(' ','').toLowerCase()}">
        <span id="star" class="fa fa-star" onclick="starSelect()"></span>
        <h5 class="stream">${stream.theme}</h5>
        <h5 class="title">${stream.title}</h5>
        ${speakers}
        <p>${stream.desc}</p>
    </div>
    `;
}

function createSpeaker(speaker) {
    return `
    <h6>${speaker.firstName} ${speaker.lastName}</h6>
    `
}

