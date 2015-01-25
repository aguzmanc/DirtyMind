// ------------------------
function TimeIndicator()
{
	Transformable.call(this,0,0);

	this.tag = 'time_indicator';

	// ---= METHODS =---
	this.drawSprite = function(c){};

	// ---= DELEGATES =---
	this.notifyVerbAdded = prototypeTimeIndicator_notifyVerbAdded;
	this.notifyNounAdded = prototypeTimeIndicator_notifyNounAdded;
	this.notifyActionEvaluated = prototypeTimeIndicator_notifyActionEvaluated;
	this.notifyActionCancelled = prototypeTimeIndicator_notifyActionCancelled;
	this.notifyScoreChange = prototypeTimeIndicator_notifyScoreChange;
}
// ------------------------
// ---------------------= DELEGATE HANDLING =---------------------
// ---------------------= DELEGATE HANDLING =---------------------
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeTimeIndicator_notifyVerbAdded(verb){}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeTimeIndicator_notifyNounAdded(noun){}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeTimeIndicator_notifyActionEvaluated(){}
// ---------------------= DELEGATE HANDLING =---------------------
function prototypeTimeIndicator_notifyActionCancelled(){}
// ------------------------
function prototypeTimeIndicator_notifyScoreChange(score){ }
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------
// ------------------------