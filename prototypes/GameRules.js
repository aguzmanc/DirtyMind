var PENALTY_TIME = 20; // twenty minutes
var PENALTY_FOOD = 2;
var PENALTY_ENERGY = 2;
var PENALTY_HAPPINESS = 10;
var MS_TO_LEAK_HAPPINESS = 2500;
// --------------------= =--------------------
var COLORS_TABLE = {
	comer: 			'#ED1465',
	dormir: 		'#5C23EE',
	estudiar: 		'#EE23DD',
	jugar:			'#FF0000',
	escuchar: 		'#109833',
	programar: 		'#0000FF',
	observar: 		'#9A8813',
	usar: 			'#059698',
	
	fideos: 		'#EE23DD',
	chorizo:		'#FF0000',
	ensalada: 		'#109833',
	una_hora: 		'#0000FF',
	seis_horas: 	'#9A8813',
	con_alguien: 	'#059698',
	a_alguien:  	'#000000',
	con_tus_amigos: '#727272',
	matematicas: 	'#ED1465',
	musica: 		'#5C23EE',
	poker: 			'#EE23DD',
	futbol: 		'#FF0000',
	insultos: 		'#109833',
	ruido: 			'#0000FF',
	juegos: 		'#9A8813',
	basura: 		'#059698',
	una_pelicula: 	'#000000',
	drogas: 		'#9A8813',
	aliens: 		'#5C23EE'
};
// --------------------= =--------------------
var VERBS_TABLE = ['comer','dormir','estudiar','jugar','escuchar','programar','observar','usar'];
// --------------------= =--------------------
var ALL_VERBS = {
	comer: 	'comer',
	dormir: 'dormir',
	estudiar:'estudiar',
	jugar:'jugar',
	escuchar:'escuchar',
	programar:'programar',
	observar:'observar',
	usar:'usar'
};
// --------------------= =--------------------
var NOUNS_TABLE = ['fideos','chorizo','ensalada','una_hora','seis_horas','con_alguien','a_alguien','con_tus_amigos',
	'matematicas','musica','poker','futbol','insultos','ruido','juegos','basura','una_pelicula',
	'drogas','aliens'];
// --------------------= =--------------------
var ALL_NOUNS = {
	fideos: 		'fideos',
	chorizo: 		'chorizo',
	ensalada: 		'ensalada',
	una_hora: 		'1 hora',
	seis_horas: 	'6 horas',
	con_alguien: 	'con alguien',
	a_alguien:  	'a alguien',
	con_tus_amigos: 'con tus amigos',
	matematicas: 	'matematicas',
	musica: 		'musica',
	poker: 			'poker',
	futbol: 		'futbol',
	insultos: 		'insultos',
	ruido: 			'ruido',
	juegos: 		'juegos',
	basura: 		'basura',
	una_pelicula: 	'una pelicula',
	drogas: 		'drogas',
	aliens: 		'aliens'
};
// --------------------= =--------------------
var POINTS_TABLE = {
	comer : {
		fideos: 		{fo:20,	en:01,	ha:2,	ti:-20},
		chorizo:		{fo:05,	en:01,	ha:30,	ti:-20,		meme:'ultragay'},
		ensalada: 		{fo:01,	en:03,	ha:4,	ti:-10},
		una_hora: 		{fo:03,	en:03,	ha:2,	ti:-60,		},
		seis_horas: 	{fo:20,	en:-10,	ha:15,	ti:-360,	meme:'fuckyea'},
		con_alguien: 	{fo:05,	en:01,	ha:10,	ti:-50},
		a_alguien: 		{fo:15,	en:01,	ha:19,	ti:-150,	meme:'quemalote'},
		con_tus_amigos: {fo:03,	en:01,	ha:15,	ti:-70},
		juegos: 		{fo:00,	en:00,	ha:-9,	ti:-30,		meme:'jackiechan'},
		basura: 		{fo:02,	en:-7,	ha:-10,	ti:-30,		meme:'jackiechan'},
		una_pelicula:	{fo:01,	en:-7,	ha:-5,	ti:-30},
		drogas: 		{fo:-20,en:-5,	ha:30,	ti:-20,		meme:'quemalote'},
		aliens: 		{fo:7,	en:-4,	ha:26,	ti:-300,	meme:'fuckyea'}
	},

	dormir:{
		una_hora: 	    {fo:-1,  en:10,  ha:2,  ti:-60},
		seis_horas:     {fo:-20, en:60,  ha:4,  ti:-360},
		con_alguien:    {fo:-10, en:25, ha:40, ti:-120,		meme:'picaron'},
		a_alguien:  	{fo:-2,  en:-8,  ha:-6, ti:-10},		
		con_tus_amigos: {fo:-2,  en:14,  ha:40, ti:30,		meme:'ultragay'},
		aliens:         {fo:-2,  en:-10, ha:10, ti:-40,		meme:'quemalote'},
	},

	estudiar : {
		fideos: 		{fo:-2, en:-2, 	ha:3,  	ti:-10,		meme:'picaron'},
		chorizo: 		{fo:-2, en:-2, 	ha:15, 	ti:-15,		meme:'ultragay'},
		una_hora: 		{fo:-2, en:-3, 	ha:5,  	ti:-60},
		seis_horas: 	{fo:-6, en:-20, ha:15, ti:-360,		meme:'nerd'},
		con_alguien: 	{fo:-4, en:-3, 	ha:10, 	ti:-80},
		a_alguien:  	{fo:-4, en:-6, 	ha:20, 	ti:-00,		meme:'youknowwhatimean'},
		con_tus_amigos: {fo:-5, en:-9, 	ha:10, 	ti:-80},
		matematicas: 	{fo:-5, en:-6,  ha:5, 	ti:-120,	meme:'nerd'},
		musica: 		{fo:-3, en:-4, 	ha:7, 	ti:-60},
		futbol: 		{fo:-3, en:-4,	ha:7, 	ti:-120},
		insultos: 		{fo:-4, en:-4, 	ha:10, ti:-20,		meme:'quemalote'},
		juegos: 		{fo:-3, en:-10,	ha:30, 	ti:-120,	meme:'fuckyea'},
		basura: 		{fo:-5, en:-12, ha:-19, ti:-15,		meme:'jackiechan'},
		una_pelicula: 	{fo:-2, en:-4, 	ha:7, 	ti:-120},
		aliens: 		{fo:-4, en:-5, ha:12, 	ti:-40,		meme:'aliens'}
	},

	jugar : {
		chorizo: 		{fo:05, en:-10, ha:15, 	ti:-20,		meme:'ultragay'},
		una_hora: 		{fo:-5, en:-6, 	ha:8, 	ti:-60},
		seis_horas: 	{fo:-20, en:-20,	ha:10, 	ti:-360},
		con_alguien: 	{fo:-2, en:-5, 	ha:8, 	ti:-30,		meme:'youknowwhatimean'},
		con_tus_amigos: {fo:-1, en:-6, 	ha:9, 	ti:-25},
		poker: 			{fo:-3, en:-2, 	ha:6, 	ti:-100},
		futbol: 		{fo:-4, en:-10,	ha:15, 	ti:-90},
		juegos: 		{fo:-2, en:-10,	ha:10, 	ti:-30}
	},

	escuchar : {
		una_hora: 		{fo:-2, en:00, 	ha:00, 	ti:-60},
		seis_horas: 	{fo:-10, en:-30,ha:00, 	ti:-360},
		a_alguien:  	{fo:-1, en:-3, 	ha:10, 	ti:-20},
		con_tus_amigos: {fo:0, en:0, 	ha:9, 	ti:-25},
		musica: 		{fo:-3, en:-1,	ha:15, 	ti:-30},
		insultos: 		{fo:-5, en:-5, 	ha:-20,	ti:-20,		meme:'jackiechan'},
		ruido: 			{fo:-1, en:-2, 	ha:-5, 	ti:-10},
		basura: 		{fo:-15, en:-4, ha:-10, ti:-20,		meme:'jackiechan'},
		una_pelicula: 	{fo:-3, en:-2, 	ha:10, 	ti:-120},
		aliens: 		{fo:-3, en:03, 	ha:10, 	ti:-30,		meme:'aliens'}
	},

	programar : {
		fideos: 		{fo:-2, en:00, 	ha:00, ti:-30,		meme:'jackiechan'},
		una_hora: 		{fo:-5, en:-3, 	ha:06, ti:-60},
		seis_horas: 	{fo:-12,en:-10, ha:23, ti:-120,		meme:'nerd'},
		con_alguien: 	{fo:-4, en:-2, 	ha:07, ti:-50},
		a_alguien:  	{fo:-5, en:-2, 	ha:04, ti:-30,		meme:'quemalote'},
		con_tus_amigos: {fo:-7, en:-3, 	ha:07, ti:-40},
		matematicas: 	{fo:-4, en:-3, 	ha:03, ti:-80},
		musica: 		{fo:-2, en:-2, 	ha:03, ti:-60,		meme:'fuckyea'},
		poker: 			{fo:-6, en:-2, 	ha:04, ti:-70,		meme:'fuckyea'},
		futbol: 		{fo:-6, en:-2, 	ha:05, ti:-70,		meme:'fuckyea'},
		insultos: 		{fo:-2, en:-2, 	ha:10, ti:-30,		meme:'quemalote'},
		ruido: 			{fo:-3, en:-3, 	ha:-15, ti:-20,		meme:'jackiechan'},
		juegos: 		{fo:-10, en:-10,ha:40, ti:-300,		meme:'fuckyea'},
		basura: 		{fo:-12, en:-4,	ha:-15, ti:-10,		meme:'jackiechan'},
		aliens: 		{fo:-6, en:-10, ha:20, ti:-10,		meme:'quemalote'}
	},

	observar : {
		fideos: 		{fo:-1, en:-1, 	ha:02, ti:-10,		meme:'ultragay'},
		chorizo: 		{fo:-10,en:-1, 	ha:15, ti:-20,		meme:'ultragay'},
		ensalada: 		{fo:-5, en:-2, 	ha:00, ti:-20},
		una_hora: 		{fo:-1, en:-1, 	ha:2, ti:-60},
		seis_horas: 	{fo:-5, en:-5, 	ha:10, ti:-360},
		a_alguien:  	{fo:-1, en:-1, 	ha:15, ti:-30,		meme:'picaron'},
		con_tus_amigos: {fo:-1, en:-1, 	ha:02, ti:-20},
		matematicas: 	{fo:-2, en:-2, 	ha:04, ti:-30,		meme:'nerd'},
		poker: 			{fo:-1, en:-1, 	ha:01, ti:-20},
		futbol: 		{fo:-7, en:-3, 	ha:10, ti:-90},
		ruido: 			{fo:-1, en:-2, 	ha:-6, ti:-10,		meme:'jackiechan'},
		juegos: 		{fo:-5, en:-2, 	ha:20, ti:-15},
		basura: 		{fo:-7, en:-3, 	ha:-6, ti:-10,		meme:'jackiechan'},
		una_pelicula: 	{fo:-5, en:-5, 	ha:10, ti:-120},
		aliens: 		{fo:-8, en:-4, 	ha:10, ti:-20,		meme:'aliens'}
	},

	usar : {
		fideos: 		{fo:13, en:-2, 	ha:07, ti:-20},
		chorizo: 		{fo:10, en:-4, 	ha:20, ti:-20,		meme:'ultragay'},
		ensalada: 		{fo:10, en:-2, 	ha:3, ti:-20},
		una_hora: 		{fo:-2, en:7, 	ha:00, ti:-60},
		seis_horas: 	{fo:-4, en:20, 	ha:00, ti:-360},
		a_alguien:  	{fo:-3, en:-3, 	ha:20, ti:-30,		meme:'youknowwhatimean'},
		matematicas: 	{fo:-2, en:-2, 	ha:03, ti:-10,		meme:'fuckyea'},
		musica: 		{fo:00, en:-2, 	ha:05, ti:-10},
		insultos: 		{fo:00, en:-10, ha:05, ti:-15,		meme:'quemalote'},
		juegos: 		{fo:00, en:-2, 	ha:15, ti:-60},
		basura: 		{fo:-10,en:-2, 	ha:00, ti:-20,		meme:'jackiechan'},
		una_pelicula: 	{fo:-2, en:-2, 	ha:08, ti:-120},
		drogas: 		{fo:-25, en:-25,ha:40, ti:-40,		meme:'quemalote'},
		aliens: 		{fo:-7, en:-7, ha:30, ti:-34,		meme:'fuckyea'}
	}
};
// --------------------= =--------------------
function GameRules()
{
	this.score = {
		food: 		100,
		energy: 	100,
		happiness: 	100,
		time: 		60 * 24 * 7 // one week
	};

	// when an action is evaluated, is stored here
	this.lastActionResult = {
		food: 		0,
		energy: 	0,
		happiness: 	0,
		time: 		0, 
		noun:       "",
		verb: 		""
	};

	this.gameOver = false;

	this._msToLeakHappiness = MS_TO_LEAK_HAPPINESS;

	this.currentVerb = null;
	this.currentNoun = null;

	// when some change has made, some parts of UI should be notified
	this._delegates = [];

	// ------= METHODS =------
	this.update = prototypeGameRules_update;
	this.evaluateAction = prototypeGameRules_evaluateAction;
	this.addVerb = prototypeGameRules_addVerb;
	this.addNoun = prototypeGameRules_addNoun;
	this.addDelegate = prototypeGameRules_addDelegate;
}
// --------------------= =--------------------
function prototypeGameRules_update(diff)
{
	this._msToLeakHappiness -= diff;
	this._msToLeakHappiness = Math.max(0,this._msToLeakHappiness); 

	if(this._msToLeakHappiness == 0) {
		this._msToLeakHappiness = MS_TO_LEAK_HAPPINESS;

		this.score.happiness -= 1.0;
		this.score.energy -= 1.4;

		this.score.happiness = Math.max(0,this.score.happiness);

		var i, l=this._delegates.length;
		for(i=0;i<l;i++)
			this._delegates[i].notifyScoreChange(this.score);
	}

	this.gameOver = (this.score.food <= 0 &&
					 this.score.energy <= 0 &&
					 this.score.happiness <= 0);
}
// --------------------= =--------------------
function prototypeGameRules_addVerb(verb)
{
	var i, l=this._delegates.length;

	if(this.currentVerb !== null) { // two verbs should be anulated 
		this.currentVerb = null;
		this.score.time -= PENALTY_TIME;
		// notify delegates
		for(i=0;i<l;i++)
			this._delegates[i].notifyActionCancelled();

		return;
	}

	this.currentVerb = verb;

	// notify delegates
	for(i=0;i<l;i++)
		this._delegates[i].notifyVerbAdded(verb);

	if(this.currentNoun !== null)
		this.evaluateAction();
}
// --------------------= =--------------------
function prototypeGameRules_addNoun(noun)
{
	var i, l=this._delegates.length;

	if(this.currentNoun !== null) { // two nouns should be anulated 
		this.currentNoun = null;
		this.score.time -= PENALTY_TIME;
		// notify delegates
		for(i=0;i<l;i++)
			this._delegates[i].notifyActionCancelled();

		return;
	}

	this.currentNoun = noun;
	for(i=0;i<l;i++)
		this._delegates[i].notifyNounAdded(noun);

	if(this.currentVerb !== null)
		this.evaluateAction();
}
// ---------------= =--------------
// ----------= GAME CORE =--------------------= GAME CORE =----------
// ----------= GAME CORE =--------------------= GAME CORE =----------
// ----------= GAME CORE =--------------------= GAME CORE =----------
// ----------= GAME CORE =--------------------= GAME CORE =----------
// ---------------= =--------------
function prototypeGameRules_evaluateAction()
{
	// HERE IS THE CORE!!: 
	var verb = POINTS_TABLE[this.currentVerb];

	var meme = null;

	if(this.currentNoun in verb) {
		this.score.food += verb[this.currentNoun].fo;
		this.score.energy += verb[this.currentNoun].en;
		this.score.happiness += verb[this.currentNoun].ha;

		this.score.time += verb[this.currentNoun].time;

		if('meme' in verb[this.currentNoun])
			meme = verb[this.currentNoun].meme;
	}
	else {
		this.score.time -= PENALTY_TIME;
		this.score.happiness -= PENALTY_HAPPINESS;
		this.score.energy -= PENALTY_ENERGY;
		this.score.food -= PENALTY_FOOD;

		meme = 'impossibru';
	}

	this.score.food = Math.max(0,Math.min(100, this.score.food));
	this.score.energy = Math.max(0,Math.min(100,this.score.energy));
	this.score.happiness = Math.max(0,Math.min(100,this.score.happiness));

	this.gameOver = (this.score.food <= 0 &&
					 this.score.energy <= 0 &&
					 this.score.happiness <= 0);

	this.lastActionResult.verb = this.currentVerb;
	this.lastActionResult.noun = this.currentNoun;

	var i, l=this._delegates.length;
	for(i=0;i<l;i++){
		this._delegates[i].notifyActionEvaluated(this.score, meme);
	}

	this.currentVerb = null
	this.currentNoun = null;


}
// --------------------= =--------------------
function prototypeGameRules_addDelegate(delegate)
{
	this._delegates.push(delegate);
}
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------