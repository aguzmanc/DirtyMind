var STATUS_BAR_WIDTH = 20;
var STATUS_BAR_HEIGHT = 200;
var STATUS_BAR_PADDING = 6;
var STATUS_BAR_ICON_SIZE = 20;
// ------------------------
function StatusIndicator()
{
	Transformable.call(this,0,0);

	this.tag = 'status_indicator';

	this._food = 100;
	this._energy = 100.0;
	this._happiness = 100;
	this._time = 60 * 24 * 7; // one week

	this._imgBrainNormal = new Image();
	this._imgBrainNormal.src = 'img/brain_normal.png';

	this._imgBrainDamaged = new Image();
	this._imgBrainDamaged.src = 'img/brain_damaged.png';

	this._imgBrainDead = new Image();
	this._imgBrainDead.src = 'img/brain_dead.png';

	this._imgBrainWorried = new Image();
	this._imgBrainWorried.src = 'img/brain_worried.png';

	// ---= METHODS =---
	this.drawScreenInfo = prototypeStatusIndicator_drawScreenInfo;
	this.drawSprite = function(c){};
	this.drawStatusBar = prototypeStatusIndicator_drawStatusBar;

	// ---= DELEGATES =---
	this.notifyVerbAdded = prototypeStatusIndicator_notifyVerbAdded;
	this.notifyNounAdded = prototypeStatusIndicator_notifyNounAdded;
	this.notifyActionEvaluated = prototypeStatusIndicator_notifyActionEvaluated;
	this.notifyActionCancelled = prototypeStatusIndicator_notifyActionCancelled;
	this.notifyScoreChange = prototypeStatusIndicator_notifyScoreChange;
}
// ------------------------
function prototypeStatusIndicator_drawScreenInfo(ctx)
{
	var hap = Math.max(0,Math.min(100,this._happiness));
	var ene = Math.max(0,Math.min(100,this._energy));
	var food = Math.max(0,Math.min(100,this._food));

	this.drawStatusBar(ctx,20, hap,	"felicidad", 'img/happiness.png');
	this.drawStatusBar(ctx,80, ene,	"energia", 'img/hearth_icon.png');
	this.drawStatusBar(ctx,140,food,"comida", 'img/food.png');

	// DRAW BRAIN MOOD
	var img = this._imgBrainNormal;

	if(hap<35 || ene<35 || food<35)
		img = this._imgBrainWorried;
	
	if(hap<=0 || ene<=0 || food<=0)
		img = this._imgBrainDamaged;

	if(hap<=0 && ene<=0 && food<=0)
		img = this._imgBrainDead

	ctx.save();
	ctx.translate(CANVAS_WIDTH-120,CANVAS_HEIGHT-240);
	ctx.scale(1.0,-1.0);
	ctx.drawImage(img,0,0);
	ctx.restore();
}
// ------------------------
function prototypeStatusIndicator_drawStatusBar(ctx,rightOffset,score,legend,imgSource)
{
	score = Math.max(0,Math.min(100,score));
	var factor = score/100.0;

	var x = CANVAS_WIDTH - STATUS_BAR_WIDTH - rightOffset;
	var y = CANVAS_HEIGHT - STATUS_BAR_HEIGHT - 30;

	// DRAW LEGEND
	ctx.fillStyle = "#FFFFFF";
	ctx.font="15px Monospace";
	ctx.save();
	ctx.translate(x+STATUS_BAR_WIDTH+5,y+STATUS_BAR_HEIGHT);
	ctx.scale(1.0,-1.0);
	ctx.rotate(Math.PI/2);
	ctx.fillText(legend,0,0);
	ctx.restore();

	// DRAW ICON
	ctx.save();
	ctx.translate(x,y+STATUS_BAR_HEIGHT+STATUS_BAR_ICON_SIZE+5);
	ctx.scale(1.0,-1.0);
	var img = new Image();
	img.src = imgSource;
	
	ctx.drawImage(img,0,0,STATUS_BAR_ICON_SIZE,STATUS_BAR_ICON_SIZE);
	ctx.restore();

	// outer container
	ctx.fillStyle = (score==0?'#FF0000':'#000000');
	ctx.fillRect(x,y,STATUS_BAR_WIDTH, STATUS_BAR_HEIGHT);
	ctx.strokeStyle = "#FFFFFF";
	ctx.strokeRect(x,y,STATUS_BAR_WIDTH, STATUS_BAR_HEIGHT);

	var gg = "00" + (parseInt(factor*255).toString(16)).substr(-2);
	gg = (gg).substr(-2);

	var rr = "00" + (parseInt((1.0-factor)*255).toString(16)).substr(-2);
	rr = (rr).substr(-2);

	// inner data
	x = x+STATUS_BAR_PADDING;
	y = y+STATUS_BAR_PADDING;
	ctx.fillStyle = '#' + rr +gg+'00';
	ctx.fillRect(x,y,STATUS_BAR_WIDTH - 2*STATUS_BAR_PADDING, (STATUS_BAR_HEIGHT - 2*STATUS_BAR_PADDING)*factor);
}
// ------------------------
// ------------------------
// ---------------------= DELEGATE HANDLING =---------------------
// ---------------------= DELEGATE HANDLING =---------------------
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeStatusIndicator_notifyVerbAdded(verb){}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeStatusIndicator_notifyNounAdded(noun){}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeStatusIndicator_notifyActionEvaluated(score, meme)
{
	this._food = score.food;
	this._energy = score.energy;
	this._happiness = score.happiness;
	this._time = score.time;
}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeStatusIndicator_notifyActionCancelled(){}
// ------------------------
function prototypeStatusIndicator_notifyScoreChange(score)
{
	this._happiness = score.happiness;
	this._energy = score.energy;
}
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------