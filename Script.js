
    // Blank position within the board, and its neighbours.
    var blankIndex = 0;
    var blankNeighbours = [-1, -1, -1, -1];
    var chipPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var chipRowIndex =  [0, 0, 0, 1, 1, 1, 2, 2, 2]
    var chipElements = [];

    // Timer variables
    var useMinuteDisplay = false;
    var timeInSeconds = 0, timeInMinutes = 0;
    var timerElement;

    // Game modifiers
    var useRandomShuffle = true;

    // Images
    var imagePrefix = 'images/chip_', imageFileType = '.png';
    var images = [];

    // On Page Loaded
    function OnPageLoaded()
    {
        // Setup element references
        timerElement = document.getElementById('timeCount');

        // Start time counter
        setInterval(Timer, 1000);

        // Setup the image array and chip element array.
        for(var i = 0; i < 9; i++)
        {
            // Setup images.
            images[i] = 'url(' + imagePrefix + i + imageFileType  + ')';

            // Setup chip elements.
            chipElements[i] = document.getElementById(i);
        }

        SetupGame();
    }

    // Game Setup
    function SetupGame()
    {
        if(useRandomShuffle)
        {
            for(var i = 0; i < chipPositions.length; i++)
            {
                // Random selection of chip positions array.
                var random = Math.floor(Math.random() * chipPositions.length);

                // If not the same index, and not the same value.
                if(random > i && chipPositions[random] != chipPositions[i])
                {
                    // Save the chip positions.
                    var from = chipPositions[i];
                    var to = chipPositions[random];

                    // Swap chip positions.
                    chipPositions[random] = from;
                    chipPositions[i] = to;
                }
            }
        }
        
        // Loop through each position and set its background image.
        for(var j = 0; j < chipPositions.length; j++)
        {
            // Set innerHTML to match chip positions.
            //chipElements[j].innerHTML = chipElements[j].id;

            // Set background image.
            chipElements[j].style.backgroundImage = images[chipPositions[j]];

            // Set blank index.
            if(chipPositions[j] == 0)
            {
                blankIndex = j;
                CalculateNeighbours();
            }
        }
    }      

    // On chip movement.
    function MoveChip(newPosition)
    {
        // Check if selection is a valid neighbour of blank.
        for(var i = 0; i < blankNeighbours.length; i++)
        {
            // If the new index position matches a neighbour.
            if(newPosition == blankNeighbours[i])
            {
                console.log(newPosition);
                // Swap blank with the new position.
                SwapBlankPosition(newPosition);
                continue;
            }
        }
    }

    // Swaps chip positions.
    function SwapBlankPosition(position)
    {
        
        var to = position;

        chipPositions[blankIndex] = chipPositions[to];
        chipPositions[to] = chipPositions[blankIndex];

        // Change blank index position.
        blankIndex = to;
    }

    // Calculates the blank index neighbours.
    function CalculateNeighbours()
    {
        // Up/Down & left/right.
        var newNeighbours = [blankIndex - 3, blankIndex + 3, CheckAdjacencyX(blankIndex, blankIndex -1), CheckAdjacencyX(blankIndex, blankIndex +1)];

        // Loop through each neighbour.
        for(var i = 0; i < newNeighbours.length; i++)
        {
            // Check if the new neighbour is within boundaries.
            if(CheckArrayBounds(newNeighbours[i]))
            {
                // If there is an old neighbour.
                if(CheckArrayBounds(blankNeighbours[i]))
                {
                    chipElements[newNeighbours[i]].style.borderColor ='rgba(10, 10, 10, 0.65)';
                }

                // If there is a new neighbour.
                if(blankNeighbours[i] != newNeighbours[i])
                {                
                    // Swap styles.
                    chipElements[newNeighbours[i]].style.borderColor = '#a68d0f';
                }
            }
        }

        // Set blank neighbours to the new neighbours.
        blankNeighbours = newNeighbours;
    }

    // Checks if a chip x position matches another chip.
    function CheckAdjacencyX(indexToMatch, indexToCheck)
    {   
        // If either index is out of array boundaries.
        if(!CheckArrayBounds(indexToMatch) || !CheckArrayBounds(indexToCheck))
        {
            return -1;
        }

        // Check if the row postion matches.
        if(chipRowIndex[indexToMatch] == chipRowIndex[indexToCheck])
        {
            return indexToCheck;
        }
        else
        {
            return -1;
        }
    }

    // Checks if an index is out array bounds.
    function CheckArrayBounds(index)
    {
        if(index >= 0 && index < chipPositions.length)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    // Counts each passing second.
    function Timer()
    {
        // Set time passed in seconds
        timeInSeconds++;

        // Check if time in seconds has reached a minute.
        if(timeInSeconds >= 60)
        {
            // Increase minute count, reset seconds count.
            timeInMinutes++;
            timeInSeconds = 0;
        }

        // Time string in seconds to add some addtional zero if less than 10.
        var timeSecondsString = (timeInSeconds < 10) ? '0' + timeInSeconds : timeInSeconds; 

        // Set element text.
        timerElement.innerHTML = timeInMinutes + ':' + timeSecondsString;
    }
    