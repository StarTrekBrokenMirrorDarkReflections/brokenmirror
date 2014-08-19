//this script is used to contain all properties of a ship, without any modification
#pragma strict

//create classes
//stores all player/ship properties
class ShipPlayerProps {
	var isPlayer : boolean = false;
	var cloaked : boolean = false;
	private final var cloakPress : float = 0.1f;
	private var lastCloak : float;
	
	function setCloak() {
		lastCloak = Time.time;
	}
	
	function canCloak() : boolean {
		return Time.time > lastCloak + cloakPress;
	}
	
}

//this class is used to caracterize ship movement
class ShipMovementProps {
	var agility : float; //Standard Agility of the craft. In degrees per second.
	var impulseSpeed : float; //Standard Maximum Speed of the craft at sublight.
	var acceleration : float; //Ship acceleration at sublight speed (in percentage)
	var warpSpeed : int = 9;
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
	var baseCost : int; //this represents the base cost of the ship
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

class shipProperties extends MonoBehaviour implements IFactionable, INameable, ITextureable, IClasseable, IDescribable, ICloakable {

	//use classes
	var playerProps : ShipPlayerProps;
	var movement : ShipMovementProps;
	var ShipHealth : ShipHealthProps;
	var shipProps : ShipProps;
	var shipModifiers : ShipModifiers;
	var shipInfo : ShipInfo;
	var combatStatus : ShipCombatStatus;
	var cam : MouseOrbit;

	var lastMap : float;
	var waitMap : float = 0.2f;

	//other scripts
	var health : shipHealth;
	var map : MapInfo;
	var cloud : ShipCloud;
	var message : ShowMessage;
	private var general : GeneralInfo;
	var cloak : CloakScript;

	//constants
	public static var SHIELD_INIBITED : String = "Can't raise shields, shields inhibited.";
	public static var NO_SHIELD : String = "Shields down.";

	function Start() {
		cam = Camera.main.gameObject.GetComponent(MouseOrbit);
		health = gameObject.GetComponent(shipHealth);
		map = GameObject.FindGameObjectWithTag("MapInfo").GetComponent(MapInfo);
		cloud = gameObject.GetComponent(ShipCloud);
		message = GameObject.FindGameObjectWithTag("ShowMessage").GetComponent(ShowMessage);
		general = GameObject.FindGameObjectWithTag("SaveGame").GetComponent(GeneralInfo);
		cloak = gameObject.GetComponent(CloakScript);

	}

	function Update() {

		//change red alert status

		if (Input.GetAxis("RedAlert") && Time.time >= combatStatus.lastRedPress + combatStatus.timeInt && playerProps.isPlayer)
		{
			combatStatus.isRedAlert = !combatStatus.isRedAlert;
			combatStatus.lastRedPress = Time.time;
			if(cloud.isShieldInibited()) {
				if(getRedAlert()) message.AddMessage(SHIELD_INIBITED);
			} else if (!health.isShieldUp()) {
				if(getRedAlert()) message.AddMessage(NO_SHIELD);
			} else {
				health.showShields();
			}
		}

		//map status
		//in case Map Input is pressed
		if(Input.GetAxis("Map") && playerProps.isPlayer && lastMap + waitMap < Time.time) {
			map.swapStatus();
			lastMap = Time.time;
		}
		
		if(Input.GetAxis("Cloak") && playerProps.canCloak()) {
			if(isCloaked()) {
				setCloak(false);
			} else {
				setCloak(true);
			}
			playerProps.setCloak();
		}
		
		

	}


	function getRedAlert() : boolean {

		return combatStatus.isRedAlert;

	}

	function getPlayer() : boolean {
		return playerProps.isPlayer;

	}

	function setPlayer(isPlayer : boolean) {
		playerProps.isPlayer = isPlayer;
		
		

	}

	function getStoreImage() : Texture {
		return shipInfo.storeImg;
	}
	
	function getTargetImage() : Texture {
		return shipInfo.targetImg;
	}

	function getClass() : String {
		return shipInfo.shipClass;

	}

	function getDescription() : String {
		return shipInfo.shipDescription;

	}

	function getName() : String {
		var faction : FactionInfo = general.getFactionInfo(getFaction());
		return faction.getPrefix() + " " + shipInfo.shipName;
	}

	function getFaction() : int {
		return shipInfo.faction;
	}
	
	function isHostile(faction : int) : boolean {
		return general.isFactionEnemies(getFaction(), faction);							
	}
	
	function isAllied(faction : int) : boolean {
		return general.isFactionAllies(getFaction(), faction);
	}
	
	function isNeutral(faction : int) : boolean {
		return !isHostile(faction) && !isAllied(faction);
	}
	
	function isOwn(faction : int) : boolean {
		return getFaction() == faction;
	}

	function setFaction(fac : int) {
		shipInfo.faction = fac;
	}

	function getPrice() {
		return shipProps.baseCost;
	}

	function getStrenght() : int {
		return shipProps.shipStrenght;
	}

	function getSpeed() : float {
		return movement.impulseSpeed;
	}
	
	function getWarpSpeed() : int {
		return movement.warpSpeed;
	}
	
	function isCloaked() : boolean {
		return playerProps.cloaked;
	}
	
	function setCloak(cloak : boolean) {
		playerProps.cloaked = cloak;
		if(cloak) {
			this.cloak.hide(getPlayer());
		} else {
			this.cloak.show(getPlayer());
		}
	}

}
