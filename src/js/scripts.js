import playersData from './data/player-stats.json';

const { players } = playersData;
console.log(players);
const select = document.querySelector('.select-list');
const playerName = document.querySelector('.stat-card__player__name');
const playerPosition = document.querySelector('.stat-card__player__position');
const stats = document.querySelector('.stat-card__stats__list');

// Create drop down items
for (const id in players) {
    const opt = document.createElement('option');
    const { first, last } = players[id].player.name;
    opt.value = id;
    opt.text = `${first} ${last}`;

    select.add(opt, null);
}

function updatePlayerInfo(player) {
    const { first, last } = player.player.name;
    const { positionInfo } = player.player.info;
    playerName.innerHTML = `${first} ${last}`;
    playerPosition.innerHTML = `${positionInfo}`;
}

function updatePlayerStats(player) {
    console.log(player.stats);
    for (const id in player.stats) {
        if (
            player.stats[id].name === 'goals' ||
            player.stats[id].name === 'appearances' ||
            player.stats[id].name === 'goal_assist'
        ) {
            const li = document.createElement('li');
            stats.appendChild(li);
            li.classList.add('stat-card__stats__item');
            li.innerHTML = `<span>${player.stats[id].name}</span>
                        <span>${player.stats[id].value}</span>`;
        }
    }
}

select.addEventListener('change', e => {
    const player = players[e.target.value];
    updatePlayerInfo(player);
    updatePlayerStats(player);
});
