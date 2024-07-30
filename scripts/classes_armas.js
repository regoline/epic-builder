let selectedOrigin = localStorage.getItem('selectedOrigin');
		let selectedRace = localStorage.getItem('selectedRace');
		let selectedCaminho = localStorage.getItem('selectedCaminho');
		let savePilha = localStorage.getItem('savePilha');
		let saveFortitude = localStorage.getItem('saveFortitude');
		let saveReflexo = localStorage.getItem('saveReflexo');
		let saveVontade = localStorage.getItem('saveVontade');
		let caminhosPontosPericia = localStorage.getItem('caminhosPontosPericia');
		let saveClasse = localStorage.getItem('saveClasse');
				
		document.getElementById('selected-origin').innerText = localStorage.getItem('selectedOrigin');
        document.getElementById('selected-race').innerText = localStorage.getItem('selectedRace');
		document.getElementById('selected-caminho').innerText = localStorage.getItem('selectedCaminho');
		document.getElementById('save-pilha').innerText = localStorage.getItem('savePilha');
        document.getElementById('save-fortitude').innerText = localStorage.getItem('saveFortitude');
		document.getElementById('save-reflexo').innerText = localStorage.getItem('saveReflexo');
        document.getElementById('save-vontade').innerText = localStorage.getItem('saveVontade');
		document.getElementById('caminhos-pontos-pericia').innerText = localStorage.getItem('caminhosPontosPericia');
		
		fetch("../json/classes_armas.json")
            .then((response) => response.json())
            .then((data) => {
                // Selecione o container onde os botões de rádio serão exibidos
                const classesContainer = document.getElementById("classes-container"); // Seleciona os povos
                const descriptionContainer = document.getElementById("description-container");
                const classeImage = document.getElementById("classe-image"); // Seleciona a imagem
				const habilidadeNome = document.getElementById("hab_nome");
				const habilidadeLevel = document.getElementById("hab_level");
				const habilidadeTipo = document.getElementById("hab_tipo");
				const habilidadeCusto = document.getElementById("hab_custo");
				const habilidadeCooldown = document.getElementById("hab_cooldown");
				const habilidadeDescricao = document.getElementById("hab_descricao");
				saveClasse = document.getElementById("selected-classe");
				
				const filteredClasses = data.classes_armas.filter(classe => {
					return classe.exclusividade.includes("") || classe.exclusividade.includes(selectedOrigin);
				});
				
                // Cria os botões com base nos dados do arquivo JSON
                filteredClasses.forEach((classe, index) => {
                    const radioInput = document.createElement("input");
                    radioInput.type = "radio";
                    radioInput.name = "classe"; // Nome do grupo de botões
                    radioInput.value = classe.name; // Valor do botão
					radioInput.classList.add("form-check-input");
                    
                    const label = document.createElement("label");
                    label.textContent = classe.name; // Texto do botão
					label.classList.add("form-check-label");
					
					classesContainer.appendChild(radioInput);
                    classesContainer.appendChild(label);
                    classesContainer.appendChild(document.createElement("br")); // Quebra de linha

                    // Adicione o atributo "checked" ao primeiro botão
                    if (index === 0) {
                        radioInput.checked = true;
                        // Exibe a descrição e a imagem do primeiro povo por padrão
                        descriptionContainer.innerHTML = classe.description.replace(/\n/g, '<br>');
                        classeImage.src = `img/classes/armas/${classe.imagem}`;
						setTimeout(() => {
							radioInput.dispatchEvent(new Event("change"));
						}, 0);
					}
                    // Adicione um ouvinte de evento para cada botão
                    radioInput.addEventListener("change", () => {
                        // Encontre a origem selecionada
                        const selectedClasse = data.classes_armas.find((o) => o.name === radioInput.value);
						const outputElement = document.getElementById("selected-classe");
						outputElement.innerHTML = selectedClasse.name;
						
                        // Exiba a descrição no container
                        descriptionContainer.innerHTML = selectedClasse.description.replace(/\n/g, '<br>');
                        // Atualize a imagem com o caminho correto
                        classeImage.src = `img/classes/armas/${selectedClasse.imagem}`;
						displayHabilidades(selectedClasse.habilidades);
                    });
                });
            })
            .catch((error) => {
                console.error("Erro ao carregar o arquivo JSON:", error);
            });
			
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

		function createColumn(content, columnClass) {
			const column = document.createElement("div");
			column.classList.add(...columnClass.split(' '));
			column.innerHTML = content;
			return column;
		}

		
		function saveSelection() 
		{
			//const selectedOrigin = document.querySelector('input[name="origin"]:checked').value;
			//const selectedRace = document.querySelector('input[name="race"]:checked').value;
			const selectedClasse = document.querySelector('input[name="classe"]:checked').value;
			
			localStorage.setItem('selectedOrigin', selectedOrigin);
			localStorage.setItem('selectedRace', selectedRace);
			localStorage.setItem('selectedCaminho', selectedCaminho);
			localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia);
			localStorage.setItem('savePilha', savePilha);
			localStorage.setItem('saveFortitude', saveFortitude);
			localStorage.setItem('saveReflexo', saveReflexo);
			localStorage.setItem('saveVontade', saveVontade);
			localStorage.setItem('saveClasse', selectedClasse);
			
			
			window.location.href = 'passados.html';
		}
		function goBack() {
		  window.history.back();
		}