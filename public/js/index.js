// variable 'trainers' passed in from EJS
const d = document;
const trainerList = new DocumentFragment();
const submitButton = d.getElementById('submit-button');
const backButton = d.getElementById('back-button');
const copyButton = d.getElementById('copy-button');
const chosenOnesWindow = d.querySelector('.chosen-ones-container');

function compare(a, b) {
    const trainerA = a.trainer.toLowerCase();
    const trainerB = b.trainer.toLowerCase();

    let comparison = 0;
    if (trainerA > trainerB) comparison = 1;
    else if (trainerA < trainerB) comparison = -1;
    return comparison;
}

trainers.sort(compare);

function copyText() {
    const text = d.getElementById('the-chosen');
    text.select();
    text.setSelectionRange(0, 99999); /* For mobile devices */
    d.execCommand('copy');
    alert('Copied! Now go paste into Pokémon GO.');
    togglePopup();
    document.getSelection().removeAllRanges();
}

// create a new trainer card with a trainer object
function createTrainerCard(data) {
    // define trainer details from data
    const thisName = data.trainer;
    const thisTeam = (data.team === undefined || data.team === null || data.team ==='') ? 'harmony' : data.team;
    const thisFriendCode = (data.friendCode === undefined) ? '???? ???? ????': data.friendCode;

    // create trainer code elements
    const checkbox = d.createElement('div');
    const friendCode = d.createElement('span');
    const team = d.createElement('div');
    const teamLogo = d.createElement('img');
    const trainerCard = d.createElement('div');
    const trainerInfo = d.createElement('div');
    const trainerName = d.createElement('span');

    // set styles and attributes of trainer card elements
    checkbox.classList.add('checkbox');
    friendCode.classList.add('friend-code');
    friendCode.innerHTML = thisFriendCode;
    team.classList.add('team-logo', `team-${thisTeam.toLowerCase()}`);
    teamLogo.setAttribute('src', `img/team_${thisTeam.toLowerCase()}.png`);
    trainerCard.classList.add('trainer-card');
    trainerCard.setAttribute('id', thisName.toLowerCase());
    trainerInfo.classList.add('column', 'name')
    trainerName.classList.add('trainer-name');
    trainerName.innerHTML = thisName;

    // Assemble elements into trainer card
    trainerInfo.appendChild(trainerName);
    trainerInfo.appendChild(friendCode);
    team.appendChild(teamLogo);
    trainerCard.appendChild(team);
    trainerCard.appendChild(trainerInfo);
    trainerCard.appendChild(checkbox);
   
    return trainerCard;
}

function togglePopup() {
    chosenOnesWindow.classList.toggle('hidden');
    document.querySelector('.overlay').classList.toggle('hidden');
    document.body.classList.toggle('stop-scrolling');
}

// create trainer cards for each trainer in the data.
trainers.forEach((item, index, arr) => {
    const trainerCard = createTrainerCard(item);
    trainerList.appendChild(trainerCard);    
});

// add new trainer list (document fragment) to main window
d.querySelector('.main-window').appendChild(trainerList);

// get list of all trainer cards
const trainerCards = d.querySelectorAll('.trainer-card');

// add event listeners to each trainer card
trainerCards.forEach((x, i, a) => {
    x.addEventListener('click', function () {
        x.classList.toggle('selected');
        const counter = d.querySelectorAll('.selected').length;
        d.querySelector('.counter').innerText = counter;
    });
});

/********** LISTENERS **********/
backButton.addEventListener('click', () => {
    togglePopup();
});

copyButton.addEventListener('click', copyText);

submitButton.addEventListener('click', () => {
    const selected = Array.from(d.querySelectorAll('.selected'));
    const chosenOnes = selected.map(trainer => {
        return trainer.children[1].children[0].innerHTML;
    });
    const searchString = chosenOnes.join(', ');
    d.getElementById('the-chosen').value = searchString;
    togglePopup();
});

