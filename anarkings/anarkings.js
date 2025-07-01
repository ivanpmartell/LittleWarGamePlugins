anarkings = {
    filter: function () {
        const targetNode = document.getElementById('pickMapWindowContents');
        const observerOptions = { childList: true, subtree: true };
        var counter = 0;
        const callback = function(mutations) {
            document.getElementById('searchLabel').style.display = 'none';
            document.getElementById('mapSearchInput').style.display = 'none';
            document.getElementById('mapSearchSelect').style.display = 'none';
            document.getElementById('mapPopularitySelect').style.display = 'none';
            for(let mutation of mutations) {
                if (mutation.type === 'childList') {
                    counter++;
                }
            }
            if (counter > 5) {
                document.getElementById('selectMapArea').innerHTML = '<br><br><br><br><br><br><span id="loading">loading...</span>';
                this.disconnect();
                document.getElementById('mapSearchSelect').value = "Custom mods";
                document.getElementById('mapSearchInput').value = "anarkings";
                document.getElementById('mapSearchInput').dispatchEvent(new KeyboardEvent('keydown', {keyCode: 13}));
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, observerOptions);
    }
};

anarkings.init = {
    function() {
        this.addAnarkingsFilter();
        console.log("Anarkings plugin loaded");
    },
    
    addAnarkingsFilter: function() {
        var spPlayButton = document.getElementById("singleplayerButton");
        const existingSPPlayHandler = spPlayButton.onclick;
        spPlayButton.onclick = function () {
            addons.anarkingsFilter();
            if (existingSPPlayHandler)
                existingSPPlayHandler(event);
        }
        var mpPlayButton = document.getElementById("lobbyCreateButton");
        const existingMPPlayHandler = mpPlayButton.onclick;
        mpPlayButton.onclick = function () {
            addons.anarkingsFilter();
            if (existingMPPlayHandler)
                existingMPPlayHandler(event);
        }
    }
};