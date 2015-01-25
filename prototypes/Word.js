var PADDING_VERTICAL = 7;
var PADDING_HORIZONTAL = 20;
var DEATH_MARGIN_THRESHOLD = 300;
// --------------------= =--------------------
function Word(x,y,word)
{
	Transformable.call(this,x,y);

	this._word = word;
	this.angularVelocity=generateRandom(-Math.PI/8, Math.PI/8);
	this.angle = generateRandom(0,Math.PI/4);
	this.velocity= generateRandom(0,50);
	this.alpha = 1.0;

	this.bgColor = COLORS_TABLE[word];

	var movAngle = generateRandom(0,2*Math.PI);
	this.setDirection(Math.cos(movAngle),Math.sin(movAngle));

	this.width = this._word.length * LETTER_WIDTH + 2*PADDING_HORIZONTAL + (LETTER_HEIGHT + 2*PADDING_VERTICAL);
	this.height = LETTER_HEIGHT + 2*PADDING_VERTICAL + 14; 

	this.isDying = false;

	/// ----- METHODS
	this.isDead = prototypeWord_isDead;
	this.explode = prototypeWord_explode;
	this.update = prototypeWord_update;
}
// --------------------= =--------------------
function prototypeWord_update(diff)
{
	var factor = diff/1000.0;

	this.pos.x += this.velocity * this._mov.x * factor;
	this.pos.y += this.velocity * this._mov.y * factor;

	if(this.isDying)
		this.alpha = Math.max(0,this.alpha - 0.04);

	this.angle += this.angularVelocity * factor;
}
// --------------------= =--------------------
function prototypeWord_isDead()
{
	var bb = this.getBoundingBox();
	var c = this.engine.camera;

	if(bb.x + bb.w < c.min.x - DEATH_MARGIN_THRESHOLD) return true;

	if(bb.x > this.engine.camera.max.x + DEATH_MARGIN_THRESHOLD) return true;

	if(bb.y + bb.h < c.min.y - DEATH_MARGIN_THRESHOLD) return true;

	if(bb.y > c.max.y + DEATH_MARGIN_THRESHOLD) return true;

	return (this.alpha <= 0.0);
}
// --------------------= =--------------------
function prototypeWord_explode()
{
	this.isDying = true;

	bb = this.getBoundingBox();

	var i,x,y;
	for(i=0;i<this._word.length;i++){
		this.engine.addElement(new DyingLetter(generateRandom(bb.x,bb.x+bb.w),generateRandom(bb.y,bb.y+bb.h),this._word[i]));
		this.engine.addElement(new DyingLetter(generateRandom(bb.x,bb.x+bb.w),generateRandom(bb.y,bb.y+bb.h),this._word[i]));
		this.engine.addElement(new DyingLetter(generateRandom(bb.x,bb.x+bb.w),generateRandom(bb.y,bb.y+bb.h),this._word[i]));
		this.engine.addElement(new DyingLetter(generateRandom(bb.x,bb.x+bb.w),generateRandom(bb.y,bb.y+bb.h),this._word[i]));
	}

	this.angularVelocity = 300;
}
// --------------------= =--------------------