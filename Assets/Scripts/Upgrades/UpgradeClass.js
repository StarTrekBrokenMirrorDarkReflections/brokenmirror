#pragma strict

class UpgradeClass extends Object implements Active {

	var upgrade : GameObject;
	var lastUse : float;
	var active : boolean;

	function use(target : GameObject) {
		var scr : IActive = getScript();
		scr.use(target);
		active = true;
		var b : MonoBehaviour = new MonoBehaviour();
		b.Invoke("setOff", getDuration());
	}
	
	function canUse() : boolean {
		var scr : IActive = getScript();
		var cooldown : float = scr.getCooldown();
		return lastUse + cooldown < Time.time;
	}
	
	function disable(target : GameObject) {
		var scr : IActive = getScript();
		scr.disable(target);
		active = false;
	}
	
	function isDisabable() : boolean {
		var scr : IActive = getScript();
		return scr.isDisabable();
	}
	
	function isActive() : boolean {
		return active;
	}
	
	function getUpgrade() : GameObject {
		return upgrade;
	}
	
	private function getScript() : IActive {
		var script : IActive = upgrade.GetComponent(typeof(IActive)) as IActive;
		return script;
	}
	
	private function getDuration() : float {
		var scr : IActive = getScript();
		return scr.getDuration();
	}
	
	private function setOff() {
		active = false;
	}


}