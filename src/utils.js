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
		"Adelle",
		"Adena",
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
		// "Alala",
	]
coordinator(playerNames, 2, 5, 3, [1, 2, 3, 4, 5])
function coordinator(entities, entitiesPerTeam, numberOfCourts, rounds, courtNumbers) {
	//TODO: add in functionality to consider player level and avoid grouping better players together (this is more for blind draws and such)
	//take in array of players, randomize the order, and then split into teams.
	//! dictate how many rounds there will be by dividing number of courts by players.

	let numberOfTeams = Math.floor(entities.length / entitiesPerTeam)
	//if i have 5 courts, and 2 teams can play per court, how many games on each court per round do i need for everyone to play
	// 1 court can have 2 teams, so 5 courts can have 10 teams.
	//TODO:: Have to add in functionality for overflow. we need every player to play each round, automatically iterate through all courts assigning players to courts for each game. Maybe we have to change some of these god awful for loops and nested for loops idk i took an edible
	let maxTeamsToPlayPergame = numberOfCourts * 2;
	let numberOfGamesPerRound = Math.floor(numberOfTeams / maxTeamsToPlayPergame);
	let results = {};
	for (let round = 1; round <= rounds; round++) {
		let participants = entities.slice();
		shuffle(participants)
		results["Round " + round] = {};
		for (let courtNumber = 0; courtNumber < courtNumbers.length; courtNumber++) {
			results["Round " + round]["Court " + courtNumbers[courtNumber]] = {};
			for (let gameNumber = 1; gameNumber <= numberOfGamesPerRound; gameNumber++) {
				results["Round " + round]["Court " + courtNumbers[courtNumber]]["Game Number " + gameNumber] = {};
				for (let team = 1; team <= 2; team++) {
					results["Round " + round]["Court " + courtNumbers[courtNumber]]["Game Number " + gameNumber]["Team " + team] = participants.splice(0, entitiesPerTeam);
				}
			}
		}
	}
	console.log(results)
}

// shuffle(entities)
//now we have the total number of games per round on each court for every team to play once.]

// if (entities.length < entitiesPerTeam * numberOfTeams) {
// 	//! may have to add in an option to fill with an empty entity per team.
// 	console.error("Not enough players to fill all teams");
// 	return;
// }

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}