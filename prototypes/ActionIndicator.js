var ACTION_WORD_SCALE_FACTOR=1.3;
var MS_SHOW_RESULTS = 2000;
// ---------------------= =---------------------
function ActionIndicator()
{
	Transformable.call(this,0,0);

	this.tag = 'action_indicator';

	this.verb = null;
	this.noun = null;

	this._verbPosFactor = 0;
	this._nounPosFactor = 0;

	this._elements = [];

	this._movingVerb = false;
	this._movingNoun = false;
	this._finalizedVerbMovement = false;
	this._finalizedNounMovement = false;

	this._showingResults = false;
	this._msShowingResults = 0;

	// save last score to compare
	this._lastFood=100;
	this._lastEnergy=100;
	this._lastHappiness=100;

	// ------= METHODS =------
	this.update = prototypeActionIndicator_update;
	this.drawScreenInfo = prototypeActionIndicator_drawScreenInfo;	
	this.drawSprite = function(c){};
	this.addElement = prototypeActionIndicator_addElement;

	// ------= DELEGATE HANDLING =------
	this.notifyVerbAdded = prototypeActionIndicator_notifyVerbAdded;
	this.notifyNounAdded = prototypeActionIndicator_notifyNounAdded;
	this.notifyActionEvaluated = prototypeActionIndicator_notifyActionEvaluated;
	this.notifyActionCancelled = prototypeActionIndicator_notifyActionCancelled;
	this.notifyScoreChange = prototypeActionIndicator_notifyScoreChange;
}
// ---------------------= =---------------------
// ---------------------= =---------------------
function prototypeActionIndicator_update(diff)
{

	if(this._movingVerb){
		this._verbPosFactor += diff/300;
		this._verbPosFactor = Math.min(1.0,this._verbPosFactor);

		if(this._verbPosFactor==1.0){
			this._finalizedVerbMovement = true;
			this._movingVerb = false;
		}
	}

	if(this._movingNoun){
		this._nounPosFactor += diff/300;
		this._nounPosFactor = Math.min(1.0,this._nounPosFactor);

		if(this._nounPosFactor == 1.0){
			this._finalizedNounMovement = true;
			this._movingNoun = false;
		}
	}

	if(this._showingResults)
	{
		this._msShowingResults -= diff;
		this._msShowingResults = Math.max(0,this._msShowingResults);

		if(this._msShowingResults == 0){
			this._showingResults = false;

			this.verb = null;
			this._verbPosFactor = 0;
			this._finalizedVerbMovement = false;
			this._movingVerb = false;

			this.noun = null;
			this._nounPosFactor = 0;
			this._finalizedNounMovement = false;
			this._movingNoun = false;
		}
	}

	// --- UPDATE EXTRA ELEMENTS
	var i,l = this._elements.length;
	for(i=0;i<l;i++){
		this._elements[i].update(diff);
	}
}
// ---------------------= =---------------------
function prototypeActionIndicator_drawScreenInfo(ctx)
{
	// inner
	ctx.globalAlpha=0.6;
	ctx.fillStyle = '#000000';
	ctx.fillRect(5,5,CANVAS_WIDTH-10,80);
	ctx.globalAlpha = 1.0;
	// margin
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#FFFFFF';
	ctx.strokeRect(5,5,CANVAS_WIDTH-10,80);

	ctx.fillStyle='white';
	ctx.font="40px Monospace";

	if(this.engine.rules.gameOver) {
		ctx.save();
		ctx.scale(1.0,-1.0);
		ctx.fillText("G-A-M-E   O-V-E-R",100,-30);
		ctx.restore();	

		return;
	}

	// draw verb!!
	var minx,maxx;

	if(this.verb !== null){
		minx = - this.verb.width/2;
		maxx = CANVAS_WIDTH/(2*ACTION_WORD_SCALE_FACTOR) - this.verb.width/2 + 20;

		ctx.save();
		ctx.scale(1.0,-1.0);
		ctx.scale(ACTION_WORD_SCALE_FACTOR,ACTION_WORD_SCALE_FACTOR);
		ctx.translate(
			minx + this._verbPosFactor * (maxx - minx),
			-this.verb.height/ACTION_WORD_SCALE_FACTOR);
		this.verb.drawSprite(ctx);
		ctx.restore();
	}
	
	if(this.noun !== null){
		minx = (CANVAS_WIDTH/ACTION_WORD_SCALE_FACTOR) + this.noun.width/2;
		maxx = CANVAS_WIDTH/(2*ACTION_WORD_SCALE_FACTOR) + this.noun.width/2;

		// draw noun!!
		ctx.save();
		ctx.scale(1.0,-1.0);
		ctx.scale(ACTION_WORD_SCALE_FACTOR,ACTION_WORD_SCALE_FACTOR);
		ctx.translate(
			minx + this._nounPosFactor * (maxx - minx),
			-this.noun.height/ACTION_WORD_SCALE_FACTOR);
		this.noun.drawSprite(ctx);
		ctx.restore();	
	}

	// --- DRAW EXTRA EFFECTS
	var i,l = this._elements.length;
	for(i=0;i<l;i++){
		this._elements[i].draw(ctx);
	}

	if(this.verb==null && this.noun==null) {
		ctx.save();
		ctx.scale(1.0,-1.0);
		ctx.fillText("WHAT DO WE DO NOW?",100,-30);
		ctx.restore();	
	}
}
// ---------------------= =---------------------
function prototypeActionIndicator_addElement(element)
{
	this._elements.push(element);
}
// ---------------------= =---------------------
// ---------------------= DELEGATE HANDLING =---------------------
// ---------------------= DELEGATE HANDLING =---------------------
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeActionIndicator_notifyVerbAdded(verb)
{
	if(this._showingResults)
		this.noun = null;

	this.verb = null; // dispose first
	this.verb = new Verb(0,0,verb);
	this._verbPosFactor = 0.0;
	this._finalizedVerbMovement = false;
	this._movingVerb = true;

	this._showingResults = false;
	this._msShowingResults = 0;
}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeActionIndicator_notifyNounAdded(noun)
{
	if(this._showingResults)
		this.verb = null;

	this.noun = null; // dispose first
	this.noun = new Noun(0,0,noun);
	this._nounPosFactor = 0.0;
	this._finalizedNounMovement = false;
	this._movingNoun = true;

	this._showingResults = false;
	this._msShowingResults = 0;
}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeActionIndicator_notifyActionEvaluated(score, meme)
{
	var c = this.engine.camera;

	var i;
	for(i=0;i<20;i++){
		var p = new ExplossionParticle(CANVAS_WIDTH/2,60,'img/star.png');
		p.scale = 0.1;
		this.addElement(p);	
	}

	this._msShowingResults = MS_SHOW_RESULTS;
	this._showingResults = true;

	if(meme !== null){
		this.engine.addElement(new Meme(meme));
	}
}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeActionIndicator_notifyActionCancelled()
{
	var i,k;
	if(this.verb !== null){
		for(i=0;i<50;i++){
			var d = new DyingLetter(CANVAS_WIDTH/3,50,'');
			d._alphaDecay = 0.05;
			d.color = COLORS_TABLE[this.verb._word];
			d.drawSprite = function(ctx)
			{
				ctx.save();
				ctx.scale(1.0,-1.0);
				ctx.fillStyle = this.color;
				ctx.fillRect(-LETTER_WIDTH/2,LETTER_HEIGHT/2,10,10);
				ctx.restore();
			};

			this.addElement(d);
		}	
	}

	if(this.noun !== null){
		for(i=0;i<50;i++){
			var d = new DyingLetter(CANVAS_WIDTH/3 + CANVAS_WIDTH/3 ,50,'');
			d._alphaDecay = 0.05;
			d.color = COLORS_TABLE[this.noun._word];
			d.drawSprite = function(ctx)
			{
				ctx.save();
				ctx.scale(1.0,-1.0);
				ctx.fillStyle = this.color;
				ctx.fillRect(-LETTER_WIDTH/2,LETTER_HEIGHT/2,10,10);
				ctx.restore();
			};

			this.addElement(d);
		}	
	}
	
	this.verb = null;
	this._verbPosFactor = 0;
	this._finalizedVerbMovement = false;
	this._movingVerb = false;

	this.noun = null;
	this._nounPosFactor = 0;
	this._finalizedNounMovement = false;
	this._movingNoun = false;

	this._showingResults = false;
	this._msShowingResults = 0;
}
// ---------------------= =---------------------
function prototypeActionIndicator_notifyScoreChange(score)
{
	if(this._lastHappiness>0 && score.happiness<=0 || 
	   this._lastEnergy > 0 && score.energy <=0 ||
	   this._lastFood > 0 && score.food <= 0 )
		this.engine.addElement(new Meme('troll'));

	this._lastHappiness = score.happiness;
	this._lastEnergy = score.energy;
	this._lastFood = score.food;
}
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------