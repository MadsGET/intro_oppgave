var gamePresetNames = ['Custom', 'Easy', 'Medium', 'Hard'];
var gamePresets = [[0, 0, 1], [150, 15, 1], [100, 10, 1], [50, 5, 1]];
var selectedPreset = -1;

// Game Settings 0 = move, 1 = time, 2 = random.
var settings = [0, 0, 0];

// Set preset settings
function SetPresetSettings(newSettings)
{
	// Move settings
	movementLimit.checked = (newSettings[0] != 0) ? true : false;
	movementBox.style.display = (newSettings[0] != 0) ? 'inherit' : 'none';
	moveInput.value = newSettings[0];

	// Time settings
	timeLimit.checked = (newSettings[0] != 0) ? true : false;
	timeBox.style.display = (newSettings[0] != 0) ? 'inherit' : 'none';
	timeInput.value = newSettings[1];

	// Random setting
	useRandom.checked = newSettings[2];
}

// Use -1/+1 to move selection.
function SelectPreset(indexMovement)
{
	var newSelection = -1;

	// If out of array bounds.
	if (indexMovement + selectedPreset < 0) {
		newSelection = gamePresetNames.length - 1;
	}
	else if (indexMovement + selectedPreset > gamePresetNames.length - 1) {
		newSelection = 0;
	}
	else
	{
		newSelection = selectedPreset + indexMovement;
	}

	// Set preset.
	SetPreset(newSelection);
}

// Set preset selection.
function SetPreset(index)
{
	if (selectedPreset == index)
	{
		return;
	}

	// Set text and index.
	presetText.innerText = gamePresetNames[index];
	selectedPreset = index;

	// Load settings.
	SetPresetSettings(gamePresets[index]);
}

// Toggles the box that contains the settings display.
function ToggleBox(element, subElement)
{
	if (element.checked)
	{
		document.getElementById(subElement).style.display = 'inherit';
	}
	else
	{
		document.getElementById(subElement).style.display = 'none';
	}
}

function StartGame()
{
	var moveSetting = gamePresets[selectedPreset][0];
	var timeSetting = gamePresets[selectedPreset][1];
	var randomSetting = gamePresets[selectedPreset][2];

	// If using custom preset
	if (selectedPreset == 0)
	{
		// Check Move Limit
		// Check Time Limit
		// Check Random setting
	}

	window.localStorage.setItem('moveLimit', moveSetting);
	window.localStorage.setItem('timeLimit', timeSetting);
	window.localStorage.setItem('randomLimit', randomSetting);

	window.location.href = "game.html";
}
