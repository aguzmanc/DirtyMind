// ---------------------= =---------------------
var mouse={left:false,right:false};
var mousePos={x:0.0,y:0.0};
var movements = {up:false,down:false,right:false,left:false};

var engine = null;

var brain;
var wordGenerator;
var actionIndicator = new ActionIndicator();
var statusIndicator = new StatusIndicator();
var timeIndicator = new TimeIndicator();

var imagesLoaded = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var imageNames = ['dummy','aliens','bg','brain_damaged','brain_dead','brain_normal','brain_worried',
	'brain','food','fuckyea','happiness','hearth_icon','impossibru','jackiechan',
	'nerd','picaron','quemalote','quest','splash_screen','star','troll','ultragay','youknowwhatimean'];

function preLoadImage(name,index)
{
	var img = new Image();
	img.src = 'img/'+name+'.png';
	img.onload = function(){imagesLoaded[index]=1;};
}

var loadImagesInterval;
function checkLoaded()
{
	var allLoaded = true;
	var i,length=imagesLoaded.length;
	for(i=0;i<length;i++)
		if(imagesLoaded[i]==0){
			allLoaded = false;
			break;
		}

	if(allLoaded){
		clearInterval(loadImagesInterval);
		engine.start();	
	}
}

$(document).on('ready',function()
{
	// preLoadImages
	var i,l = imageNames.length;
	for(i=0;i<l;i++)
		preLoadImage(imageNames[i],i);

	loadImagesInterval = setInterval(checkLoaded,5000);

	// splash screen
	var canvas = document.getElementById("game_canvas");
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	var context = canvas.getContext('2d');
	var img = new Image();
	img.src = 'img/splash_screen.png';
	img.onload = function(){
		context.fillStyle = "#FF0000";
		context.drawImage(img,0,0);
	};

	// setup brain
	brain = new Brain();
	brain.setMovementsObject(movements);

	// setup word generator
	wordGenerator = new WordGenerator(brain);

	engine = getEngine();
	engine.initialize('game_canvas');

	// setup Background
	// engine.background = new ParallaxBackground();
	engine.background = new BasicBackground();

	// setup rules core (including notify mechanism)
	engine.rules = new GameRules();
	engine.rules.addDelegate(actionIndicator);
	engine.rules.addDelegate(timeIndicator);
	engine.rules.addDelegate(statusIndicator);

	// ADD MAIN ELEMENTS
	engine.addElement(brain);
	engine.addElement(wordGenerator);
	engine.addElement(actionIndicator);
	engine.addElement(statusIndicator);

	$(document).on('mousedown',function(ev){engine.mouseDown(ev);});
	$(document).on('mouseup',function(ev){engine.mouseUp(ev);});
	$(document).on('mousemove',function(ev){engine.mouseMove(ev);});

	$(document).on('keydown', keyDown);
	$(document).on('keyup', keyUp);
});
// ---------------------= =---------------------
function keyDown(ev)
{
	var key = ev.which;

	switch(key){
		case 65: // left
			movements.left = true;
			break;
		case 68: // right
			movements.right = true;
			break;
		case 83: // down
			movements.down = true;
			break;
		case 87: // up
			movements.up = true;
			break;
	}
}
// ---------------------= =---------------------
function keyUp(ev)
{
	var key = ev.which;

	switch(key){
		case 65: // left
			movements.left = false;
			break;
		case 68: // right
			movements.right = false;
			break;
		case 83: // down
			movements.down = false;
			break;
		case 87: // up
			movements.up = false;
			break;
	}
}
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------
// ---------------------= =---------------------