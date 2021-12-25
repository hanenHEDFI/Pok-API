

document.addEventListener("DOMContentLoaded", () =>{

    let generateBtn = document.querySelector('#generate-pokemon');
    generateBtn.addEventListener('click', renderEverything)

    getSelectBtn().addEventListener('click', selectNormalPokemon);
})

function renderEverything(){
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = "";
    fetchPokemon();

    getSelectBtn().style.display = 'block'
}
function selectNormalPokemon(event){
    event.target.style = 'none';
       let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = "";
    fetchNormalPokemon();

}
function getSelectBtn(){
    return document.querySelector('#select-btn')
}


function fetchPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
			fetchPokemonData(pokemon);
        })
    })
}
function fetchNormalPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
			fetchNormalPokemonData(pokemon);
        })
    })
}
function fetchPokemonData(pokemon){
	//save the pokemon url to a variable
    let url = pokemon.url                              
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
		
		 renderPokemon(pokeData)
		})
}
function fetchNormalPokemonData(pokemon){
	//save the pokemon url to a variable
    let url = pokemon.url  
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
		for (let i=0; i<pokeData.types.length; i++){
         if (pokeData.types[i].type.name==="normal") 
		 { renderPokemon(pokeData)}
		}})
}

function renderPokemon(pokeData){
    let allPokemonContainer = document.getElementById('poke-container');
	//pokeContainer div will be used to append all details
    let pokeContainer = document.createElement("div")  
    pokeContainer.classList.add('ui', 'card');

    let pokeName = document.createElement('h4') 
    pokeName.innerText = pokeData.name

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${pokeData.id}`
   //ul list for the pokemon types
    let pokeTypes = document.createElement('ul') 
  
  // Go through the types array and create li tags for each one
    createTypes(pokeData.types, pokeTypes) 
   //appending all details to the pokeContainer div
    pokeContainer.append(pokeName, pokeNumber, pokeTypes);   
	 //pokeContainer div will be used to append all detailshold all the pokemon cards
    allPokemonContainer.appendChild(pokeContainer);     
}
//create li tags for each type
function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}





