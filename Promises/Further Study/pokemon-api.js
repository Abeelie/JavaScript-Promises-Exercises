if (!document.readyState === "loading") {
    document.addEventListener("DomContentLoaded", start())
}else {
    start();
}

function start(){
  const url = "https://pokeapi.co/api/v2";
  const res = axios.get(`${url}/pokemon/?limit=1000`).then(data => {
    console.log(data.data.results);
  });

  axios.get(`${url}/pokemon/?limit=1000`)
    .then(data => {
      let pokemon_urls = [];
      for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * data.data.results.length);
        let url = data.data.results.splice(x, 1)[0].url;
        pokemon_urls.push(url);
      }
      return Promise.all(pokemon_urls.map(url => axios.get(url)));
    })
    .then(pokemon => {
      pokemon.forEach(p => console.log(p));
    });


  let names = null;
  axios.get(`${url}/pokemon/?limit=1000`)
    .then(data => {
      let pokemon_Urls = [];
      for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * data.data.results.length);
        let url = data.data.results.splice(x, 1)[0].url;
        pokemon_Urls.push(url);
      }
      return Promise.all(pokemon_Urls.map(url => axios.get(url)));
    })
    .then(data => {
      names = data.map(d => d.data.name);
      // console.log(names)
      return Promise.all(data.map(d => axios.get(d.data.species.url)))
    })
    .then(data => {
      let descriptions = data.map(d => {
        // console.log(d)
        let descriptionObj = d.data.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        // console.log(descriptionObj)
        return descriptionObj ? descriptionObj.flavor_text : "No description available."; 
      });
      descriptions.forEach((desc, i) => {
        console.log(`${names[i]}: ${desc}`);
      });
    });
}


$(document).ready(function() {
  const url = "https://pokeapi.co/api/v2";
  let $btn = $("button");
  let $area = $("#pokemon");

  $btn.on("click", function() {
    $area.empty();
    let namesAndImages = [];
    axios.get(`${url}/pokemon/?limit=1000`)
      .then(data => {
        let pokemon_Urls = [];
        for (let i = 0; i < 3; i++) {
          let x = Math.floor(Math.random() * data.data.results.length);
          let url = data.data.results.splice(x, 1)[0].url;
          pokemon_Urls.push(url);
        }
        return Promise.all(pokemon_Urls.map(url => axios.get(url)));
      })
      .then(pokemonData => {
        namesAndImages = pokemonData.map(p => ({
          name: p.data.name,
          img: p.data.sprites.front_default
        }));
        return Promise.all(pokemonData.map(p => axios.get(p.data.species.url)));
      })
      .then(speciesData => {
        speciesData.forEach((d, i) => {
          let descriptionObj = d.data.flavor_text_entries.find(function(entry) {
            return entry.language.name === "en";
          });
          let description = descriptionObj ? descriptionObj.flavor_text : "";
          let { name, img, ability, move, type } = namesAndImages[i];
          $area.append(generateCard(name, img, description));
        });
      });
  });

function generateCard(name, img, description){
    return `
        <div class="card">
        <h1 class="name">${name}</h1>
        <img src=${img} />
        <p>${description}</p>
        </ul> 
      </div>
    `;
}

});