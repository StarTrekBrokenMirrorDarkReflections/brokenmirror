#pragma strict

var isPause : boolean = false;
var lastClick : float;
var clickInt : float = 0.2f;

function Start () {

}

function FixedUpdate () {

	if(Input.GetAxis("EscapeMenu") && Time.time >= lastClick + clickInt)
	{
		lastClick = Time.time;
		if(isPause == true)
		{
			
			isPause = false;
			Time.timeScale = 1;
		}
		else
		{
			
			isPause = true;
			Time.timeScale = 0;
		}
	}
	
}

function OnGUI () {

	
	
	if(isPause)
	{
		GUILayout.BeginArea(Rect(0, 0, 300, 600));
		
			GUILayout.BeginHorizontal();
			
				GUILayout.BeginVertical();
					if(GUILayout.Button("Resume Game")) {
						isPause = false;
						Time.timeScale = 1;
									
					}				
				
					if(GUILayout.Button("Restart Game"))
					{
						Time.timeScale = 1;
						var per_go : GameObject = GameObject.FindWithTag("Persistent");
						Destroy(per_go);
						Application.LoadLevel(0);
						
											
					}
					
					if(GUILayout.Button("Load Earth"))
					{
						
						Time.timeScale = 1;
						Application.LoadLevel("Earth");
						
					}
					
					if(GUILayout.Button("Load Alpha Centauri"))
					{
						Time.timeScale = 1;
						Application.LoadLevel("AlphaCentauri");
						
					}
					
					if(GUILayout.Button("Load Andoria"))
					{
						Time.timeScale = 1;
						Application.LoadLevel("Andoria");
					}
					
					if(GUILayout.Button("Load Tygokor"))
					{
						Time.timeScale = 1;
						Application.LoadLevel("Tygokor");
					}
					
					if(GUILayout.Button("Exit"))
					{
						Time.timeScale = 1;
						Application.Quit();
					}
				
				GUILayout.EndVertical();
			
			GUILayout.EndHorizontal();
		
		GUILayout.EndArea();
	}

}