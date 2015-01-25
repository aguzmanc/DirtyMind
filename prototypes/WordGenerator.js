var WORD_GENERATION_DISTANCE_THRESHOLD = 100;
var WORD_GENERATION_DISTANCE_FROM_MARGIN = 100;
// --------------------= =--------------------
function WordGenerator(brain)
{
	Transformable.call(this,0,0);

	this._brain = brain;

	this._lastPos = {
		x:this._brain.pos.x,
		y:this._brain.pos.y
	};

	// ----= METHODS =----
	this.update = prototypeWordGenerator_update;

	this.generateWord = prototypeWordGenerator_generateWord;
	this.drawSprite = function(diff){};
}
// --------------------= =--------------------
function prototypeWordGenerator_update(diff)
{
	var c = this.engine.camera;
	var x,y;

	// check horizontal movement
	if(Math.abs(this._brain.pos.x - this._lastPos.x) > WORD_GENERATION_DISTANCE_THRESHOLD){
		if(this._brain.pos.x > this._lastPos.x) // moving to right
			x = c.max.x + WORD_GENERATION_DISTANCE_FROM_MARGIN;
		else// moving to left
			x = c.min.x - WORD_GENERATION_DISTANCE_FROM_MARGIN;

		y = generateRandom(c.min.y, c.max.y);

		this._lastPos.x = this._brain.pos.x;

		this.generateWord(x,y);
	}

	// check vertical movement
	if(Math.abs(this._brain.pos.y - this._lastPos.y) > WORD_GENERATION_DISTANCE_THRESHOLD){
		if(this._brain.pos.y > this._lastPos.y) // moving upwards
			y = c.max.y + WORD_GENERATION_DISTANCE_FROM_MARGIN;
		else
			y = c.min.y - WORD_GENERATION_DISTANCE_FROM_MARGIN;

		x = generateRandom(c.min.x, c.max.x);

		this._lastPos.y = this._brain.pos.y;

		this.generateWord(x,y);
	}
}
// --------------------= =--------------------
function prototypeWordGenerator_generateWord(x,y)
{
	var verbsLength = VERBS_TABLE.length;
	var verbIdx = generateIntRandom(0,verbsLength-1);
	var nounsLength = NOUNS_TABLE.length;
	var nounIdx = generateIntRandom(0,nounsLength-1);

	if(generateIntRandom(0,1) == 0)
		this.engine.addVerb(new Verb(x,y,VERBS_TABLE[verbIdx]));
	else 
		this.engine.addNoun(new Noun(x,y,NOUNS_TABLE[nounIdx]));
}
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
