function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params) {
            result[key] = decodeURIComponent(value);
        }
        return result;
    }

function setLocalStorageFromParams(params) {
        Object.keys(params).forEach(key => {
            localStorage.setItem(key, params[key]);
        });
    }

document.addEventListener('DOMContentLoaded', function() {
    const queryParams = getQueryParams();
    setLocalStorageFromParams(queryParams);

    // Retrieve and log stored data
    const selectedOrigin = localStorage.getItem('selectedOrigin');
    const selectedRace = localStorage.getItem('selectedRace');
    const raceImage = localStorage.getItem('selectedRace');
    const selectedCaminho = localStorage.getItem('selectedCaminho');
    const savePilha = localStorage.getItem('savePilha');
    const saveFortitude = localStorage.getItem('saveFortitude');
    const saveReflexo = localStorage.getItem('saveReflexo');
    const saveVontade = localStorage.getItem('saveVontade');
    const caminhosPontosPericia = localStorage.getItem('caminhosPontosPericia');
    const saveClasse = localStorage.getItem('saveClasse');
    const savePassado = localStorage.getItem('savePassado');
    const saveCaracteristica = localStorage.getItem('saveCaracteristica');

    const final_str = localStorage.getItem('final_str');
    const final_dex = localStorage.getItem('final_dex');
    const final_int = localStorage.getItem('final_int');
    const final_vida = localStorage.getItem('final_vida');
    const final_stamina = localStorage.getItem('final_stamina');
    const final_mana = localStorage.getItem('final_mana');
    const final_fort_frio = localStorage.getItem('final_fort_frio');
    const final_fort_calor = localStorage.getItem('final_fort_calor');
    const final_fort_veneno = localStorage.getItem('final_fort_veneno');
    const final_reflexos = localStorage.getItem('final_reflexos');
    const final_vontade = localStorage.getItem('final_vontade');
    
    const decodeTwice = (encodedStr) => decodeURIComponent(decodeURIComponent(encodedStr));

    const periciasPrimariasRaw = decodeTwice(localStorage.getItem('periciasPrimarias')) || '[]';
    const periciasSecundariasRaw = decodeTwice(localStorage.getItem('periciasSecundarias')) || '[]';
    const periciasTerciariasRaw = decodeTwice(localStorage.getItem('periciasTerciarias')) || '[]';

    // Parse JSON
    const periciasPrimarias = JSON.parse(periciasPrimariasRaw);
    const periciasSecundarias = JSON.parse(periciasSecundariasRaw);
    const periciasTerciarias = JSON.parse(periciasTerciariasRaw);
	
    
    console.log('Selected Origin:', selectedOrigin);
    console.log('Selected Race:', selectedRace);
    console.log('Race Image:', raceImage);
    console.log('Selected Caminho:', selectedCaminho);
    console.log('Perícias Primárias:', periciasPrimarias);
    console.log('Perícias Secundárias:', periciasSecundarias);
    console.log('Perícias Terciárias:', periciasTerciarias);
	
	displaySavedPericias(periciasPrimarias, 'Perícias Primárias');
    displaySavedPericias(periciasSecundarias, 'Perícias Secundárias');
    displaySavedPericias(periciasTerciarias, 'Perícias Terciárias');

    document.getElementById('raceImage').src = `img/racas/${raceImage}.png`;
    document.getElementById('selected-origin').innerText = selectedOrigin;
    document.getElementById('selected-race').innerText = selectedRace;
    document.getElementById('selected-caminho').innerText = selectedCaminho;
    document.getElementById('save-pilha').innerText = savePilha;
    document.getElementById('save-fortitude').innerText = saveFortitude;
    document.getElementById('save-reflexo').innerText = saveReflexo;
    document.getElementById('save-vontade').innerText = saveVontade;
    document.getElementById('selected-classe').innerText = saveClasse;
    document.getElementById('selected-passado').innerText = savePassado;
    document.getElementById('selected-caracteristica').innerText = saveCaracteristica;

    document.getElementById('label-str').innerText = final_str;
    document.getElementById('label-dex').innerText = final_dex;
    document.getElementById('label-int').innerText = final_int;
    document.getElementById('label-vida').innerText = final_vida;
    document.getElementById('label-stamina').innerText = final_stamina;
    document.getElementById('label-mana').innerText = final_mana;
    document.getElementById('label-fort-frio').innerText = final_fort_frio;
    document.getElementById('label-fort-calor').innerText = final_fort_calor;
    document.getElementById('label-fort-veneno').innerText = final_fort_veneno;
    document.getElementById('label-reflexos').innerText = final_reflexos;
    document.getElementById('label-vontade').innerText = final_vontade;

    fetch("../json/caminhos.json")
        .then((response) => response.json())
        .then((data) => {				
            const selectedCaminhos = data.caminhos.find((o) => o.name === selectedCaminho);
            displayHabilidades(selectedCaminhos.habilidades);
        })
        .catch((error) => {
            console.error("Erro ao carregar o arquivo JSON:", error);
        });
		
		if (selectedCaminho == "Caminho das Armas") {
			fetch("../json/classes_armas.json")
				.then((response) => response.json())
				.then((data) => {				
					const selectedClasses = data.classes_armas.find((o) => o.name === saveClasse);
					displayHabilidadesClasse(selectedClasses.habilidades);
				})
				.catch((error) => {
					console.error("Erro ao carregar o arquivo JSON:", error);
				});
		}
		if (selectedCaminho == "Caminho da Sabedoria") {
			fetch("../json/classes_sabedoria.json")
				.then((response) => response.json())
				.then((data) => {				
					const selectedClasses = data.classes_sabedoria.find((o) => o.name === saveClasse);
					displayHabilidadesClasse(selectedClasses.habilidades);
				})
				.catch((error) => {
					console.error("Erro ao carregar o arquivo JSON:", error);
				});
		}
		if (selectedCaminho == "Caminho do Subterfúgio") {
			fetch("../json/classes_subterfugio.json")
				.then((response) => response.json())
				.then((data) => {				
					const selectedClasses = data.classes_subterfugio.find((o) => o.name === saveClasse);
					displayHabilidadesClasse(selectedClasses.habilidades);
				})
				.catch((error) => {
					console.error("Erro ao carregar o arquivo JSON:", error);
				});
		}
			
			function displayHabilidades(habilidades) {
				const habilidadesRow = document.getElementById("habilidades-row");
				habilidadesRow.innerHTML = ''; // Limpa conteúdo anterior

				habilidades.forEach((habilidade) => {
					const habilidadeColNome = createColumn(habilidade.name, "col-2 text-center");
					const habilidadeColLevel = createColumn(habilidade.level, "col-1 text-center");
					const habilidadeColTipo = createColumn(habilidade.tipo, "col-1 text-center");
					const habilidadeColCusto = createColumn(habilidade.custo, "col-1 text-center");
					const habilidadeColCooldown = createColumn(habilidade.cooldown, "col-1 text-center");
					const habilidadeColDescricao = createColumn(habilidade.description.replace(/\n/g, '<br>'), "col-6 habilidade-descricao-justify");

					const habilidadeRow = document.createElement("div");
					habilidadeRow.classList.add("row", "habilidade-row");

					habilidadeRow.appendChild(habilidadeColNome);
					habilidadeRow.appendChild(habilidadeColLevel);
					habilidadeRow.appendChild(habilidadeColTipo);
					habilidadeRow.appendChild(habilidadeColCusto);
					habilidadeRow.appendChild(habilidadeColCooldown);
					habilidadeRow.appendChild(habilidadeColDescricao);

					habilidadesRow.appendChild(habilidadeRow);
				});
			}
			
			function displayHabilidadesClasse(habilidades) {
				const habilidadesRow = document.getElementById("habilidades-classe-row");
				habilidadesRow.innerHTML = ''; // Limpa conteúdo anterior

				habilidades.forEach((habilidade) => {
					const habilidadeColNome = createColumn(habilidade.name, "col-2 text-center");
					const habilidadeColLevel = createColumn(habilidade.level, "col-1 text-center");
					const habilidadeColTipo = createColumn(habilidade.tipo, "col-1 text-center");
					const habilidadeColCusto = createColumn(habilidade.custo, "col-1 text-center");
					const habilidadeColCooldown = createColumn(habilidade.cooldown, "col-1 text-center");
					const habilidadeColDescricao = createColumn(habilidade.description.replace(/\n/g, '<br>'), "col-6 habilidade-descricao-justify");

					const habilidadeRow = document.createElement("div");
					habilidadeRow.classList.add("row", "habilidade-row");

					habilidadeRow.appendChild(habilidadeColNome);
					habilidadeRow.appendChild(habilidadeColLevel);
					habilidadeRow.appendChild(habilidadeColTipo);
					habilidadeRow.appendChild(habilidadeColCusto);
					habilidadeRow.appendChild(habilidadeColCooldown);
					habilidadeRow.appendChild(habilidadeColDescricao);

					habilidadesRow.appendChild(habilidadeRow);
				});
			}

			function createColumn(content, className) {
				const col = document.createElement("div");
				col.className = className;
				col.innerHTML = content;
				return col;
			}
			document.getElementById('comecar-button').addEventListener('click', resetPage);
        

        function displaySavedPericias(periciasArray, title) {
            const container = document.getElementById('saved-pericias-container');

            if (periciasArray.length > 0) {
               
                const titleElement = document.createElement('h4');
                titleElement.textContent = title;
                container.appendChild(titleElement);

               
                const listElement = document.createElement('ul');
                listElement.classList.add('pericias-list'); 
                container.appendChild(listElement);

              
                periciasArray.forEach(pericia => {
                  
                    if (pericia.endsWith('x')) {
                        pericia = pericia.slice(0, -1); 
                    }

                    const listItem = document.createElement('li');
                    listItem.textContent = pericia; 
                    listItem.addEventListener('click', function() {
                    });

                    listElement.appendChild(listItem);
                });
            }
        }
		
		
	function resetPage() {
    // Clear localStorage
    localStorage.clear();
    
    // Optionally, redirect to a fresh page or reset elements on the current page
    window.location.href = 'index.html'; // Reload the page
}
});
