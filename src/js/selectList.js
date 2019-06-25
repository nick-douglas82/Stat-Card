const createSelectList = players => {
    const select = document.querySelector('.select-list');

    // Create drop down items
    Object.keys(players).forEach(id => {
        const opt = document.createElement('option');

        // Set the data
        opt.value = id;
        opt.text = players[id].name;

        // Add the data to the select item
        select.add(opt, null);
    });
};

export default createSelectList;
