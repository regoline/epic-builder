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
	
	let final_str = localStorage.getItem('end-str');
	let final_dex = localStorage.getItem('end-dex');
	let final_int = localStorage.getItem('end-int');
	let final_vida = localStorage.getItem('end-vida');
	let final_stamina = localStorage.getItem('end-stamina');
	let final_mana = localStorage.getItem('end-mana');
	let final_fort_frio = localStorage.getItem('end-fort-frio');
	let final_fort_calor = localStorage.getItem('end-fort-calor');
	let final_fort_veneno = localStorage.getItem('end-fort-veneno');
	let final_reflexos = localStorage.getItem('end-reflexos');
	let final_vontade = localStorage.getItem('end-vontade');


	document.getElementById('raceImage').src = `img/racas/${raceImage}.png`;
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

			function createColumn(content, columnClass) {
				const column = document.createElement("div");
				column.classList.add(...columnClass.split(' '));
				column.innerHTML = content;
				return column;
			}
	
	
        document.addEventListener('DOMContentLoaded', function() {
            const periciasPrimarias = JSON.parse(localStorage.getItem('periciasPrimarias')) || [];
            const periciasSecundarias = JSON.parse(localStorage.getItem('periciasSecundarias')) || [];
            const periciasTerciarias = JSON.parse(localStorage.getItem('periciasTerciarias')) || [];

            displaySavedPericias(periciasPrimarias, 'Perícias Primárias');
            displaySavedPericias(periciasSecundarias, 'Perícias Secundárias');
            displaySavedPericias(periciasTerciarias, 'Perícias Terciárias');
			
			document.getElementById('voltar-button').addEventListener('click', goBack);
			document.getElementById('comecar-button').addEventListener('click', resetPage);
			document.getElementById('share-button').addEventListener('click', share);
        });

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
		
		function generateQueryString() {
			const params = new URLSearchParams({
				selectedOrigin: localStorage.getItem('selectedOrigin'),
				selectedRace: localStorage.getItem('selectedRace'),
				raceImage: localStorage.getItem('selectedRace'),
				selectedCaminho: localStorage.getItem('selectedCaminho'),
				savePilha: localStorage.getItem('savePilha'),
				saveFortitude: localStorage.getItem('saveFortitude'),
				saveReflexo: localStorage.getItem('saveReflexo'),
				saveVontade: localStorage.getItem('saveVontade'),
				caminhosPontosPericia: localStorage.getItem('caminhosPontosPericia'),
				saveClasse: localStorage.getItem('saveClasse'),
				savePassado: localStorage.getItem('savePassado'),
				saveCaracteristica: localStorage.getItem('saveCaracteristica'),
				final_str: localStorage.getItem('end-str'),
				final_dex: localStorage.getItem('end-dex'),
				final_int: localStorage.getItem('end-int'),
				final_vida: localStorage.getItem('end-vida'),
				final_stamina: localStorage.getItem('end-stamina'),
				final_mana: localStorage.getItem('end-mana'),
				final_fort_frio: localStorage.getItem('end-fort-frio'),
				final_fort_calor: localStorage.getItem('end-fort-calor'),
				final_fort_veneno: localStorage.getItem('end-fort-veneno'),
				final_reflexos: localStorage.getItem('end-reflexos'),
				final_vontade: localStorage.getItem('end-vontade'),

				periciasPrimarias: JSON.stringify(JSON.parse(localStorage.getItem('periciasPrimarias') || '[]')),
				periciasSecundarias: JSON.stringify(JSON.parse(localStorage.getItem('periciasSecundarias') || '[]')),
				periciasTerciarias: JSON.stringify(JSON.parse(localStorage.getItem('periciasTerciarias') || '[]'))
			
			});

			return params.toString();
		}
		const decodeTwice = (encodedStr) => decodeURIComponent(encodedStr);
		function share() {
			const queryString = generateQueryString();
			const baseURL = window.location.href.split('/').slice(0, -1).join('/') + '/build.html';
			const newURL = `${baseURL}?${queryString}`;
			
			alert('Link copiado!');
			
			navigator.clipboard.writeText(newURL).then(() => {
				console.log('Link copiado!');
			}).catch((err) => {
				console.error('Falhou: ', err);
			});
		}
		
	function goBack() {
        window.history.back();
    }
	function resetPage() {
    localStorage.clear();
    window.location.href = 'index.html';
}