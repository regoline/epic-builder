let selectedOrigin = localStorage.getItem('selectedOrigin');
    let selectedRace = localStorage.getItem('selectedRace');
	let raceImage = localStorage.getItem('selectedRace');
    let selectedCaminho = localStorage.getItem('selectedCaminho');
    let savePilha = localStorage.getItem('savePilha');
    let saveFortitude = localStorage.getItem('saveFortitude');
    let saveReflexo = localStorage.getItem('saveReflexo');
    let saveVontade = localStorage.getItem('saveVontade');
    let caminhosPontosPericia = localStorage.getItem('caminhosPontosPericia');
    let saveClasse = localStorage.getItem('saveClasse');
    let savePassado = localStorage.getItem('savePassado');
	let saveCaracteristica = localStorage.getItem('saveCaracteristica');

	document.getElementById('raceImage').src = `img/racas/${raceImage}.jpg`;
    document.getElementById('selected-origin').innerText = localStorage.getItem('selectedOrigin');
    document.getElementById('selected-race').innerText = localStorage.getItem('selectedRace');
    document.getElementById('selected-caminho').innerText = localStorage.getItem('selectedCaminho');
    document.getElementById('save-pilha').innerText = localStorage.getItem('savePilha');
    document.getElementById('save-fortitude').innerText = localStorage.getItem('saveFortitude');
    document.getElementById('save-reflexo').innerText = localStorage.getItem('saveReflexo');
    document.getElementById('save-vontade').innerText = localStorage.getItem('saveVontade');
    document.getElementById('selected-classe').innerText = localStorage.getItem('saveClasse');
	document.getElementById('selected-passado').innerText = localStorage.getItem('savePassado');
	document.getElementById('selected-caracteristica').innerText = localStorage.getItem('saveCaracteristica');
	
	fetch("../json/caminhos.json")
            .then((response) => response.json())
            .then((data) => {				
				const habilidadeNome = document.getElementById("hab_nome");
				const habilidadeLevel = document.getElementById("hab_level");
				const habilidadeTipo = document.getElementById("hab_tipo");
				const habilidadeCusto = document.getElementById("hab_custo");
				const habilidadeCooldown = document.getElementById("hab_cooldown");
				const habilidadeDescricao = document.getElementById("hab_descricao");
				const selectedCaminhos = data.caminhos.find((o) => o.name === selectedCaminho);
				
				displayHabilidades(selectedCaminhos.habilidades);
				})
			 .catch((error) => {
                console.error("Erro ao carregar o arquivo JSON:", error);
            });
		
		if (selectedCaminho == "Caminho das Armas")
		{
			fetch("../json/classes_armas.json")
				.then((response) => response.json())
				.then((data) => {				
					const habilidadeNome = document.getElementById("hab_nome");
					const habilidadeLevel = document.getElementById("hab_level");
					const habilidadeTipo = document.getElementById("hab_tipo");
					const habilidadeCusto = document.getElementById("hab_custo");
					const habilidadeCooldown = document.getElementById("hab_cooldown");
					const habilidadeDescricao = document.getElementById("hab_descricao");
					const selectedClasses = data.classes_armas.find((o) => o.name === saveClasse);
					
					displayHabilidadesClasse(selectedClasses.habilidades);
					})
				 .catch((error) => {
					console.error("Erro ao carregar o arquivo JSON:", error);
				});
		}
		if (selectedCaminho == "Caminho da Sabedoria")
		{
			fetch("../json/classes_sabedoria.json")
				.then((response) => response.json())
				.then((data) => {				
					const habilidadeNome = document.getElementById("hab_nome");
					const habilidadeLevel = document.getElementById("hab_level");
					const habilidadeTipo = document.getElementById("hab_tipo");
					const habilidadeCusto = document.getElementById("hab_custo");
					const habilidadeCooldown = document.getElementById("hab_cooldown");
					const habilidadeDescricao = document.getElementById("hab_descricao");
					const selectedClasses = data.classes_sabedoria.find((o) => o.name === saveClasse);
					
					displayHabilidadesClasse(selectedClasses.habilidades);
					})
				 .catch((error) => {
					console.error("Erro ao carregar o arquivo JSON:", error);
				});
		}
		if (selectedCaminho == "Caminho do Subterfúgio")
		{
			fetch("../json/classes_subterfugio.json")
				.then((response) => response.json())
				.then((data) => {				
					const habilidadeNome = document.getElementById("hab_nome");
					const habilidadeLevel = document.getElementById("hab_level");
					const habilidadeTipo = document.getElementById("hab_tipo");
					const habilidadeCusto = document.getElementById("hab_custo");
					const habilidadeCooldown = document.getElementById("hab_cooldown");
					const habilidadeDescricao = document.getElementById("hab_descricao");
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
					const habilidadeColNome = createColumn(habilidade.name, "col-2");
					const habilidadeColLevel = createColumn(habilidade.level, "col-1");
					const habilidadeColTipo = createColumn(habilidade.tipo, "col-1");
					const habilidadeColCusto = createColumn(habilidade.custo, "col-1");
					const habilidadeColCooldown = createColumn(habilidade.cooldown, "col-1");
					const habilidadeColDescricao = createColumn(habilidade.description, "col-6");

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
					const habilidadeColNome = createColumn(habilidade.name, "col-2");
					const habilidadeColLevel = createColumn(habilidade.level, "col-1");
					const habilidadeColTipo = createColumn(habilidade.tipo, "col-1");
					const habilidadeColCusto = createColumn(habilidade.custo, "col-1");
					const habilidadeColCooldown = createColumn(habilidade.cooldown, "col-1");
					const habilidadeColDescricao = createColumn(habilidade.description, "col-6");

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

			function createColumn(content, columnClass) {
				const column = document.createElement("div");
				column.classList.add(columnClass, "habilidade-col", "text-center");

				
				column.textContent = content;

				return column;
			}
	
	
        document.addEventListener('DOMContentLoaded', function() {
            // Retrieve saved perícias from localStorage
            const periciasPrimarias = JSON.parse(localStorage.getItem('periciasPrimarias')) || [];
            const periciasSecundarias = JSON.parse(localStorage.getItem('periciasSecundarias')) || [];
            const periciasTerciarias = JSON.parse(localStorage.getItem('periciasTerciarias')) || [];

            // Display saved perícias
            displaySavedPericias(periciasPrimarias, 'Perícias Primárias');
            displaySavedPericias(periciasSecundarias, 'Perícias Secundárias');
            displaySavedPericias(periciasTerciarias, 'Perícias Terciárias');
        });

        function displaySavedPericias(periciasArray, title) {
            const container = document.getElementById('saved-pericias-container');

            if (periciasArray.length > 0) {
                // Create title for the section
                const titleElement = document.createElement('h4');
                titleElement.textContent = title;
                container.appendChild(titleElement);

                // Create list to hold perícias
                const listElement = document.createElement('ul');
                listElement.classList.add('pericias-list'); // Adding a class for styling
                container.appendChild(listElement);

                // Add perícias to the list
                periciasArray.forEach(pericia => {
                    // Remove the last character from pericia if it's 'x'
                    if (pericia.endsWith('x')) {
                        pericia = pericia.slice(0, -1); // Remove the last character
                    }

                    const listItem = document.createElement('li');
                    listItem.textContent = pericia; // Display modified pericia name

                    // Optionally, add a hover effect or other styles if needed

                    listItem.addEventListener('click', function() {
                        // Handle removal if needed
                        // For example: removePericia(pericia);
                    });

                    listElement.appendChild(listItem);
                });
            }
            // If periciasArray is empty, do not display anything for this section
        }
		
		function goBack() {
        window.history.back();
    }
