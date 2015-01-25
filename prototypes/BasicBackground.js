// --------------------= =--------------------
function BasicBackground()
{
	Transformable.call(this,0,0);

	this.PANELSIZE = 400;

	this.patternCreated = false;
	this._fillStyle = null;
	this.imgSprite.src = 'img/bg.png';

	// ----------= OVERRIDE METHODS =----------
	this.draw = prototypeBasicBackground_draw;

	// ----------= NEW METHODS =----------
}
// --------------------= =--------------------
function prototypeBasicBackground_draw(ctx)
{
	if(false == this.patternCreated){
		this.patternCreated = true;
		this._fillStyle = ctx.createPattern(this.imgSprite,'repeat');
	}

	ctx.fillStyle = this._fillStyle;

	// var wv = engine.worldVector;
	var MAX_DIST_FACTOR=100;
	var wv = {
		x: engine.worldVector.x*MAX_DIST_FACTOR,
		y: engine.worldVector.y*MAX_DIST_FACTOR
	};

	var minx = parseInt((wv.x/MAX_DIST_FACTOR - CANVAS_WIDTH/2)/this.PANELSIZE) - ((wv.x/MAX_DIST_FACTOR - CANVAS_WIDTH/2) < 0.0 ? 1 : 0 );
	var maxx = parseInt((wv.x/MAX_DIST_FACTOR + CANVAS_WIDTH/2)/this.PANELSIZE) - ((wv.x/MAX_DIST_FACTOR+ CANVAS_WIDTH/2) < 0.0 ? 1 : 0 );

	var miny = parseInt((wv.y/MAX_DIST_FACTOR - CANVAS_HEIGHT/2)/this.PANELSIZE) - ((wv.y/MAX_DIST_FACTOR - CANVAS_HEIGHT/2) < 0.0 ? 1 : 0 );
	var maxy = parseInt((wv.y/MAX_DIST_FACTOR + CANVAS_HEIGHT/2)/this.PANELSIZE) - ((wv.y/MAX_DIST_FACTOR + CANVAS_HEIGHT/2) < 0.0 ? 1 : 0 );

	var x,y;
	for(x=minx;x<=maxx;x++)
		for(y=miny;y<=maxy;y++)
			ctx.fillRect(x*this.PANELSIZE - 3, y*this.PANELSIZE-3, this.PANELSIZE+3, this.PANELSIZE+3);

	ctx.save();
	ctx.globalAlpha = 0.3;
	ctx.fillStyle = "#FFFFFF";
	for(var i=0;i<100;i++)
		for(var k=0;k<100;k++)
			ctx.fillRect(-wv.x/100 + 200*i - 5000,-wv.y/100 + 200*k - 5000,20,20);

	ctx.globalAlpha = 0.2;
	for(var i=0;i<100;i++)
		for(var k=0;k<100;k++)
			ctx.fillRect(-wv.x/500 + 200*i - 5000,-wv.y/500 + 200*k - 5000,10,10);

	ctx.restore();
}
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------
// --------------------= =--------------------