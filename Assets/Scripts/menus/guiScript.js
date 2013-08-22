﻿#pragma strict

class GuiAreas {
	var width : int;
	var height : int;
	var x : int;
	var y : int;
	
}

//Areas
var BotGui : GuiAreas;
var HelmModule : GuiAreas;
var HealthModule : GuiAreas;
var WeaponModule : GuiAreas;
var TorpedoModule : Rect;

var TopGui : Rect;
var TargetModule : Rect;

//Gui Elements
var isMap : boolean = false; //checks if map is up
var isInventory : boolean = false; //checks if inventory is up
var isCargo : boolean = false; //checks if cargo is up

//Skin
var HudSkin : GUISkin;

//global elements
var yellowOver : Texture;

//helm
class HelmGui {
	//Main background
	var bgTexture : Texture;
	var bg_width : int;
	var bg_height : int;
	
	//Backward Indicator
	var bw_speed_bg : Texture;
	var bw_speed_fg : Texture;
	var bw_speed_area : GuiAreas;
	
	//Backward Shadow
	var bw_shadow : Texture;
	var bw_shadow_area : GuiAreas;
			
	//Forward Indicator
	var fwd_speed_bg : Texture;
	var fwd_speed_fg : Texture;
	var fwd_speed_area : GuiAreas;
	
	//Buttons
	//Increase Button
	var inc_but_area : GuiAreas;
	var inc_but_img : Texture;
	
	//Decrease button
	var dec_but_area : GuiAreas;
	var dec_but_img : Texture;
	
	//Stop Button
	var stop_area : GuiAreas;
	var stop_img : Texture;
	
	//Map button
	var map_area : GuiAreas;
	var map_img : Texture;
	
	
}

class HealthGui {
	//bars
	//hull
	var hull_area : GuiAreas;
	var hull_fg_area : GuiAreas;
	var hull_bg : Texture;
	var hull_fg : Texture;
	
	//shield
	var shield_area : GuiAreas;
	var shield_fg_area : GuiAreas;
	var shield_bg : Texture;
	var shield_fg : Texture;

	//orbs
	var orbs_area : GuiAreas;
	var orbs_img : Texture;
	
	//orb values
	
	var shield_label_area : GuiAreas;
	var hull_label_area : GuiAreas;


}

class WeaponGui {
	//background
	var bg_area : GuiAreas;
	var bg_image : Texture;

	//weapon buttons
	var weap_area : Rect[];
	
	//Inventory button
	var inv_area : Rect;
	var inv_img : Texture;
	
	//Cargo button
	var cargo_area : Rect;
	var cargo_img : Texture;
	
}


class TorpedoGui {
	//Background
	var bg_area : Rect;
	var bg_image : Texture;
	
	//times three
	var area_3x : Rect;
	
	
	//times five
	var area_5x : Rect;
	
	
	//time eight
	var area_8x : Rect;
	

}

class TargetGui {
	//Main
	//Background
	var bg_area : Rect;
	var bg_image : Texture;
	
	//orb placement
	var orb_area : Rect;
	
	//orb colors
	var orb_enemy_color : Texture;
	var orb_ally_color : Texture;
	var orb_owned_color : Texture;
	var orb_neutral_color : Texture;

	//labels
	var name_area : Rect;	
	var class_area : Rect;
	
	
	//health bars
	
	//shield
	var shield_area : Rect;
	var shield_img : Texture;
	
	//hull
	var hull_area : Rect;
	var hull_img : Texture;
	

}

var Helm : HelmGui;
var Health : HealthGui;
var Weapon : WeaponGui;
var Torpedo : TorpedoGui;
var Target : TargetGui;

//External Scripts
var shipProps : shipProperties;
var shipMov : shipMovement;
var shipHea : shipHealth;
var shipWeap : shipWeapons;
var shipTar : shipTarget;



function Start () {

	shipProps = gameObject.GetComponent(shipProperties);
	shipMov = gameObject.GetComponent(shipMovement);
	shipHea = gameObject.GetComponent(shipHealth);
	shipWeap = gameObject.GetComponent(shipWeapons);
	shipTar = gameObject.GetComponent(shipTarget);

}

function OnGUI () {

	if(shipProps.playerProps.isPlayer)
	{
		BotGUI();
		TopGUI();
	
	}
	
		

}

//Bottom GUI
function BotGUI () {

	GUILayout.BeginArea(Rect(Screen.width/2 - BotGui.x/2, Screen.height - BotGui.y, BotGui.width, BotGui.height));
	
		helmModule();
		healthModule();
		weaponModule();
		torpedoModule();
	
	GUILayout.EndArea();


}

//Helm Module

function helmModule () {

	GUILayout.BeginArea(Rect(HelmModule.x, HelmModule.y, HelmModule.width, HelmModule.height));
	
		GUI.DrawTexture(Rect(0,0, Helm.bg_width, Helm.bg_height), Helm.bgTexture); //background image
		
		//forward speed background		
		GUI.DrawTexture(Rect(Helm.fwd_speed_area.x, Helm.fwd_speed_area.y, Helm.fwd_speed_area.width, Helm.fwd_speed_area.height), Helm.fwd_speed_bg);
		
		//forward speed foreground
		//get current speed and max speed
		var curSpeed : float = shipMov.speedStatus;
		var maxSpeed : float = shipMov.movProps.maxStatus;
		
		
		var fwbarSize : int;
		if(curSpeed > 0)
		{
			fwbarSize = GetBarSize(Helm.fwd_speed_area.width, maxSpeed, curSpeed);
		}
		else
		{
			fwbarSize = 0;
		}
		
		//Draw speed bar
		GUI.DrawTexture(Rect(Helm.fwd_speed_area.x, Helm.fwd_speed_area.y, fwbarSize, Helm.fwd_speed_area.height), Helm.fwd_speed_fg, ScaleMode.ScaleAndCrop);
		
		//Backward Speed Shadow
		GUI.DrawTexture(Rect(Helm.bw_shadow_area.x, Helm.bw_shadow_area.y, Helm.bw_shadow_area.width, Helm.bw_shadow_area.height), Helm.bw_shadow);
		
		//backward speed background
		GUI.DrawTexture(Rect(Helm.bw_speed_area.x, Helm.bw_speed_area.y, Helm.bw_speed_area.width, Helm.bw_speed_area.height), Helm.bw_speed_bg);
		
		//backward speed fooreground
		//get min speed
		var minSpeed : float = shipMov.movProps.minStatus;
		
		
		var bwbarSize : int;
		if(curSpeed < 0)
		{
			bwbarSize = GetBarSize(Helm.bw_speed_area.width, minSpeed, curSpeed);
		}
		else
		{
			bwbarSize = 0;
		}
		
		//Draw speed bar
		
		GUI.DrawTexture(Rect(Helm.bw_speed_area.x, Helm.bw_speed_area.y, bwbarSize, Helm.bw_speed_area.height), Helm.bw_speed_fg, ScaleMode.ScaleAndCrop);
	
		//Draw buttons
		//get movement info
		var speedInc : float = shipProps.movement.acceleration;
		
		//Increase button
		if(GUI.RepeatButton(Rect(Helm.inc_but_area.x, Helm.inc_but_area.y, Helm.inc_but_area.width, Helm.inc_but_area.height), Helm.inc_but_img, HudSkin.button)) {
			
			
			if(curSpeed < maxSpeed) {
				shipMov.speedStatus += Time.deltaTime * speedInc;
			
			}
		
		}
		
		//Decrease button
		if(GUI.RepeatButton(Rect(Helm.dec_but_area.x, Helm.dec_but_area.y, Helm.dec_but_area.width, Helm.dec_but_area.height), Helm.dec_but_img, HudSkin.button))
		{
		
			if(curSpeed > minSpeed) {
				shipMov.speedStatus -= Time.deltaTime * speedInc;
			
			}
		
		}
		
		//Stop button
		if(GUI.Button(Rect(Helm.stop_area.x, Helm.stop_area.y, Helm.stop_area.width, Helm.stop_area.height), Helm.stop_img, HudSkin.GetStyle("StopButton")))
		{
			if(curSpeed != 0 && !shipMov.isChanging) {
			
				StartCoroutine(shipMov.FullStop(curSpeed, speedInc));
			  
			} 
		}
		
		
		//Map button
		if(GUI.Button(Rect(Helm.map_area.x, Helm.map_area.y, Helm.map_area.width, Helm.map_area.height), Helm.map_img, HudSkin.button)) {
			
			isMap = !isMap;
		
		}
		
		
	
	GUILayout.EndArea();

}

//Shows health

function healthModule() {

	GUILayout.BeginArea(Rect(HealthModule.x, HealthModule.y, HealthModule.width, HealthModule.height));
	
		//calculations
		//get hull values
		var maxHull : float = shipHea.shipHealth.maxHealth;
		var curHull : float = shipHea.shipHealth.health;
		var percHull : float = ValueToPercentage(maxHull, curHull);
		
		
		//get shield values
		var maxShield : float = shipHea.shipHealth.maxShields;
		var curShield : float = shipHea.shipHealth.shields;
		var percShield : float = ValueToPercentage(maxShield, curShield);
	
	
		//Health Bars
		//Hull Background
		GUI.DrawTexture(Rect(Health.hull_area.x, Health.hull_area.y, Health.hull_area.width, Health.hull_area.height), Health.hull_bg);
		
		//Calculate foreground transparency
		var hullColor : Color = Color.white;
		var hullAlpha : float = percHull/100;
		hullColor.a = hullAlpha;
					
		GUI.color = hullColor; //sets transparency
		
		//Hull Foreground
		GUI.DrawTexture(Rect(Health.hull_fg_area.x, Health.hull_fg_area.y, Health.hull_fg_area.width, Health.hull_fg_area.height), Health.hull_fg);
		
		GUI.color = Color.white; //sets back to default
	
		//Shield Backgroound
		GUI.DrawTexture(Rect(Health.shield_area.x, Health.shield_area.y, Health.shield_area.width, Health.shield_area.height), Health.shield_bg);  
		
		//Calculate foreground transparency
		var shieldColor : Color = Color.white;
		var shieldAlpha : float = percShield/100;
		shieldColor.a = shieldAlpha;
		
		GUI.color = shieldColor; //sets transparent
		
		//Shield Foreground
		GUI.DrawTexture(Rect(Health.shield_fg_area.x, Health.shield_fg_area.y, Health.shield_fg_area.width, Health.shield_fg_area.height), Health.shield_fg);
		
		GUI.color = Color.white; //sets default back
		
		//Health Orbs
		//Draw Background
		GUI.DrawTexture(Rect(Health.orbs_area.x, Health.orbs_area.y, Health.orbs_area.width, Health.orbs_area.height), Health.orbs_img);
		
		
	
		//Write hull value
		GUI.Label(Rect(Health.hull_label_area.x, Health.hull_label_area.y, Health.hull_label_area.width, Health.hull_label_area.height), Mathf.RoundToInt(percHull).ToString() + "%", HudSkin.label);
	
		//Write shield value
		GUI.Label(Rect(Health.shield_label_area.x, Health.shield_label_area.y, Health.shield_label_area.width, Health.shield_label_area.height), Mathf.RoundToInt(percShield).ToString() + "%", HudSkin.GetStyle("ShieldLabel"));
	
	GUILayout.EndArea();


}

//Shows weapon gui module

function weaponModule() {

	GUILayout.BeginArea(Rect(WeaponModule.x, WeaponModule.y, WeaponModule.width, WeaponModule.height));
	
		//Draw Background
		GUI.DrawTexture(Rect(Weapon.bg_area.x, Weapon.bg_area.y, Weapon.bg_area.width, Weapon.bg_area.height), Weapon.bg_image);
	
		//Draw buttons
		//Draw frontal weapon buttons
		CreateWeapButton(shipWeap.weapon1, HudSkin, Weapon.weap_area[0]); //Weapon 1
		CreateWeapButton(shipWeap.weapon2, HudSkin, Weapon.weap_area[1]); //Weapon 2
		CreateWeapButton(shipWeap.weapon3, HudSkin, Weapon.weap_area[2]); //Weapon 3
		//Draw back weapon buttons
		CreateWeapButton(shipWeap.weapon4, HudSkin, Weapon.weap_area[3]); //Weapon 4
		CreateWeapButton(shipWeap.weapon5, HudSkin, Weapon.weap_area[4]); //Weapon 5
		CreateWeapButton(shipWeap.weapon6, HudSkin, Weapon.weap_area[5]); //Weapon 6
		//Draw lateral weapon buttons
		CreateWeapButton(shipWeap.weapon7, HudSkin, Weapon.weap_area[6]); //Weapon 7
		CreateWeapButton(shipWeap.weapon8, HudSkin, Weapon.weap_area[7]); //Weapon 8
		
		//Draw inventory button and check if its pressed
		if(GUI.Button(Weapon.inv_area, Weapon.inv_img, HudSkin.button)) {
		
			isInventory = !isInventory; //invert the value of the button (show if hidden, hide if visible)
		
		}
		
		//Draw cargo button and check if its pressed
		if(GUI.Button(Weapon.cargo_area, Weapon.cargo_img, HudSkin.button)) {
		
			isCargo = !isCargo; //invert the value of the button (show if hidden, hide if visible)
		
		}
		
		
		
	
	
	GUILayout.EndArea();

}

//torpedo module

function torpedoModule() {
	GUILayout.BeginArea(TorpedoModule);
	
		//Draw Background image
		GUI.DrawTexture(Torpedo.bg_area, Torpedo.bg_image);
		
		//set overlay transparency at 0.75
		var overColor : Color = Color.white;
		overColor.a = 0.75;	
	
		
		//Draw 3x modifier button
		if(GUI.Button(Torpedo.area_3x, "x3", HudSkin.button)) {
			shipWeap.torpVolley = Volley.three;
		
		}
		
		//if its selected, draw a overlay over it
		if(shipWeap.torpVolley == Volley.three) {
		
			GUI.color = overColor;	
		
			GUI.DrawTexture(Torpedo.area_3x, yellowOver);
			
			GUI.color = Color.white;
		
		}
		
		
		
	
		//5x modifier button
		if(GUI.Button(Torpedo.area_5x, "x5", HudSkin.button)) {
			shipWeap.torpVolley = Volley.five;
		}
		
		//if its selected, draw a overlay over it
		if(shipWeap.torpVolley == Volley.five) {
		
			GUI.color = overColor;	
		
			GUI.DrawTexture(Torpedo.area_5x, yellowOver);
			
			GUI.color = Color.white;
		
		}
		
		//8x modifier button
		if(GUI.Button(Torpedo.area_8x, "x8", HudSkin.button)) {
			shipWeap.torpVolley = Volley.eight;
		}
		
		//if its selected, draw a overlay over it
		if(shipWeap.torpVolley == Volley.eight) {
		
			GUI.color = overColor;	
		
			GUI.DrawTexture(Torpedo.area_8x, yellowOver);
			
			GUI.color = Color.white;
		
		}
		
	
	GUILayout.EndArea();


}


//Draws the superior part of the HUD
function TopGUI() {

	GUILayout.BeginArea(Rect(Screen.width/2 - TopGui.x/2, TopGui.y, TopGui.width, TopGui.height));
	
		targetModule();
	
	
	GUILayout.EndArea();


}

//Draws the targetting module of the HUD
function targetModule() {

	if(shipTar.target) //checks first if the ship has a target to show
	{

		GUILayout.BeginArea(TargetModule);
			
			//Main Component
			GUILayout.BeginArea(Target.bg_area);
				//Lets start by the background
				GUI.DrawTexture(Target.bg_area, Target.bg_image);
				
				//Now the orb part
				//get the player ship faction and faction information
				var playerFaction : int = shipProps.shipInfo.faction;
				var playerAllies : int[] = shipProps.shipInfo.alliedFactions;
				var playerEnemies : int[] = shipProps.shipInfo.hostileFactions;
				
				//obtain the target faction
				var tarFaction : int;
				
				if(shipTar.target.tag == "Ship") {
					
					var targetScript : shipProperties = shipTar.target.GetComponent(shipProperties);
					tarFaction = targetScript.shipInfo.faction;						
				
				}
				
				//Now lets select the orb in question
				var orbTexture : Texture;
				if(playerFaction == tarFaction) //check if it has the same faction
				{
					orbTexture = Target.orb_owned_color; //give owned color
				}
				else if (CheckArrayValue(playerFaction, playerAllies)) //check if it's an ally
				{
					orbTexture = Target.orb_ally_color; //give allied color
				}
				else if (CheckArrayValue(playerFaction, playerEnemies)) //check if it's an enemy
				{
					orbTexture = Target.orb_enemy_color; //give enemy color
				}
				else //if none of the above
				{
					orbTexture = Target.orb_owned_color; //give neutral color
				}
				
				
				//Draw the texture
				GUI.DrawTexture(Target.orb_area, Target.orb_enemy_color);
				
				//Now Draw the ship image
				//First get it from the targeted object
				var tarImage : Texture;
				var shipClass : String; //get these for the future
 				var shipName : String;
				
				if(shipTar.target.tag == "Ship") { //if it's a ship
				
					
					var tarShipProps : shipProperties = shipTar.target.GetComponent(shipProperties); //get ship properties script
					tarImage = tarShipProps.shipInfo.targetImg; //get image
					shipClass = tarShipProps.shipInfo.shipClass; //get class
					shipName = tarShipProps.shipInfo.shipName; //get name
				
				}
				
				//Now draw the texture
				GUI.DrawTexture(Target.orb_area, tarImage);
				
				//And now, it's time for writing those labels
				GUI.Label(Target.name_area, shipName, HudSkin.GetStyle("TargetLabel"));
				GUI.Label(Target.class_area, shipClass, HudSkin.GetStyle("TargetLabel"));
				
				//And now the health bars of the target
				//lets start by getting the target status
				
				var hull : float;
				var maxHull : float;
				var shield : float;
				var maxShield : float;
				
				if(shipTar.target.tag == "Ship") { //if its a ship
				
					var healthTarget : shipHealth = shipTar.target.GetComponent(shipHealth); //get the target health script
					hull = healthTarget.shipHealth.health; //get hull values
					maxHull = healthTarget.shipHealth.maxHealth; //get max hull
					shield = healthTarget.shipHealth.shields; // get shields
					maxShield = healthTarget.shipHealth.maxShields; //get max shields
				
				}
				
				//lets get the width of those bars
				var shieldWidth : int = GetBarSize(Target.shield_area.width, maxShield, shield);
				var hullWidth : int = GetBarSize(Target.hull_area.width, maxHull, hull);
				//Now lets draw them
				//start by shield
				GUI.DrawTexture(Rect(Target.shield_area.x, Target.shield_area.y, shieldWidth, Target.shield_area.height), Target.shield_img);
				GUI.DrawTexture(Rect(Target.hull_area.x, Target.hull_area.y, hullWidth, Target.hull_area.height), Target.hull_img);
				
				//Expand button
			
			GUILayout.EndArea();
		
		GUILayout.EndArea();
	
	}


}

//this function automates the button creation process for the weapons
//Weapon contains the weapon slot information
//Skin contains the GUI aspect information
//Area contains the coordinates and size of the button
function CreateWeapButton(Weapon : WeaponSlot, Skin : GUISkin, Area : Rect) {
	//Start
	
	//check if weapon is not enabled or is not empty
	if(Weapon.isEnabled && Weapon.weapon_go) {
	
		//Get weapon image
		var weapon_scr : weaponScript = Weapon.weapon_go.GetComponent(weaponScript); //Get weapon script
		var weapon_img : Texture = weapon_scr.guiInfo.image; //Get weapon GUI Image
		
		//Draw button with Area, weapon_img and Skin and check if said button is pressed 
		if(GUI.Button(Area, weapon_img, Skin.button) && shipProps.combatStatus.isRedAlert) {
		
			if(shipTar.target) { //check if there's a target
		
				Weapon.isFiring = true; //Set isFiring as true
			
			} else { //if there isn't, find one and set isFiring as true after
			
				shipTar.target = shipTar.FindTarget(gameObject, shipProps); //Find target 
				Weapon.isFiring = true; //Set isFiring as true
			
			}
			
		
		}
		
		//If weapon is reloading, draw overlay
		if(Time.time < Weapon.nextShot) {
		
			//Calculate size
			//Get total reload time and time remaining
			var totalReload : float = Weapon.lastReload;
			var remainTime : float = Weapon.nextShot - Time.time;
			
			//Get overlay height
			var overHeight : int = GetBarSize(Area.height, totalReload, remainTime);
			
			//get size diference
			var sizeDif : int = Area.height - overHeight;
		
			//transparency
			var overColor : Color = Color.white;
			overColor.a = 0.75;
			
			GUI.color = overColor;
		
			GUI.DrawTexture(Rect(Area.x, Area.y + sizeDif, Area.width, overHeight), yellowOver);
		
			GUI.color = Color.white;
		}
		
		
	
	} else { //else draw empty square in the same place, with the same style
	
		GUI.Button(Area, "", Skin.button);
	
	}
	
	//End
}


//this function returns the size of a bar in pixels
function GetBarSize (FullSize : int, MaxValue : float, CurValue : float) : int {

	var newSize : int;
	
	newSize = (FullSize * CurValue)/MaxValue;
	
	return newSize;
	

}

function ValueToPercentage(MaxValue : float, CurValue : float) : float {

	var perc : float;
	
	perc = (100*CurValue) / MaxValue;
	
	return perc;


}

//this function will check if a certain element belongs in 1 array
function CheckArrayValue(desValue : int, array : int[]) : boolean {

	var belongs : boolean = false;
	
	for(var val : int in array) {
	
		if (desValue == val)
		{
			belongs = true;
		}
	
	}
	
	return belongs;

}
