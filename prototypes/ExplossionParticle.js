// --------------------= =--------------------
function ExplossionParticle(x,y,imageSource)
{
	Transparent.call(this,x,y,1.0);

	this.imgSprite.src = imageSource;

	this._alphaDecay = generateRandom(0.05, 0.1);
	this.velocity = generateRandom(100,700);
	this.angularVelocity = generateRandom(Math.PI, Math.PI*2);

	var angleDir = generateRandom(0,Math.PI*2.0);
	this.setDirection(Math.cos(angleDir),Math.sin(angleDir));

	this.scale = 0.1;

	// ----= METHODS =-----
	this.update = prototypeExplossionParticle_update;
	this.isDead = prototypeExplossionParticle_isDead;
}
// --------------------= =--------------------
function prototypeExplossionParticle_update(diff)
{
	var factor = diff/1000.0;

	this.pos.x += this.velocity * this._mov.x * factor;
	this.pos.y += this.velocity * this._mov.y * factor;

	this.alpha = this.alpha - this._alphaDecay;
	this.alpha = Math.max(0,this.alpha);

	this.scale += 0.1;

	this.angle += this.angularVelocity * factor;
}
// --------------------= =--------------------
function prototypeExplossionParticle_isDead()
{
	return (this.alpha <= 0);
}
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------