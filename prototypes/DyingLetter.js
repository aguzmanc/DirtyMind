var LETTER_WIDTH = 12;
var LETTER_HEIGHT = 15;
// --------------------= =--------------------
function DyingLetter(x,y,letter)
{
	Transparent.call(this,x,y,1.0);

	this._letter = letter;

	this._alphaDecay = generateRandom(0.05, 0.1);
	this.velocity = generateRandom(100,700);
	this.angularVelocity = generateRandom(Math.PI, Math.PI*19);

	var angleDir = generateRandom(0,Math.PI*2.0);
	this.setDirection(Math.cos(angleDir),Math.sin(angleDir));

	this.scale = 0.1;
	this.letterColor = "#FFFFFF";

	// ----= METHODS =-----
	this.drawSprite = prototypeDyingLetter_drawSprite;
	this.update = prototypeDyingLetter_update;
	this.isDead = prototypeDyingLetter_isDead;
}
// --------------------= =--------------------
function prototypeDyingLetter_update(diff)
{
	var factor = diff/1000.0;

	this.pos.x += this.velocity * this._mov.x * factor;
	this.pos.y += this.velocity * this._mov.y * factor;

	this.alpha = this.alpha - this._alphaDecay;
	this.alpha = Math.max(0,this.alpha);

	this.scale += 0.2;

	this.angle += this.angularVelocity * factor;
}
// --------------------= =--------------------
function prototypeDyingLetter_drawSprite(ctx)
{
	ctx.save();
	ctx.scale(1.0,-1.0);

	ctx.fillStyle = this.letterColor;
	ctx.font="20px Monospace";
	ctx.fillText(this._letter,
		-LETTER_WIDTH/2,
		LETTER_HEIGHT/2);

	ctx.restore();
}
// --------------------= =--------------------
function prototypeDyingLetter_isDead()
{
	return (this.alpha <= 0);
}
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------