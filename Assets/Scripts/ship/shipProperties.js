//this script is used to contain all properties of a ship, without any modification
#pragma strict

//create classes
//stores all player/ship properties
class ShipPlayerProps {
	var isPlayer : boolean = false;
	
	
	
}

//this class is used to caracterize ship movement
class ShipMovementProps {
	var agility : float; //Standard Agility of the craft. In degrees per second.
	var impulseSpeed : float; //Standard Maximum Speed of the craft at sublight.
	var acceleration : float; //Ship acceleration at sublight speed (in percentage)
}

class ShipCombatStatus {
	var isRedAlert : boolean; 
	var lastRedPress : float;
	var timeInt : float = 0.2f;
}

//this contains the basic health status of the ship
class ShipHealthProps {
	var basicHealth : float;
	var basicShield : float;
	var armor : float = 0.0f;
}

class ShipProps {
	var shipStrenght : float; //this var contains the ship strenght... Used in AI, and calculating fleet and planet strenght
}

class ShipModifiers {
	var reloadSpeed : float;
}

class ShipInfo {

	var faction : int;
	
	var storeImg : Texture;
	var targetImg : Texture; //this image will appear on the player gui
	var shipClass : String; //this contains the ship class
	var shipName : String; //this contains the ship name
	var shipDescription : String;

}



//use classes
var playerProps : ShipPlayerProps;
var movement : ShipMovementProps;
var ShipHealth : ShipHealthProps;
var shipProps : ShipProps;
var shipModifiers : ShipModifiers;
var shipInfo : ShipInfo;
var combatStatus : ShipCombatStatus;

var lastMap : float;
var waitMap : float = 0.2f;

function Update() {

	//change red alert status

	if (Input.GetAxis("RedAlert") && Time.time >= combatStatus.lastRedPress + combatStatus.timeInt && playerProps.isPlayer)
	{
		combatStatus.isRedAlert = !combatStatus.isRedAlert;
		combatStatus.lastRedPress = Time.time;
		gameObject.GetComponent(shipHealth).showShields();
	}

	
	
	
	//map status
	//in case Map Input is pressed
	if(Input.GetAxis("Map") && playerProps.isPlayer && lastMap + waitMap < Time.time) {
		//get permanent game object
		var perm : GameObject = GameObject.FindGameObjectWithTag("MapInfo");
		var mapInfo : MapInfo = perm.GetComponent(MapInfo);
		mapInfo.swapStatus();
		lastMap = Time.time;
	}
	

}


function getRedAlert() : boolean {

	return combatStatus.isRedAlert;

}

function getPlayer() : boolean {
	return playerProps.isPlayer;

}


function getStoreImage() : Texture {
	return shipInfo.storeImg;
}

function getClass() : String {
	return shipInfo.shipClass;

}

function getDescription() : String {
	return shipInfo.shipDescription;

}