// audio
var a = new Audio("https://audio.jukehost.co.uk/hkGNwFdz9aCcpwCb5jV0HemAjwzApSKP");
a.loop = true;
a.volume = 0.3;

// constants
const guildUrl = "https://www.pokemonpets.com/ManageGuild.aspx";
const selectUrl = "https://www.pokemonpets.com/SelectWhichMonster.aspx";
const battleUrl = "https://www.pokemonpets.com/BattleWildMonster.aspx";
const hospitalUrl = "https://www.pokemonpets.com/MonsterCenter.aspx";
const pvpUrl = "https://www.pokemonpets.com/PVPBattleOffer.aspx";
const winUrl = "https://www.pokemonpets.com/BattleWinPVP.aspx";
const boardUrl = "https://www.pokemonpets.com/PVPBoard.aspx";
const gameUrl = "https://www.pokemonpets.com/gamepage.aspx";
const resultUrl = "https://www.pokemonpets.com/BattleResult.aspx";

const btnGQClass = "buttonRed smallPadding";
const btnSltMstId = "btnSelectMonster";
const btnFinishId = "btnBattleFinish";
const btnSurrenderId = "btnSurrender";
const btnDoRankedId = "ctl00_ContentPlaceHolder_btnDoEloLeagueMatch";
const btnDiscardId = "ctl00_ContentPlaceHolder_lknDiscard";
const btnFightId = "btnFightPokemon";
const btnAttkClass = "EmptyMovePlace button_transition_0_25_sec";
const btnContinueId = "btnContinue";
const btnRunId = "btnRunFromPokemon";

const redBtnPvP = "red push_button";
const ppClass = "NiceTextGreen";
const chkboxAuto = "chkBoxAutoBattle";
const turnClass = "TurnNumber";
const howManyMstClass = "HowManyMonsters";
const rpId = "RP";
const captchaClass = "ABQTitle";
const ultraRareClass = "Poke_UltraRare";
const legendaryClass = "Poke_Legendary";
const shinyClass = "Poke_Shiny";

const deadAlertId = "ctl00_ContentPlaceHolder_pnlAllPokemonDead";
const btnHealId = "ctl00_ContentPlaceHolder_btnHealMyPokemons";
const healResultId = "HealingResult";
const navTopId = "NavTop";
const navRightId = "NavRight";
const navLeftId = "NavLeft";

const maxTurns = 999;
var minAmount = 0;
var direction = 1;

function captchaCheck() {
	var captcha = document.getElementsByClassName(captchaClass).length;

	if (captcha > 0) {
		a.play();
	}
}

function battle() {
	//check if auto battle is on
	var autoBattle = document.getElementById(chkboxAuto);
	if (!autoBattle.checked) {
		autoBattle.click();
	}
	
	//click finish when done
	var btnFinish = document.getElementById(btnFinishId);
	if (btnFinish != null) {
		btnFinish.click();
	}
	
	//check if too many turns
	var turns = document.getElementsByClassName(turnClass);
	if (turns.length > 0 && btnFinish == null) {
		if (parseInt(turns[0].innerText.replace(/\D/g, "")) > maxTurns) {
			window.confirm = function() { return true; }
			
			document.getElementById(btnSurrenderId).click();
		}
	}	
}

function guildQuest() {
	var dead = document.getElementById(deadAlertId);
	if (dead != null) {
		//window.location.href = hospitalUrl;
		document.getElementById(navTopId).click();
	}

	var currUrl = document.URL;

	switch (currUrl) {
		case guildUrl:
			var btnGQ = document.getElementsByClassName(btnGQClass);
		
			if (btnGQ.length > 0) {
				btnGQ[0].click();
			}
			break;
		case selectUrl:
			document.getElementById(btnSltMstId).click();
			break;
		case battleUrl:
			battle();
			break;
		case hospitalUrl:
			var healResult = document.getElementById(healResultId);
		
			if (healResult == null) {
				document.getElementById(btnHealId).click();
			}
			else {
				window.location.href = guildUrl;
			}
			break;
	}
	
	setTimeout(guildQuest, 1500);
}

function pvp() {
	var captcha = document.getElementsByClassName(captchaClass).length;

	if (captcha > 0) {
		window.location.href = pvpUrl;
	}
	
	var url = document.URL;
	
	if (url.indexOf(pvpUrl) > -1) {
		url = pvpUrl;
	}
	
	switch (url) {
		case pvpUrl:
			var btnDoRanked = document.getElementById(btnDoRankedId);	
	
			if (btnDoRanked != null) {
				btnDoRanked.click();
			}			
			
			var btnDiscard = document.getElementById(btnDiscardId);
			
			if (btnDiscard != null) {
				btnDiscard.click();
			}
			
			break;
		case selectUrl:
			document.getElementById(btnSltMstId).click();
			break;
		case battleUrl:
			battle();			
			break;
		case winUrl:
			var redBtn = document.getElementsByClassName(redBtnPvP);
	
			if (redBtn.length > 0) {
				redBtn[0].click();
			}
			
			break;
		case boardUrl:
			window.location.href = pvpUrl;
			break;
	}		
	
	setTimeout(pvp, 1000);
}

function hunt() {
	var min = 300;
    var max = 700;
	//Generate Random number between min - max
	var rand = Math.floor(Math.random() * (max - min + 1) + min); 
	
	//the number below pokeball showing how many pokemon you have
	var howMany = document.getElementsByClassName(howManyMstClass)[0].innerText;
	//wild pokemon window
	var rpElement = document.getElementById(rpId);
	//check if that window is visible
	var rpVisible = rpElement.getAttribute("style").indexOf("visible");
	//get the div to check if pokemon in pokedex yet
	var rpDiv = rpElement.getElementsByTagName("div");
	//the captcha
	var captcha = document.getElementsByClassName(captchaClass).length;
	//ultra rare pokemon
	var ultraRare = rpElement.getElementsByClassName(ultraRareClass).length > 0;
	//legendary pokemon 
	var legendary = rpElement.getElementsByClassName(legendaryClass).length > 0;
	//shiny pokemon	
	var shiny = rpElement.getElementsByClassName(shinyClass).length > 0;
	var pokedex = false;
	
	/*for (var i = 0; i < rpDiv.length; i++) {
		if (rpDiv[i].getAttribute("style") != null
			&& rpDiv[i].getAttribute("style").indexOf("star") > -1) {
			pokedex = true;
			break;
		}
	}*/
	
	//stop condition
	if ((
		//catch window is visible
		rpVisible > -1 &&		
		(
		//within wanna-catch amount
		//howMany < minAmount + 1 ||
		//not in pokedex
		//pokedex ||		
		ultraRare || legendary || shiny
		)) 
		//captcha showing
		|| captcha > 0){ 
		//play sound		
		a.play();
		
		return;
	}
	
	//run if already caught
	if (howMany != '' && howMany > minAmount) {
		document.getElementById(btnRunId).click();
	}

	//go left or right
	if (howMany == '') {
		if (direction == 1) {
			document.getElementById(navRightId).click();
		}
		else {
			document.getElementById(navLeftId).click();		
		}
	}
	
	//change direction
	direction = 1 - direction;
	
	var hunting = setTimeout(hunt, rand);
}

const huntCheckBoxId = "huntCheckBox";

function main(action) {	
	switch (action) {
		case "hunt":
			var isCheck = document.getElementById(huntCheckBoxId).checked;
			
			if (isCheck) {
				hunt();
			}
			else {
				clearTimeout(hunting);
			}
			
			break;
	}
}