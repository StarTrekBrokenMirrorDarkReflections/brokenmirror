#pragma strict

class MovementGui {
	var height : int;
	var width : int;
	var style : GUISkin;
	
	var stopIcon : Texture2D;
	var upIcon : Texture2D;
	var downIcon : Texture2D;
	
	var buttonWidth : int = 48;
	var buttonHeight : int = 48;
	
	var buttonPadding : int = 2;

}

var MovGUI : MovementGui;
var shipProps : shipProperties;
var shipMov : shipMovement;

function Start () {

	//get necessary scripts
	shipProps = gameObject.GetComponent(shipProperties);
	shipMov = gameObject.GetComponent(shipMovement);

}

function OnGUI () {
	//gets escape menu status
	var cam_go : GameObject = Camera.main.gameObject;
	var cam_sc : testReturn = cam_go.GetComponent(testReturn);
	var isPause : boolean = cam_sc.isPause;

	if(shipProps.playerProps.isPlayer && !isPause)
	{
		MovementGUI();
	
	}


}

//this function build the movement gui section
function MovementGUI () {
	//Create Movement GUI Area
	GUILayout.BeginArea(Rect(0, Screen.height - MovGUI.height, MovGUI.width, MovGUI.height));
		//Create button area	
		GUILayout.BeginVertical();
			//Stop Button
			GUILayout.BeginHorizontal();
				if(GUI.Button(Rect(0,0,MovGUI.buttonWidth, MovGUI.buttonHeight), MovGUI.stopIcon, MovGUI.style.button))
				{
					//here comes the button action
					shipMov.speedTarget = 0;
					shipMov.speedChanged = true;
					
				}
			GUILayout.EndHorizontal();
			//Up Button
			GUILayout.BeginHorizontal();
				//calculate diference from before
				var upHeight : int = MovGUI.buttonHeight + MovGUI.buttonPadding;
				if(GUI.Button(Rect(0,upHeight,MovGUI.buttonWidth, MovGUI.buttonHeight), MovGUI.upIcon, MovGUI.style.button))
				{
					//here cames the button action
					var lastUp : float = shipMov.keys.SpeedIncreaseKey;
					var updelay : float = shipMov.keys.KeyDelay;
					if(Time.time >= lastUp + updelay)
					{
						shipMov.keys.SpeedIncreaseKey = Time.time;
						//get movement max
						var uptarget : float = shipMov.speedTarget;
						var upmax : float = shipMov.movProps.maxStatus;
						if(uptarget < upmax)
						{
							//change speed
							var upstep : float = shipMov.speedStep;
							shipMov.speedTarget += upstep;
							shipMov.speedChanged = true;
							
						}
						
						
					}
					
					
				
				
				}
			GUILayout.EndHorizontal();
			//Down Button
			GUILayout.BeginHorizontal();
				//calculate diference from before
				var downHeight : int = upHeight + MovGUI.buttonHeight + MovGUI.buttonPadding;
				if(GUI.Button(Rect(0,downHeight,MovGUI.buttonWidth, MovGUI.buttonHeight), MovGUI.downIcon, MovGUI.style.button))
				{
					//here comes the button action
					var lastDown : float = shipMov.keys.SpeedDecreaseKey;
					var downdelay : float = shipMov.keys.KeyDelay;
					if(Time.time >= lastDown + downdelay)
					{
						shipMov.keys.SpeedDecreaseKey = Time.time;
						//get movement min
						var downtarget : float = shipMov.speedTarget;
						var downmin : float = shipMov.movProps.minStatus;
						if (uptarget > downmin)
						{
							//change speed
							var downstep : float = shipMov.speedStep;
							shipMov.speedTarget -= downstep;
							shipMov.speedChanged = true;
						}
						
					}
					
					
				}
			GUILayout.EndHorizontal();
		GUILayout.EndVertical();
		
		//Create graphic area
		GUILayout.BeginVertical();
		
			GUILayout.BeginHorizontal();
				//here goes the speed graphic code
			GUILayout.EndHorizontal();;
		
		GUILayout.EndVertical();
		
		
	GUILayout.EndArea();
	
	

}