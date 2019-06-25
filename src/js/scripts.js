import {
    updateClubBadge,
    updatePlayerStats,
    updatePlayerInfo,
    updatePlayerPhoto,
} from './updatePlayer';
import sortData from './sortData';
import createSelectList from './selectList';

const players = sortData();
createSelectList(players);

const select = document.querySelector('.select-list');
select.addEventListener('change', e => {
    updatePlayerInfo(players, e.target.value);
    updatePlayerStats(players, e.target.value);
    updatePlayerPhoto(players, e.target.value);
    updateClubBadge(players, e.target.value);
});
