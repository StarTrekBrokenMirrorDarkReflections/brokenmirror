//this "class" is more here to interface the rest of the game with the several weapon scripts, plus status
#pragma strict

var type : WeaponType;
var firingAngle : float;
var guiInfo : GuiInfo;

enum WeaponType {
	beam,
	torpedo,
	pulse,

}

class GuiInfo {
	var name : String;
	var description : String;
	var image : Texture2D;

}



function Start () {
	
}

function Update () {

}

//this method gets the weapon cooldown
function getCooldown() : float {
	var cd : float = 0.0f;
	
	switch(type) {
		case WeaponType.beam:
			cd = gameObject.GetComponent(phaserScript).standard_cd;
			break;
		case WeaponType.torpedo:
			cd = gameObject.GetComponent(torpedoScript).status.cooldown;
			break;
		case WeaponType.pulse:
			cd = gameObject.GetComponent(pulseScript).cooldown;
			
	
	}
	
	return cd;


}

//this method gets the weapon range
function getRange() : float {
	var range : float = 0.0f;
	
	switch(type) {
		case WeaponType.beam:
			range = gameObject.GetComponent(phaserScript).range;
			break;
		case WeaponType.torpedo:
			range = gameObject.GetComponent(torpedoScript).status.range;
			break;
		case WeaponType.pulse:
			range = gameObject.GetComponent(pulseScript).range;
		
	
	}
	
	return range;
	
}

//this method checks if the target is in range
function isRange(origin : GameObject, target : GameObject) : boolean {

	return (Vector3.Distance(origin.transform.position, target.transform.position) <= getRange());


}

//this method check if the target is inside the firing arc
function isAngle(origin : GameObject, target : GameObject) : boolean {

	return Vector3.Angle(origin.transform.position, target.transform.position) <= firingAngle/2;

}


//this method set the weapon target
//@pre target != null
function setTarget(target : GameObject) {
	switch(type) {
		case WeaponType.beam:
			gameObject.GetComponent(phaserScript).setTarget(target);
			break;
		case WeaponType.torpedo:
			gameObject.GetComponent(torpedoScript).setTarget(target);
			break;
		case WeaponType.pulse:
			gameObject.GetComponent(pulseScript).setTarget(target);
			
	
	}
}

//this method sets the weapon origin point
//@pre origin != null
function setOrigin(origin : GameObject) {

	switch(type) {
		case WeaponType.beam:
			gameObject.GetComponent(phaserScript).setOrigin(origin);
			break;
		case WeaponType.torpedo:
			gameObject.GetComponent(torpedoScript).setOrigin(origin);
			break;
		case WeaponType.pulse:
			gameObject.GetComponent(pulseScript).setOrigin(origin);
	
	}


}