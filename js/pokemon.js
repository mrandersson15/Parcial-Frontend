const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokeInput = document.querySelector(".pokemon-input");
const pokeBtn = document.querySelector(".pokemon-btn");
const pokeCard = document.querySelector(".pokemon-info");
const pokeError = document.querySelector(".error-poke");

async function checkPokemon(pokemon) {
    const name = pokemon.toLowerCase().trim();
    if (!name) return;

    const response = await fetch(pokeApiUrl + name);

    if (response.status == 404) {
        pokeError.style.display = "block";
        pokeCard.style.display = "none";
    } else {
        const data = await response.json();

        // Actualizar Nombres e IDs
        const formattedId = `#${data.id.toString().padStart(3, '0')}`;
        document.querySelector(".poke-name").innerHTML = data.name;
        document.querySelector(".poke-id-back").innerHTML = formattedId;
        document.querySelector(".poke-id-pill").innerHTML = formattedId;
        
        // Imagen
        document.querySelector(".pokemon-img").src = data.sprites.other["official-artwork"].front_default;

        // Stats (Altura y Peso corregidos /10)
        document.querySelector(".poke-height").innerHTML = `${data.height / 10} M`;
        document.querySelector(".poke-weight").innerHTML = `${data.weight / 10} KG`;

        // Tipos
        const typesContainer = document.querySelector(".poke-types-container");
        typesContainer.innerHTML = "";
        data.types.forEach(t => {
            const span = document.createElement("span");
            span.classList.add("type-badge", t.type.name);
            span.innerHTML = t.type.name;
            typesContainer.appendChild(span);
        });

        pokeCard.style.display = "block";
        pokeError.style.display = "none";
    }
}

pokeBtn.addEventListener("click", () => checkPokemon(pokeInput.value));
pokeInput.addEventListener("keydown", (e) => { if(e.key === "Enter") checkPokemon(pokeInput.value); });
checkPokemon("1");