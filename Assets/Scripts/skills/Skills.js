﻿#pragma strict

var skills : SkillSet;

@Tooltip("The amount of speed bonus for 100 navigational points.")
var speedBonus : float;
@Tooltip("The amount of agility bonus for 100 navigational points.")
var agilityBonus : float;
@Tooltip("The amount of weapons damage bonus for 100 tactical points.")
var damageBonus : float;
@Tooltip("The amount of weapons recharge bonus for 100 tactical points.")
var rechargeBonus : float;
@Tooltip("The amount of shield bonus for 100 engineering points.")
var shieldBonus : float;
@Tooltip("The amount of reactor bonus for 100 engineering points.")
var reactorBonus : float;
@Tooltip("The amount of scan bonus for 100 science points. Still don't know how to implement it.")
var scanBonus : float;

function Start () {
	
}

function Update () {

}

function SetUp(navigation : int, tactical : int, engineering : int, science : int, command : int) {
	skills = new SkillSet(navigation, tactical, engineering, science, command);
}

function SetUp(skills : SkillSet) {
	this.skills = skills;
}

function upgradeNavigation(increase : int) {
	this.skills.navigation += increase;
}

function upgradeTactical(increase : int) {
	this.skills.tactical += increase;
}

function upgradeEngineering(increase : int) {
	this.skills.engineering += increase;
}

function upgradeScience(increase : int) {
	this.skills.science += increase;
}

function upgradeCommand(increase : int) {
	this.skills.command += increase;
}

function getSpeedBonus() : float {
	return speedBonus * (1 + skills.navigation/100);
}

function getAgilityBonus() : float {
	return agilityBonus * (1 + skills.navigation/100);
}

function getDamageBonus() : float {
	return damageBonus * (1 + skills.tactical/100);
}

function getRechargeBonus() : float {
	return rechargeBonus * (1 - skills.tactical/100);
}

function getShieldBonus() : float {
	return shieldBonus * (1 + skills.engineering/100);
}

function getReactorBonus() : float {
	return reactorBonus * (1 + skills.engineering/100);
}

function getScanBonus() : float {
	return 0; //TODO WHAT?
}