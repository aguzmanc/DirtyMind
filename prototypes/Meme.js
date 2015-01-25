var MEME_DATA={
	impossibru:{
		img:'img/impossibru.png',
		width:200,
		height:230
	},

	aliens:{
		img:'img/aliens.png',
		width:200,
		height:193
	},

	ultragay:{
		img:'img/ultragay.png',
		width:200,
		height:200
	},

	fuckyea:{
		img:'img/fuckyea.png',
		width:200,
		height:200
	}, 

	jackiechan:{
		img:'img/jackiechan.png',
		width:200,
		height:193
	}, 

	youknowwhatimean:{
		img:'img/youknowwhatimean.png',
		width: 200,
		height: 192
	}, 

	picaron:{
		img:'img/picaron.png',
		width: 200,
		height: 183
	}, 

	quemalote:{
		img:'img/quemalote.png',
		width: 200,
		height: 195
	}, 

	nerd:{
		img:'img/nerd.png',
		width: 200,
		height: 163
	}, 

	troll:{
		img:'img/troll.png',
		width: 200,
		height: 163
	}, 
}
// --------------------= =--------------------
function Meme(key)
{
	Transformable.call(this,0,0);

	this.imgSprite.src = MEME_DATA[key].img;
	this.width = MEME_DATA[key].width;
	this.height = MEME_DATA[key].height;

	this._showFactor = 0;
	this.angularVelocity=0;
	this.velocity = 600;
	this.setDirection(0,1);
	this.pos.x = CANVAS_WIDTH - this.width;
	this.pos.y = -this.height;
	this._showing = false;
	this._hiding = false;
	this._msShow = 1000;

	/// ----- METHODS
	this.update = prototypeMeme_update;
	this.draw = function(c){};// without normal drawing
	// this.drawSprite = prototypeMeme_drawSprite;
	this.drawScreenInfo = prototypeMeme_drawScreenInfo;
	this.isDead = prototypeMeme_isDead;
}
// --------------------= =--------------------
// --------------------= =--------------------
function prototypeMeme_update(diff)
{
	var factor = diff/1000.0;

	this.pos.y += this.velocity * this._mov.y * factor;

	if(this.pos.y >= 0 && !this._showing){
		this._showing = true;
		this.velocity = 0;
	}

	if(this._showing){
		this._msShow -= diff;
		this._msShow = Math.max(0,this._msShow);

		if(this._msShow==0){
			this._showing = false;
			this._hiding = true;
			this.velocity = 400;
			this.setDirection(0,-1);
		}
	}
}
// --------------------= =--------------------
function prototypeMeme_drawScreenInfo(ctx)
{
	ctx.save();
	ctx.translate(0,this.pos.y + this.height);
	ctx.scale(1.0,-1.0);

	ctx.drawImage(
		this.imgSprite,
		0, 0,
		this.width, this.height);

	ctx.restore();
}

// --------------------= =--------------------
function prototypeMeme_isDead(diff)
{
	return (this.pos.y < this.pos.height && this._hiding);
}
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------