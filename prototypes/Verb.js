// --------------------= =--------------------
function Verb(x,y,word)
{
	Word.call(this,x,y,word);

	/// ----- METHODS
	this.draw = prototypeVerb_draw;
	this.drawSprite = prototypeVerb_drawSprite;
}
// --------------------= =--------------------
function prototypeVerb_draw(ctx)
{
	// saves previous alpha
	var oldAlpha = ctx.globalAlpha;
	ctx.globalAlpha = this.alpha;

	ctx.save();

	ctx.translate(this.pos.x, this.pos.y);
	ctx.rotate(this.angle);
	ctx.scale(this.scale,-this.scale); // reverse Y scale (to draw sprite with library)

	this.drawSprite(ctx);

	ctx.restore();

	// restores alpha
	ctx.globalAlpha = oldAlpha; 
}
// --------------------= =--------------------
function prototypeVerb_drawSprite(ctx)
{
	ctx.fillStyle = this.bgColor;
	ctx.fillRect(
		-this._word.length*LETTER_WIDTH/2 - PADDING_HORIZONTAL,
		-LETTER_HEIGHT/2 - PADDING_VERTICAL,
		this._word.length*LETTER_WIDTH + PADDING_HORIZONTAL*2,
		LETTER_HEIGHT + 2*PADDING_VERTICAL);

	// ---
	ctx.beginPath();
	ctx.arc(
		-this._word.length*LETTER_WIDTH/2 - PADDING_HORIZONTAL,
		0,
		(LETTER_HEIGHT + 2*PADDING_VERTICAL)/2,
		0,2*Math.PI);
	ctx.fill();
	// ---
	ctx.fillRect(
		this._word.length*LETTER_WIDTH/2 + PADDING_HORIZONTAL-2,
		LETTER_HEIGHT/2 + PADDING_VERTICAL,
		17,-5);

	ctx.fillRect(
		this._word.length*LETTER_WIDTH/2 + PADDING_HORIZONTAL - 2,
		-LETTER_HEIGHT/2 - PADDING_VERTICAL,
		17,5);

	if(false == this.isDying){
		ctx.fillStyle='white';
		ctx.font="20px Monospace";

		var wordStr = ALL_VERBS[this._word];

		ctx.fillText(wordStr,
			-this._word.length*LETTER_WIDTH/2,
			LETTER_HEIGHT/2);
	}
}
// --------------------= =--------------------
// --------------------= =--------------------