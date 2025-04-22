playerNames =
	[
		"Abbe",
		"Abbey",
		"Abbi",
		"Abbie",
		"Abby",
		"Abbye",
		"Abigael",
		"Abigail",
		"Abigale",
		"Abra",
		"Ada",
		"Adah",
		"Adaline",
		"Adan",
		"Adara",
		"Adda",
		"Addi",
		"Addia",
		"Addie",
		"Addy",
		"Adel",
		"Adela",
		"Adelaida",
		"Adelaide",
		"Adele",
		"Adelheid",
		"Adelice",
		"Adelina",
		"Adelind",
		"Adeline",
		"Adella",
		// "Adelle",
		// "Adena",
		// "Adey",
		// "Adi",
		// "Aaren",
		// "Adina",
		// "Adora",
		// "Adore",
		// "Adoree",
		// "Adorne",
		// "Adrea",
		// "Adria",
		// "Adriaens",
		// "Adrian",
		// "Adriana",
		// "Adriane",
		// "Adrianna",
		// "Adiana",
		// "Adrianne",
		// "Adriena",
		// "Adrienne",
		// "Aeriel",
		// "Aeriela",
		// "Aeriell",
		// "Afton",
		// "Ag",
		// "Agace",
		// "Agata",
		// "Agatha",
		// "Agathe",
		// "Aggi",
		// "Aggie",
		// "Aggy",
		// "Agna",
		// "Agnella",
		// "Agnes",
		// "Agnese",
		// "Agnesse",
		// "Agneta",
		// "Agnola",
		// "Agretha",
		// "Aida",
		// "Aidan",
		// "Aigneis",
		// "Aila",
		// "Aile",
		// "Ailee",
		// "Aileen",
		// "Ailene",
		// "Ailey",
		// "Aili",
		// "Ailina",
		// "Ailis",
		// "Ailsun",
		// "Ailyn",
		// "Aime",
		// "Aimee",
		// "Aimil",
		// "Aindrea",
		// "Ainslee",
		// "Ainsley",
		// "Ainslie",
		// "Ajay",
		// "Alaine",
		// "Alameda",
		// "Alana",
		// "Alaina",
		// "Alair",
		// "Alake",
	]
function coordinator(entities, entitiesPerTeam, rounds, courtNumbers, shufflePlayers) {
	//TODO: add in functionality to consider player level and avoid grouping better players together (this is more for blind draws and such)
	//take in array of players, randomize the order, and then split into teams.
	//! dictate how many rounds there will be by dividing number of courts by players.
	//if i have 5 courts, and 2 teams can play per court, how many games on each court per round do i need for everyone to play
	// 1 court can have 2 teams, so 5 courts can have 10 teams.
	//TODO:: Have to add in functionality for overflow. we need every player to play each round, automatically iterate through all courts assigning players to courts for each game. Maybe we have to change some of these god awful for loops and nested for loops idk i took an edible
	let results = {};
	console.log(entities.length)
	for (let round = 1; round <= rounds; round++) {
		let participants = entities.slice();
		results["Round " + round] = {};
		let teams = [];
		if (shufflePlayers) {
			shuffle(participants)
			teams = randomTeamAssigner(participants, entitiesPerTeam);
		}
		else teams = participants;
		results["Round " + round] = courtAssigner(teams, courtNumbers);
	}
	console.log(results);
	return results
}
function courtAssigner(teams, courts) {
	let results = {};
	let game = 1;
	let court = 0;
	while (teams.length > 0) {
		if (results["Court " + courts[court]] === undefined) results["Court " + courts[court]] = {};
		else game = parseInt(Object.keys(results["Court " + courts[court]])[Object.keys(results["Court " + courts[court]]).length - 1].match(/\d+/)[0]) + 1;
		if (results["Court " + courts[court]]["Game " + game] === undefined) results["Court " + courts[court]]["Game " + game] = {};
		results["Court " + courts[court]]["Game " + game]["Team 1"] = teams.pop();
		results["Court " + courts[court]]["Game " + game]["Team 2"] = teams.pop();
		court++;
		if (court >= courts.length) court = 0;
	}
	return results;
}
function randomTeamAssigner(participants, entitiesPerTeam) {
	teams = [];
	while (participants.length > 0) {
		let team = participants.splice(0, entitiesPerTeam);
		if (team.length < entitiesPerTeam) {
			team.push("PLACEHOLDER");
		}
		teams.push(team);
	}
	return teams;
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}