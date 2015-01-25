// --------------------= =--------------------
function Brain()
{
	Transformable.call(this,0,0);

	this.MAX_VELOCITY = 331;

	this.imgSprite.src = 'img/brain.png';
	this.width=252;
	this.height=272;
	this.scale=0.3;

	this._accelerationVector = {x:0.0,y:0.0};
	this.acceleration = 405; // fixed for this Brain

	this.isImpulsed = false;
	this._millisecondsToLostImpulse = 0.0;
	this._movements = null;

	this.tag='brain';
	this._hit = false;

	// --------= NEW METHODS =----
	this.update = prototypeBrain_update;
	this.draw = prototypeBrain_draw;
	this.drawSprite = prototypeBrain_drawSprite;
	this.setAccelerationVector = prototypeBrain_setAccelerationVector;
	this.setImpulse = prototypeBrain_setImpulse;
	this.setMovementsObject = prototypeBrain_setMovementsObject;

	this.drawBoundingBox = prototypeBrain_drawBoundingBox;
}
// --------------------= =--------------------
function prototypeBrain_update(diff)
{
	if(this.engine.rules.gameOver) return;

	if(this.engine.rules.score.happiness <=0)
		this.scale = 1.4;
	else
		this.scale = 0.3;

	// retrieve score
	var score = this.engine.rules.score;

	// synchronize with action movements first
	if(this._movements.up || this._movements.down || this._movements.right || this._movements.left){
		var x=0,y=0;
		if(this._movements.up) y=1;
		if(this._movements.down) y=-1;
		if(this._movements.left) x=-1;
		if(this._movements.right) x = 1;

		// WHEN NO FOOD, DIRECTION REVERTS
		if(score.food<=0)
			this.setImpulse(-x,-y);
		else
			this.setImpulse(x,y); // normal movement
	}

	// first check if ship is being impulsed
	this._millisecondsToLostImpulse -= diff;
	this._millisecondsToLostImpulse = Math.max(0, this._millisecondsToLostImpulse);

	if(this._millisecondsToLostImpulse==0)
		this.isImpulsed = false;

	var factor = diff/1000.0;

	if(this.isImpulsed) {
		if(score.energy<=0)
			this.velocity =  90

		// apply acceleration
		var velx = this._mov.x * this.velocity;
		var vely = this._mov.y * this.velocity;

		velx += this._accelerationVector.x * this.acceleration * factor;
		vely += this._accelerationVector.y * this.acceleration * factor;

		this.velocity = Math.sqrt(velx*velx + vely*vely);

		this._mov.x = velx/this.velocity;
		this._mov.y = vely/this.velocity;

		// when movement is applied, check max velocity
		this.velocity = Math.min(this.MAX_VELOCITY, this.velocity);
	}
	else {
		// if not impulsed, should be disaccelerate and
		// try to reach velocity = 0
		this.setAccelerationVector(0,0);

		var DISACCELERATION = 10.0;

		this.velocity -= DISACCELERATION * factor;
		this.velocity = Math.max(0,this.velocity);
	}

	// angle when brain is moving
	this.angle = Math.atan2(this._mov.x, this._mov.y);

	// position
	this.pos.x += this.velocity * this._mov.x * factor;
	this.pos.y += this.velocity * this._mov.y * factor;

	// World Vector is the same as the position of the brain
	// so, the brain is always in the middle
	// T.O.D.O: Implement some kind of "try to be in the middle"
	// according to brain movements
	// to improve effect of reality
	this.engine.worldVector.x = this.pos.x;
	this.engine.worldVector.y = this.pos.y;


	var nouns = this.engine.nouns,
	    verbs = this.engine.verbs;
	var i;
	for(i=0;i<nouns.length;i++){
		if(nouns[i].isDying) continue;
		if(this.collidesWith(nouns[i])){
			nouns[i].explode();

			this.engine.rules.addNoun(nouns[i]._word);

			break; // one noun at a time
		}
	}

	for(i=0;i<verbs.length;i++){
		if(verbs[i].isDying) continue;
		if(this.collidesWith(verbs[i])){
			verbs[i].explode();
			this.engine.rules.addVerb(verbs[i]._word);
			break; // one verb at a time
		}
	}
}
// --------------------= =--------------------
function prototypeBrain_draw(context)
{
	// normal drawing
	context.save();

	context.translate(this.pos.x, this.pos.y);
	context.rotate(this.angle);
	context.scale(this.scale,-this.scale); // reverse Y scale (to draw sprite with library)

	this.drawSprite(context);

	context.restore();
}
// --------------------= =--------------------
function prototypeBrain_drawSprite(context)
{
	context.drawImage(
		this.imgSprite,
		-this.width/2, -this.height/2,
		this.width, this.height);
}
// --------------------= =--------------------
function prototypeBrain_drawBoundingBox(context)
{
	var bb = this.getBoundingBox();

	context.strokeStyle = this._hit?'#FF0000':'#00FF00';// red or green

	context.lineWidth=2;
	context.strokeRect(bb.x,bb.y,bb.w,bb.h);
}
// --------------------= =--------------------
function prototypeBrain_setAccelerationVector(x,y)
{
	var v = Math.sqrt(x*x + y*y);
	this._accelerationVector.x = x/v;
	this._accelerationVector.y = y/v;
}
// --------------------= =--------------------
function prototypeBrain_setImpulse(x,y)
{
	this.setAccelerationVector(x,y);
	this.isImpulsed = true;

	var IMPULSE_MILLISECONDS = 200;
	this._millisecondsToLostImpulse = IMPULSE_MILLISECONDS;
}
// --------------------= =--------------------
function prototypeBrain_setMovementsObject(movements)
{
	this._movements = movements;
}
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------