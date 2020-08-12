
    // Blank position within the board, and its neighbours.
    var blankIndex = 0;
    var blankNeighbours = [-1, -1, -1, -1];

    // Timer variables
    var useMinuteDisplay = false;
    var counter = setTimeout(Timer(), 1000);

    // Game modifiers
    var useRandomShuffle = true;

    // Execute on document loaded.
    OnStart();

    // Game timer, called on variable creation.
    function Timer()
    {
        // Get element, time count.
        var element = document.getElementById("time");
        var timeCount = parseInt(element.innerHTML);     

        // Use minute display check
        if(!useMinuteDisplay && (timeCount + 1) == 60)
        {
            timeCount = 0;
            useMinuteDisplay = true;
		}

        // Set time display.
        var timeString = (!useMinuteDisplay)? " Seconds" : " Minutes";
        var timeToAdd = (!useMinuteDisplay)? 1000 : 60000;
        
        // Update counter string
        element.innerHTML = timeCount + 1 + timeString;

        // Set next timeout in milliseconds
        timer = setTimeout(Timer, timeToAdd);
	}

    // Start is called when the page is loaded.
    function OnStart()
    {
        // Positions yet to be shuffled in.
        var positions = [1, 2, 3, 4, 5, 6, 7, '', 8];

        // On using random shuffle
        if(!useRandomShuffle)
        {
            // Loop through each position and shuffle them.
            for(var i = 0; i < positions.length; i++)
            {
                // Random selection of positions array.
                randomSelection = Math.floor(Math.random() * positions.length);

                // If random selection is not equal to current index
                if(positions[randomSelection] != positions[i])
                {
                    // Save from and to position
                    var from = positions[i];
                    var to = positions[randomSelection];

                    // Swap positions
                    positions[randomSelection] = from;
                    positions[i] = to;
			    }
		    }
		}

        // Set each position
        for(var j = 0; j < positions.length; j++)
        {
            // Set numbers for each index in the HTML file
            document.getElementById(j).innerHTML = positions[j];

            // If index is zero then set blankIndex
            if(positions[j] == 0)
            {
                blankIndex = j;
			}
		}

        // Update neighbours of blank.
        UpdateNeighbours();
	}

    // On element click
    function OnSelection(element)
    {
        for(var i = 0; i < blankNeighbours.length; i++)
        {
            // If selection is a neighbour of blank.
            if(element.id == blankNeighbours[i])
            {                
                // Set the current blank square number to selected element number.
                document.getElementById(blankIndex).innerHTML = element.innerHTML;

                // Update blank number to the new element index number.
                blankIndex = element.id;

                // Set the new blank number to blank.
                document.getElementById(blankIndex).innerHTML = '';

                // Update neigbhour positions.
                UpdateNeighbours();

                // On blank placed in final position
                if(blankIndex == 8)
                {
                    // Perform win check.
                    WinCheck();
				}

                // Break out of loop.
                break;
			}
		}
	}

    // Performs a win check
    function WinCheck()
    {
        for(var i = 0; i < 8; i++)
        {
            // If placement does not match the grid index.
            if(document.getElementById(i).innerHTML != i + 1)
            {
                return;
		    }
		}

        alert("Puzzle Solved!");
	}

    // Updates the neighbour positions of blank.
    function UpdateNeighbours()
    {
        // Up and down
        blankNeighbours[0] = parseInt(blankIndex) - 3;
        blankNeighbours[1] = parseInt(blankIndex) + 3;

        // Left and right
        blankNeighbours[2] = parseInt(blankIndex) - 1;
        blankNeighbours[3] = parseInt(blankIndex) + 1;

        // Update Debug Info on movement.
        //document.getElementById("neighbours").innerHTML = blankNeighbours;
        //document.getElementById("position").innerHTML = blankIndex;
        document.getElementById("movement").innerHTML = parseInt(document.getElementById("movement").innerHTML) + 1;
	}