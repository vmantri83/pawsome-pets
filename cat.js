window.addEventListener("load", async () => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/pets/get-pets", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "cat"
            })
        })
        const data = await response.json()
        data.data.value.map((el) => (
            document.getElementById("container").innerHTML += `<div class="pet-div">
            <div class="pet-card"><img src=${el.photo} alt="Small black dog with white spots"
                class="pet-image"></div>
            <h2 id="w-node-e136b6c280f8-668660da" class="pet-name">${el.name}</h2>
            <p id="w-node-e136b6c280fa-668660da" class="pet-description">${el.gender}<br>${el.birthYear}<br>${el.species}<br>${el.favFoods[0] + ", " + el.favFoods[1]}</p>
            <a href="#cards-section" class="adopt-button w-button"><strong class="adopt-button-text">Adopt
                ${el.name}</strong></a>
          </div>`
        ))
    } catch (error) {
        console.log(error.message);
    }

})