export function goalsPerMatch(goals, appearances) {
    console.log('goals', goals);
    return parseFloat((goals / appearances).toFixed(2));
}

export function passesPerMinute(fPasses, bPasses, minutesPlayed) {
    const totalPasses = fPasses + bPasses;
    return parseFloat((totalPasses / minutesPlayed).toFixed(2));
}
