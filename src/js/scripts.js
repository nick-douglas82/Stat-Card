import playersData from './data/player-stats.json';

function sortData(data) {
    const { players } = data;

    const response = {};

    players.forEach(p => {
        const { player, stats } = p;

        const goals = stats.find(s => s.name === 'goals');
        const appearances = stats.find(s => s.name === 'appearances');
        const goalsPerMatch = parseFloat(
            (goals.value / appearances.value).toFixed(2)
        );

        const fPasses = stats.find(s => s.name === 'fwd_pass');
        const bPasses = stats.find(s => s.name === 'backward_pass');
        const totalPasses = fPasses.value + bPasses.value;
        const minutesPlayed = stats.find(s => s.name === 'mins_played');
        const passesPerMinute = parseFloat(
            (totalPasses / minutesPlayed.value).toFixed(2)
        );
        const assists = stats.find(s => s.name === 'goal_assist');

        response[player.id] = {
            name: `${player.name.first} ${player.name.last}`,
            position: player.info.positionInfo,
            team: {
                id: player.currentTeam.id,
                name: player.currentTeam.name,
            },
            stats: {
                goals: goals.value,
                appearances: appearances.value,
                goalsPerMatch,
                passesPerMinute,
            },
        };

        if (assists) {
            response[player.id].stats.assists = assists.value;
        }
    });

    return response;
}

const players = sortData(playersData);
console.log('data', players);

const select = document.querySelector('.select-list');

// Create drop down items
Object.keys(players).forEach(id => {
    const opt = document.createElement('option');
    opt.value = id;
    opt.text = players[id].name;
    select.add(opt, null);
});

const updatePlayerInfo = id => {
    const playerName = document.querySelector('.stat-card__player__name');
    const playerPosition = document.querySelector(
        '.stat-card__player__position'
    );

    if (id !== '0') {
        playerName.innerHTML = players[id].name;
        playerPosition.innerHTML = players[id].position;
    } else {
        playerName.innerHTML = 'Player Name';
        playerPosition.innerHTML = 'Player Position';
    }
};

const updatePlayerPhoto = id => {
    const playerPhoto = document.querySelector(
        '.stat-card__player-img .img-inner'
    );

    if (id !== '0') {
        playerPhoto.style.backgroundImage = `url(./images/p${id}.png)`;
    } else {
        playerPhoto.style.backgroundImage = `url()`;
    }
};

const updateClubBadge = id => {
    const clubLogo = document.querySelector('.stat-card__club-logo');

    clubLogo.classList.forEach(item => {
        if (item.startsWith('club-')) clubLogo.classList.remove(item);
    });

    if (id !== '0') {
        clubLogo.classList.add(`club-${players[id].team.id}`);
    } else {
        clubLogo.classList.add(`club-0`);
    }
};

function updatePlayerStats(id) {
    const appearancesEl = document.querySelector('.appearances .stat');
    const goalsEl = document.querySelector('.goals .stat');
    const assistsEl = document.querySelector('.assists .stat');
    const goalsPerMatchEl = document.querySelector('.goals_match .stat');
    const passesPerMinuteEl = document.querySelector('.passes_minute .stat');

    if (id !== '0') {
        const {
            appearances,
            goals,
            assists,
            goalsPerMatch,
            passesPerMinute,
        } = players[id].stats;

        appearancesEl.innerHTML = appearances;
        goalsEl.innerHTML = goals;
        assistsEl.innerHTML = assists;
        goalsPerMatchEl.innerHTML = goalsPerMatch;
        passesPerMinuteEl.innerHTML = passesPerMinute;
    } else {
        appearancesEl.innerHTML = '0';
        goalsEl.innerHTML = '0';
        assistsEl.innerHTML = '0';
        goalsPerMatchEl.innerHTML = '0.00';
        passesPerMinuteEl.innerHTML = '0.00';
    }
}

select.addEventListener('change', e => {
    updatePlayerInfo(e.target.value);
    updatePlayerStats(e.target.value);
    updatePlayerPhoto(e.target.value);
    updateClubBadge(e.target.value);
});
