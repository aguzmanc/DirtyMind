// --------------------= =--------------------
function ParallaxBackground()
{
	Transformable.call(this,0,0);

	this.PANELSIZE = 400;

	this.patternCreated = false;
	this._fillStyle = null;
	this.imgSprite.src = 'img/bg.png';

	// ----------= OVERRIDE METHODS =----------
	this.draw = prototypeParallaxBackground_draw;
}
// --------------------= =--------------------
function prototypeParallaxBackground_draw(ctx)
{
	var wv = this.engine.worldVector;
	var c = this.engine.camera;

	ctx.fillStyle = "#0C4189";
	ctx.fillRect(c.min.x,c.min.y,CANVAS_WIDTH,CANVAS_HEIGHT);

	ctx.save();
	ctx.globalAlpha = 0.3;
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(wv.x/100,wv.y/100,10,10);
	ctx.restore();

	// var minx = parseInt((wv.x - CANVAS_WIDTH/2)/this.PANELSIZE) - ((wv.x - CANVAS_WIDTH/2) < 0.0 ? 1 : 0 );
	// var maxx = parseInt((wv.x + CANVAS_WIDTH/2)/this.PANELSIZE) - ((wv.x + CANVAS_WIDTH/2) < 0.0 ? 1 : 0 );

	// var miny = parseInt((wv.y - CANVAS_HEIGHT/2)/this.PANELSIZE) - ((wv.y - CANVAS_HEIGHT/2) < 0.0 ? 1 : 0 );
	// var maxy = parseInt((wv.y + CANVAS_HEIGHT/2)/this.PANELSIZE) - ((wv.y + CANVAS_HEIGHT/2) < 0.0 ? 1 : 0 );

	// var x,y;
	// for(x=minx;x<=maxx;x++)
	// 	for(y=miny;y<=maxy;y++)
	// 		ctx.fillRect(x*this.PANELSIZE - 3, y*this.PANELSIZE-3, this.PANELSIZE+3, this.PANELSIZE+3);
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