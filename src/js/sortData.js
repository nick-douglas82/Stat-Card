import playersData from './data/player-stats.json';

const sortData = () => {
    const { players } = playersData;

    const response = {};

    // Loop through the players
    players.forEach(p => {
        const { player, stats } = p;

        // Set the data for the stats
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

        // Create our new player object
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

        // Add assists
        if (assists) {
            response[player.id].stats.assists = assists.value;
        }
    });

    return response;
};

export default sortData;
