    let pokemon;
    let isListenerAttached = false;

    function changeBackground() {
        let imgElement = document.querySelector(".pokemonImage img");
        if (imgElement) {
            if (imgElement.style.display === 'none') {
                imgElement.style.display = 'block';
            }
            console.log("Image display style:", imgElement.style.display);
        } else {
            console.error("Image element not found.");
        }
        let backgroundImageURL = "./views/guessPokemon.png";
        document.querySelector(".pokemonImage").style.backgroundImage = `url('${backgroundImageURL}')`;
        localStorage.setItem("background", backgroundImageURL);
    }

    async function getpokemon() {
        let num = Math.floor((Math.random() * 9) + 1);
        let id = num + 1;
        console.log(id);
        localStorage.setItem("num", id);
        const response = await fetch("https://pokeapi.co/api/v2/pokedex/kanto");
        const data = await response.json();
        let pokemonName = data.pokemon_entries[num].pokemon_species.name;
        localStorage.setItem("pokemon", pokemonName);
       
        return pokemonName;
    }

    document.querySelector(".gameStarted").addEventListener("click", async function main() {
        changeBackground(); 
        pokemon = await getpokemon();
        console.log("Fetched Pokemon:", pokemon); 

        let path = `./views/${pokemon}(fade).png`;
        console.log("Image Path:", path);  
        let imgElement = document.querySelector(".pokemonImage img");
        if (imgElement) {
            imgElement.setAttribute("src", path);
            imgElement.style.display = 'block'; 
            console.log("Image Element src set to:", imgElement.getAttribute("src"));  
            console.error("Image element not found.");
        }
        if (!isListenerAttached) {
            correction(); 
            isListenerAttached = true; 
        }
    });

    document.querySelector(".submitAnswer").addEventListener("click", function () {
        let bg = localStorage.getItem("background");
        if (bg) {
            console.log(`Restoring background image: ${bg}`);
            document.querySelector(".pokemonImage").style.backgroundImage = `url('${bg}')`;
        }
        let answerInput = document.querySelector("#pokemonName");
        let userAnswer = answerInput.value.trim().toLowerCase();
        let storedPokemon = localStorage.getItem("pokemon").toLowerCase();

        if (!userAnswer) {
            alert("Please enter a guess.");
            return;
        }
    
        if (userAnswer === storedPokemon) {
            // Correct guess logic
            document.querySelector(".pokemonImage img").setAttribute("src", `./views/${storedPokemon}.png`);
            document.querySelector(".pokemonImage img").style.display = 'block';
    
            setTimeout(function () {
                window.location.href = "./result.html";
                document.querySelector(".inputForm").reset();
            }, 1200);
    
        } else {
            document.querySelector(".pokemonImage img").setAttribute("src", `./views/${storedPokemon}.png`);
            document.querySelector(".pokemonImage img").style.display = 'block';

            let submitButton = document.querySelector(".submitAnswer");
            let startedButton = document.querySelector(".gameStarted");

            let originalText = submitButton.innerHTML;
            let originalBgColor = submitButton.style.backgroundColor;
            let originalTextColor = submitButton.style.color;

            startedButton.innerHTML = "NEXT POKEMON";
            startedButton.style.backgroundColor = "green";
            startedButton.style.color = "white";
    
            submitButton.innerHTML = "INCORRECT";
            submitButton.style.backgroundColor = "red";
            submitButton.style.color = "white";
    
            setTimeout(function () {
                submitButton.innerHTML = originalText;
                submitButton.style.backgroundColor = originalBgColor;
                submitButton.style.color = originalTextColor;
            }, 2000);  
        }
    });
