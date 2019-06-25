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

function updatePlayerInfo(player) {
    const playerName = document.querySelector('.stat-card__player__name');
    const playerPosition = document.querySelector(
        '.stat-card__player__position'
    );
    playerName.innerHTML = player.name;
    playerPosition.innerHTML = player.position;
}

function updatePlayerStats(player) {
    const appearancesEl = document.querySelector('.appearances .stat');
    const goalsEl = document.querySelector('.goals .stat');
    const assistsEl = document.querySelector('.assists .stat');
    const goalsPerMatchEl = document.querySelector('.goals_match .stat');
    const passesPerMinuteEl = document.querySelector('.passes_minute .stat');

    const {
        appearances,
        goals,
        assists,
        goalsPerMatch,
        passesPerMinute,
    } = player.stats;

    appearancesEl.innerHTML = appearances;
    goalsEl.innerHTML = goals;
    assistsEl.innerHTML = assists;
    goalsPerMatchEl.innerHTML = goalsPerMatch;
    passesPerMinuteEl.innerHTML = passesPerMinute;
}

select.addEventListener('change', e => {
    const player = players[e.target.value];
    updatePlayerInfo(player);
    updatePlayerStats(player);
});
