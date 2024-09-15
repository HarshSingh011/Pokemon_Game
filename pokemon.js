async function info () {
    let index = localStorage.getItem("num").toLowerCase();
    index = index;
    console.log(index);
    const response2 = await fetch("https://pokeapi.co/api/v2/pokemon-species/"+index+"/");
    const data1 = await response2.json();
    let info_poke_url = data1.flavor_text_entries[0].flavor_text;
    console.log(info_poke_url);
    return info_poke_url;
}

document.addEventListener("DOMContentLoaded", async function () {
    // Fetch the stored Pokémon name from localStorage
    let storedPokemon = localStorage.getItem("pokemon");

    if (storedPokemon) {
        storedPokemon = storedPokemon.toLowerCase(); // Convert the name to lowercase if needed
        
        // Set the src attribute of the image to the corresponding Pokémon image
        let imgElement = document.querySelector(".pokemonImage img");
        if (imgElement) {
            imgElement.setAttribute("src", `./views/${storedPokemon}.png`);
            imgElement.style.display = 'block';  // Ensure the image is visible
        } else {
            console.error("Image element not found.");
        }
    } else {
        console.error("No Pokémon found in localStorage.");
    }
    document.querySelector("h3").innerHTML = await info();
    document.querySelector("h1").innerHTML = storedPokemon.toUpperCase();

    document.querySelector(".submitAnswer").innerHTML = "SUBMIT";
    document.querySelector(".submitAnswer").set.backgroundColor = "white";
    document.querySelector(".submitAnswer").set.color = "black";
    document.querySelector(".gameStarted").innerHTML = "START";
    document.querySelector(".gameStarted").set.backgroundColor = "white";
    document.querySelector(".gameStarted").set.color = "black";

});