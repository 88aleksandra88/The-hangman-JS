function mots_a_trouver() {
	return str = "*La cité de la peur : La phrase Quand je suis content je vomis viens du film *lion :Le roi des animaux : *Prince : Qui a chanté Purple Rain : *Râ : Le dieu du soleil dans L'ancien Egypte : *Victor Hugo : Miserables : *Federer : Joueur de tennis : *Nirvana : Smells like a ten spirit : *Watson : Qui raconte les aventures de Sherlock Holmes : *Clyde : L'inséparable de Bonnie : *always : ...Coca-cola : *Neil Amstrong : Premier pas sur la lune : *Jaques : Pierre Paul ... :*Esmeralda : A chaque Quasimodo sa... :* Jacouille la Fripouille : Jour! Nuit! Jour! Nuit! :*The Doors : Jim Morrison :*Vadrouille : La grande... : *Mr Bean : Rowan Atkinson :* Khaled : Aicha : *Peter Pan : Forever young : *Tommy Shelby : Peaky Blinders : *Titanic : My heart will go on : * Jamel Debouze : Numérobis : *Super Bowl : Foot Americain : *Claude : Mc Solar : *Bazinga : Sheldon : *Woody : Toy Story : *Kyo : Benoît Poher : *Police : Sting : *Mercury : Freddy : *Folles : La cage aux... : *Watch : The night... : * Lucille : Negan : * Stephen King : Ca : * Hannibal : Lecter : * Harley Quinn : Jocker : *Batman : Robin : *Foule Sentimentale : Souchon : *Les trois frères : Les inconus : *Taxi : Alors les filles on se laisse pousser la moustache? : *Dikkenek : Ou tu sors ou je te sors... : *Le dinner de con : Il s'appelle Juste Leblanc : *Dr Mamour : Greys Anatomy : *Prison Break : Geule d'ange : *Naruto : Razengan : * Hunter x Hunter :  Gon Freecss : *Hunger Games : Peeta : *Tomb Rider :Evangelina : *Da Vinci Code : Dan Brown : *Star Wars : Anakin : *Peaky Blinders : By order of the... : *Dexter : Morgan ";

}

let fin = true;
let nb_erreurs = 0;
let nb_passe = 0;
let tab_mots;
let nb_mots = 0;
let chaine_rangee = "";
let le_mot = ""; var lindication = "";
let mem_mot = "";
let le_scrore = 5;
let lettres_ok = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let la_touche = "";

recuperer();

function recuperer() {
	tab_mots = mots_a_trouver().split('*');
	nb_mots = tab_mots.length;

}

function debuter() {
	if (la_touche == " ")
		return;

	fin = false; nb_coups = 0; chaine_rangee = '';
	nb_passe = 0; nb_erreurs = 0; le_scrore = 5;

	suivant();

}


function suivant() {
	let tab_enigme;
	let nb_alea = Math.floor(Math.random() * nb_mots);

	le_score = le_score = nb_erreurs / 4;
	document.getElementById('leScore').innerHTML = 'Votre score :<strong>' + le_score + ' / 5</strong> - Mots restants :<strong>' + (5 - nb_passe) + '</strong>'
	document.getElementById('lePendu').src = 'assets/img/images/pendu_defaut.png';
	nb_erreurs = 0;

	init_calques();

	let parent = document.getElementById('apercu');
	let enfants = parent.getElementsByTagName('div');

	for (var i = 0; i < enfants.length; i++) {
		if (enfants[i].id != 'saut1' && enfants[i].id != 'saut2')
			enfants[i].style.backgroundColor = '#EDEEEE';

	}


	while (chaine_rangee.indexOf('-' + nb_alea + '-') > -1) {
		nb_alea = Math.floor(Math.random() * nb_mots);

	}

	chaine_rangee += '-' + nb_alea + '-';
	tab_enigme = tab_mots[nb_alea].split(':');
	le_mot = tab_enigme[0];
	lindication = tab_enigme[1];
	mem_mot = le_mot.toUpperCase();
	le_mot = le_mot.toUpperCase().replace(/[A-Z0-9]/g, '_');
	document.getElementById('indication').innerHTML = 'Indication :<br /><strong>' + lindication + '</strong>';
	document.getElementById('leMot').innerHTML = le_mot;

}

function clavier(evenement) {
	let indice = 0;
	let la_lettre = "";
	let trouve = false;

	if (fin == true)
		return;

	let touche = window.event ? evenement.keyCode : evenement.which;
	touche = String.fromCharCode(touche).substr(0, 1);

	if (touche == " ") {
		la_touche = " ";
		return;
	}
	if (lettres_ok.indexOf(touche) == -1)
		return;

	document.getElementById("calque_" + touche.toLowerCase()).style.backgroundColor = "#2c1c1c";


	for (indice = 0; indice <= mem_mot.length - 1; indice++) {
		la_lettre = mem_mot.substr(indice, 1);
		if (la_lettre == touche) {
			trouve = true;
			le_mot = le_mot.substr(0, indice) + la_lettre + le_mot.substr(indice + 1);
			document.getElementById('leMot').innerHTML = le_mot;

		}
	}

	if (trouve == true) {
		if (le_mot == mem_mot) {
			nb_passe++;
			if (nb_passe == 5) {
				document.getElementById('leScore').innerHTML = 'Votre score :<strong>' + (le_score - nb_erreurs / 4) + ' / 10</strong> - Mots restants : <strong>' + (5 - nb_passe) + '</strong>- <strong>Tu as gagné! Je te laiss partir cette fois.. </strong>';
				fin = true;

			}

			else {
				window.setTimeout(function attendre() { suivant(); }, 1000);
				//alert('Perdu! Essaye encore si tu veut retrouver ton chemin...');

			}
		}
	}

	else {
		nb_erreurs++;
		document.getElementById('lePendu').src = 'assets/img/images/pendu' + nb_erreurs + '.png';
		if (nb_erreurs == 4) {
			nb_passe++;
			if (nb_passe == 5)
				fin = true
			window.setTimeout(function attendre() { suivant(); }, 1000);

		}
	}
}



