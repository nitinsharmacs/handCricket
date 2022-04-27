const winner = function (match) {
  const batsMan = match.batsMan;
  const bowler = match.bowler;
  if (batsMan.runs > bowler.runs) {
    return batsMan;
  }
  return bowler;
};

const shakeHand = function () {
  return Math.ceil(Math.random() * 6);
};

const isRunning = function (handSigns) {
  return handSigns.batsMan !== handSigns.bowler;
};

const playInning = function () {
  let runs = 0;
  let balls = 0;
  const handSigns = { batsMan: 0, bowler: 1 };
  while (isRunning(handSigns)) {
    runs += handSigns.batsMan;
    balls += 1;
    handSigns.batsMan = shakeHand();
    handSigns.bowler = shakeHand();
  }
  return { balls: balls, runs: runs };
};

const updateBatsMan = function (match, inning) {
  const batsMan = match.batsMan;
  batsMan.runs = inning.runs;
  batsMan.balls = inning.balls;
  match.batsMan = batsMan;
};

const swapPlayers = function (match) {
  const batsMan = match.batsMan;
  match.batsMan = match.bowler;
  match.bowler = batsMan;
  return match;
};

const createMatch = function (players) {
  return {
    batsMan: {
      name: players[0],
    },
    bowler: {
      name: players[1],
    },
  };
};

const startMatch = function (players) {
  const match = createMatch(players);
  for (let index = 0; index < players.length; index++) {
    let inning = playInning();
    updateBatsMan(match, inning);
    swapPlayers(match);
  }
  return {
    match: match,
    winner: winner(match)
  };
};

const main = function () {
  const matchResult = startMatch(['gayatri', 'sanjana']);
  console.log(matchResult.match);
  console.log(matchResult.winner);
};

main();
