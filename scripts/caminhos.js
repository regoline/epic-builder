let selectedOrigin = localStorage.getItem('selectedOrigin');
		let selectedRace = localStorage.getItem('selectedRace');
        document.getElementById('selected-origin').innerText = localStorage.getItem('selectedOrigin');
        document.getElementById('selected-race').innerText = localStorage.getItem('selectedRace');
		let savePilha;
		let saveFortitude;
		let saveReflexo;
		let saveVontade;
		let caminhosPontosPericia;
		
        // Carrega o arquivo JSON
        fetch("../json/caminhos.json")
            .then((response) => response.json())
            .then((data) => {				
                const caminhosContainer = document.getElementById("caminhos-container"); // Seleciona os povos
                const descriptionContainer = document.getElementById("caminhos-description-container"); // Seleciona a descrição
                const caminhosImage = document.getElementById("caminhos-image"); // Seleciona a imagem
				const caminhosPilha = document.getElementById("caminhos-pilha");
				const caminhosFortitude = document.getElementById("caminhos-fortitude");
				const caminhosReflexo = document.getElementById("caminhos-reflexo");
				const caminhosVontade = document.getElementById("caminhos-vontade");
				const caminhosSelected = document.getElementById("caminhos-selected");
				caminhosPontosPericia = document.getElementById("caminhos-pontos-pericia");
				const habilidadeNome = document.getElementById("hab_nome");
				const habilidadeLevel = document.getElementById("hab_level");
				const habilidadeTipo = document.getElementById("hab_tipo");
				const habilidadeCusto = document.getElementById("hab_custo");
				const habilidadeCooldown = document.getElementById("hab_cooldown");
				const habilidadeDescricao = document.getElementById("hab_descricao");
				const pericias1Container = document.getElementById("pericias1");
				const pericias2Container = document.getElementById("pericias2");
				const pericias3Container = document.getElementById("pericias3");
				const pericias4Container = document.getElementById("pericias4");
				
                // Cria os botões com base nos dados do arquivo JSON
                data.caminhos.forEach((caminhos, index) => {
                    const radioInput = document.createElement("input");
                    radioInput.type = "radio";
                    radioInput.name = "caminhos"; // Nome do grupo de botões
                    radioInput.value = caminhos.name; // Valor do botão
					radioInput.classList.add("form-check-input");
                    
                    const label = document.createElement("label");
                    label.textContent = caminhos.name; // Texto do botão
					label.classList.add("form-check-label");
					
					caminhosContainer.appendChild(radioInput);
                    caminhosContainer.appendChild(label);
                    caminhosContainer.appendChild(document.createElement("br")); // Quebra de linha
					
                    // Adicione o atributo "checked" ao primeiro botão
                    if (index === 0) {
                        radioInput.checked = true;
                        // Exibe a descrição e a imagem do primeiro povo por padrão
                        descriptionContainer.textContent = caminhos.description;
						caminhosPilha.textContent = caminhos.pilha_heroismo;
						savePilha = caminhos.pilha_heroismo;
						caminhosFortitude.textContent = caminhos.fortitude;
						saveFortitude = caminhos.fortitude;
						caminhosReflexo.textContent = caminhos.reflexo;
						saveReflexo = caminhos.reflexo;
						caminhosVontade.textContent = caminhos.vontade;
						saveVontade = caminhos.vontade;
						if (selectedRace == "Humano")
						{
							caminhosPontosPericia.textContent = caminhos.pontos_pericias + 2;
						}
						else
						{
							caminhosPontosPericia.textContent = caminhos.pontos_pericias;
						}
						caminhosSelected.textContent = caminhos.name;
                        caminhosImage.src = `img/caminhos/${caminhos.imagem}`;
						setTimeout(() => {
							radioInput.dispatchEvent(new Event("change"));
						}, 0);
					}
                    // Adicione um ouvinte de evento para cada botão
                    radioInput.addEventListener("change", () => {
                        // Encontre a origem selecionada
                        const selectedCaminhos = data.caminhos.find((o) => o.name === radioInput.value);
                        // Exiba a descrição no container
                        descriptionContainer.textContent = selectedCaminhos.description;
						caminhosPilha.textContent = selectedCaminhos.pilha_heroismo;
						savePilha = caminhos.pilha_heroismo;
						caminhosFortitude.textContent = caminhos.fortitude;
						saveFortitude = caminhos.fortitude;
						caminhosReflexo.textContent = caminhos.reflexo;
						saveReflexo = caminhos.reflexo;
						caminhosVontade.textContent = caminhos.vontade;
						saveVontade = caminhos.vontade;
						if (selectedRace == "Humano")
						{
							caminhosPontosPericia.textContent = caminhos.pontos_pericias + 2;
						}
						else
						{
							caminhosPontosPericia.textContent = caminhos.pontos_pericias;
						}
						caminhosSelected.textContent = selectedCaminhos.name;
                        caminhosImage.src = `img/caminhos/${selectedCaminhos.imagem}`;
						fetch('../json/pericias.json')
							.then(response => response.json())
							.then(data => {
								const periciasData = data.pericias;
								displayPericias(selectedCaminhos.pericias_1, pericias1Container, periciasData);
								displayPericias(selectedCaminhos.pericias_2, pericias2Container, periciasData);
								displayPericias(selectedCaminhos.pericias_3, pericias3Container, periciasData);
								displayPericias(selectedCaminhos.pericias_4, pericias4Container, periciasData);
							});
						displayHabilidades(selectedCaminhos.habilidades);
						
						if (selectedCaminhos.name === "Caminho das Armas") {
							fetch('../json/classes_armas.json')
							.then(response => response.json())
							.then(classesData => {
								displayClasses(classesData.classes_armas);
							});
						} 
						if (selectedCaminhos.name === "Caminho da Sabedoria") {
							fetch('../json/classes_sabedoria.json')
							.then(response => response.json())
							.then(classesData => {
								displayClasses(classesData.classes_sabedoria);
							});
						}
						if (selectedCaminhos.name === "Caminho do Subterfúgio") {
							fetch('../json/classes_subterfugio.json')
							.then(response => response.json())
							.then(classesData => {
								displayClasses(classesData.classes_subterfugio);
							});
						}	
					});
                });
            })
            .catch((error) => {
                console.error("Erro ao carregar o arquivo JSON:", error);
            });
			function displayClasses(classes) {
				const classesContainer = document.getElementById("classes-container");
				classesContainer.innerHTML = ''; // Limpa conteúdo anterior

				classes.forEach((classItem) => {
					if (classItem.exclusividade.includes("") || classItem.exclusividade.includes(selectedOrigin)) {
						const classLabel = document.createElement("label");
						classLabel.textContent = classItem.name;
						classesContainer.appendChild(classLabel);
						classesContainer.appendChild(document.createElement("br"));
					}
				});
			}
			
			function displayPericias(pericias, container, periciasData) {
				while (container.firstChild) {
					container.removeChild(container.firstChild);
				}
				
				pericias.forEach((periciaName, index) => {
					const perLabel = document.createElement("label");
					perLabel.textContent = periciaName;
					perLabel.addEventListener('mouseenter', function() {
						const pericia = periciasData.find(per => per.name === periciaName);
						if (pericia) {
							showDescription(event, pericia.description);
						}
					});
					
					perLabel.addEventListener('mouseleave', function() {
						hideDescription();
					});

					container.appendChild(perLabel);
					container.appendChild(document.createElement("br"));
				});
			}
			let descriptionBox; // Define descriptionBox globally
			function showDescription(event, description) {
				if (!descriptionBox) {
					descriptionBox = document.createElement("div");
					descriptionBox.style.position = "absolute";
					descriptionBox.style.backgroundColor = "white";
					descriptionBox.style.border = "1px solid black";
					descriptionBox.style.padding = "10px";
					descriptionBox.style.maxWidth = "500px";
					document.body.appendChild(descriptionBox);
				}

				descriptionBox.textContent = description;

				// Calculate initial positions
				let boxTop = event.clientY + 10;
				let boxLeft = event.clientX + 10;

				// Adjust if the box exceeds the bottom of the window
				let windowHeight = window.innerHeight;
				let boxHeight = descriptionBox.offsetHeight; // Get the height of the description box

				if (boxTop + boxHeight > windowHeight) {
					boxTop = windowHeight - boxHeight - 10; // Adjust so it stays within the window
				}

				descriptionBox.style.top = `${boxTop}px`;
				descriptionBox.style.left = `${boxLeft}px`;
			}
			
			function hideDescription() {
				if (descriptionBox) {
					descriptionBox.remove();
					descriptionBox = null;
				}
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
					const habilidadeColDescricao = createColumn(habilidade.description, "col-6 habilidade-descricao-justify");

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
				const selectedCaminho = document.querySelector('input[name="caminhos"]:checked').value;
				
				localStorage.setItem('selectedOrigin', selectedOrigin);
				localStorage.setItem('selectedRace', selectedRace);
				localStorage.setItem('selectedCaminho', selectedCaminho);
				localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia.textContent);
				localStorage.setItem('savePilha', savePilha);
				localStorage.setItem('saveFortitude', saveFortitude);
				localStorage.setItem('saveReflexo', saveReflexo);
				localStorage.setItem('saveVontade', saveVontade);
				
				if (selectedCaminho == "Caminho das Armas")
				{
					window.location.href = 'classes_armas.html';
				}
				if (selectedCaminho == "Caminho da Sabedoria")
				{
					window.location.href = 'classes_sabedoria.html';
				}
				if (selectedCaminho == "Caminho do Subterfúgio")
				{
					window.location.href = 'classes_subterfugio.html';
				}
			}
			
			function goBack() {
			  window.history.back();
			}