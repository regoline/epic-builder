let selectedOrigin = localStorage.getItem('selectedOrigin');
		let selectedRace = localStorage.getItem('selectedRace');
		let selectedCaminho = localStorage.getItem('selectedCaminho');
		let savePilha = localStorage.getItem('savePilha');
		let saveFortitude = localStorage.getItem('saveFortitude');
		let saveReflexo = localStorage.getItem('saveReflexo');
		let saveVontade = localStorage.getItem('saveVontade');
		let caminhosPontosPericia = localStorage.getItem('caminhosPontosPericia');
		let saveClasse = localStorage.getItem('saveClasse');
		let savePassado = document.getElementById("selected-passado");
		let selectedPassado;
		let savePassadoSkill;
				
		document.getElementById('selected-origin').innerText = localStorage.getItem('selectedOrigin');
        document.getElementById('selected-race').innerText = localStorage.getItem('selectedRace');
		document.getElementById('selected-caminho').innerText = localStorage.getItem('selectedCaminho');
		document.getElementById('save-pilha').innerText = localStorage.getItem('savePilha');
        document.getElementById('save-fortitude').innerText = localStorage.getItem('saveFortitude');
		document.getElementById('save-reflexo').innerText = localStorage.getItem('saveReflexo');
        document.getElementById('save-vontade').innerText = localStorage.getItem('saveVontade');
		document.getElementById('caminhos-pontos-pericia').innerText = localStorage.getItem('caminhosPontosPericia');
		document.getElementById('selected-classe').innerText = localStorage.getItem('saveClasse');
		
		
		fetch("../json/passados.json")
            .then((response) => response.json())
            .then((data) => {
                // Selecione o container onde os botões de rádio serão exibidos
                const passadosContainer = document.getElementById("passados-container"); // Seleciona os povos
                const descriptionContainer = document.getElementById("description-container"); // Seleciona a descrição
                const passadoImage = document.getElementById("passado-image"); // Seleciona a imagem
				const passadoNome = document.getElementById("passado-nome");
				const passadoVantagem = document.getElementById("passado-vantagem");
				savePassado = document.getElementById("selected-passado");
				
				const filteredPassados = data.passados.filter(passado => {
					return passado.exclusividade.includes("") || passado.exclusividade.includes(selectedOrigin);
				});
				
                // Cria os botões com base nos dados do arquivo JSON
                filteredPassados.forEach((passado, index) => {
                    const radioInput = document.createElement("input");
                    radioInput.type = "radio";
                    radioInput.name = "passado"; // Nome do grupo de botões
                    radioInput.value = passado.name; // Valor do botão
					radioInput.classList.add("form-check-input");
                    
                    const label = document.createElement("label");
                    label.textContent = passado.name; // Texto do botão
					label.classList.add("form-check-label");
					
					passadosContainer.appendChild(radioInput);
                    passadosContainer.appendChild(label);
                    passadosContainer.appendChild(document.createElement("br")); // Quebra de linha

                    // Adicione o atributo "checked" ao primeiro botão
                    if (index === 0) {
                        radioInput.checked = true;
                        // Exibe a descrição e a imagem do primeiro povo por padrão
                        descriptionContainer.textContent = passado.description;
						passadoVantagem.textContent = passado.vantagem;
						savePassadoSkill = passado.skill;
                        passadoImage.src = `img/passados/${passado.imagem}`;
						setTimeout(() => {
							radioInput.dispatchEvent(new Event("change"));
						}, 0);
					}
                    // Adicione um ouvinte de evento para cada botão
                    radioInput.addEventListener("change", () => {
                        // Encontre a origem selecionada
                        selectedPassado = data.passados.find((o) => o.name === radioInput.value);
						const outputElement = document.getElementById("selected-passado");
						outputElement.innerHTML = selectedPassado.name;
						
                        // Exiba a descrição no container
                        descriptionContainer.textContent = selectedPassado.description;
						document.getElementById("passado-vantagem").textContent = passado.vantagem;
						passadoVantagem.textContent = selectedPassado.vantagem;
						savePassadoSkill = passado.skill;
                        // Atualize a imagem com o caminho correto
                        passadoImage.src = `img/passados/${selectedPassado.imagem}`;
                    });
                });
            })
            .catch((error) => {
                console.error("Erro ao carregar o arquivo JSON:", error);
            });
		function createColumn(content, columnClass) {
				const column = document.createElement("div");
				column.classList.add(columnClass, "habilidade-col", "text-center");

				
				column.textContent = content;

				return column;
		}
		
		function saveSelection() 
		{
			//const selectedOrigin = document.querySelector('input[name="origin"]:checked').value;
			//const selectedRace = document.querySelector('input[name="race"]:checked').value;
			//const selectedPassado = document.querySelector('input[name="passado"]:checked').value;
			
			localStorage.setItem('selectedOrigin', selectedOrigin);
			localStorage.setItem('selectedRace', selectedRace);
			localStorage.setItem('selectedCaminho', selectedCaminho);
			localStorage.setItem('caminhosPontosPericia', caminhosPontosPericia);
			localStorage.setItem('savePilha', savePilha);
			localStorage.setItem('saveFortitude', saveFortitude);
			localStorage.setItem('saveReflexo', saveReflexo);
			localStorage.setItem('saveVontade', saveVontade);
			localStorage.setItem('savePassado', savePassado.innerText);
			localStorage.setItem('savePassadoSkill', savePassadoSkill);
			
			
			window.location.href = 'caracteristicas.html';
		}
		function goBack() {
		  window.history.back();
		}