// variable 'trainers' passed in from EJS
const trainerList = new DocumentFragment();


function compare(a, b) {
    const trainerA = a.trainer.toLowerCase();
    const trainerB = b.trainer.toLowerCase();

    let comparison = 0;
    if (trainerA > trainerB) comparison = 1;
    else if (trainerA < trainerB) comparison = -1;
    return comparison;
}

trainers.sort(compare);

// create a new trainer card with a trainer object
function createTrainerCard(data) {
    // define trainer details from data
    const thisName = data.trainer;
    const thisTeam = (data.team === undefined) ? 'harmony' : data.team;
    const thisFriendCode = (data.friendCode === undefined) ? '???? ???? ????': data.friendCode;

    // create trainer code elements
    const checkbox = document.createElement('div');
    const friendCode = document.createElement('span');
    const team = document.createElement('div');
    const teamLogo = document.createElement('img');
    const trainerCard = document.createElement('div');
    const trainerInfo = document.createElement('div');
    const trainerName = document.createElement('span');

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

// create trainer cards for each trainer in the data.
trainers.forEach((item, index, arr) => {
    const trainerCard = createTrainerCard(item);
    trainerList.appendChild(trainerCard);    
});

// add new trainer list (document fragment) to main window
document.querySelector('.main-window').appendChild(trainerList);

// get list of all trainer cards
const trainerCards = document.querySelectorAll('.trainer-card');

// add event listeners to each trainer card
trainerCards.forEach((x, i, a) => {
    x.addEventListener('click', function () {
        x.classList.toggle('selected');
        const counter = document.querySelectorAll('.selected').length;
        document.querySelector('.counter').innerText = counter;
    });
});