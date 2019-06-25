export const updatePlayerInfo = (players, id) => {
    const playerName = document.querySelector('.stat-card__player__name');
    const playerPosition = document.querySelector(
        '.stat-card__player__position'
    );

    // Update the player name and position if the id is not 0
    if (id !== '0') {
        playerName.innerHTML = players[id].name;
        playerPosition.innerHTML = players[id].position;
    } else {
        playerName.innerHTML = 'Player Name';
        playerPosition.innerHTML = 'Player Position';
    }
};

export const updatePlayerPhoto = (players, id) => {
    const playerPhoto = document.querySelector(
        '.stat-card__player-img .img-inner'
    );

    // Update the player name photo if the id is not 0
    if (id !== '0') {
        playerPhoto.style.backgroundImage = `url(./images/p${id}.png)`;
    } else {
        playerPhoto.style.backgroundImage = `url()`;
    }
};

export const updateClubBadge = (players, id) => {
    const clubLogo = document.querySelector('.stat-card__club-logo');

    // Remove the club class which is linked with the CSS
    clubLogo.classList.forEach(item => {
        if (item.startsWith('club-')) {
            clubLogo.classList.remove(item);
        }
    });

    // Set the club class if id is not 0
    if (id !== '0') {
        clubLogo.classList.add(`club-${players[id].team.id}`);
    } else {
        clubLogo.classList.add(`club-0`);
    }
};

export const updatePlayerStats = (players, id) => {
    const appearancesEl = document.querySelector('.appearances .stat');
    const goalsEl = document.querySelector('.goals .stat');
    const assistsEl = document.querySelector('.assists .stat');
    const goalsPerMatchEl = document.querySelector('.goals_match .stat');
    const passesPerMinuteEl = document.querySelector('.passes_minute .stat');

    document.querySelector('.assists').classList.remove('hide');

    if (id !== '0') {
        const {
            appearances,
            goals,
            assists,
            goalsPerMatch,
            passesPerMinute,
        } = players[id].stats;

        // Set the stats information
        appearancesEl.innerHTML = appearances;
        goalsEl.innerHTML = goals;
        assistsEl.innerHTML = assists;

        // If assists is not defined, hide the state item
        if (typeof assists === 'undefined') {
            document.querySelector('.assists').classList.add('hide');
        }
        goalsPerMatchEl.innerHTML = goalsPerMatch;
        passesPerMinuteEl.innerHTML = passesPerMinute;
    } else {
        appearancesEl.innerHTML = '0';
        goalsEl.innerHTML = '0';
        assistsEl.innerHTML = '0';
        goalsPerMatchEl.innerHTML = '0.00';
        passesPerMinuteEl.innerHTML = '0.00';
    }
};
