fetch("../json/povos.json")
	.then((response) => response.json())
	.then((data) => {
		// Selecione o container onde os botões de rádio serão exibidos
		const originsContainer = document.getElementById("origins-container"); // Seleciona os povos
		const descriptionContainer = document.getElementById("description-container"); // Seleciona a descrição
		const originImage = document.getElementById("origin-image"); // Seleciona a imagem
		const racesContainer = document.getElementById("races-container"); // Seleciona a raça
		const originLinguas = document.getElementById("origin-linguas");
		// Cria os botões com base nos dados do arquivo JSON
		data.povos.forEach((origin, index) => {
			const radioInput = document.createElement("input");
			radioInput.type = "radio";
			radioInput.name = "origin"; // Nome do grupo de botões
			radioInput.value = origin.name; // Valor do botão
			radioInput.classList.add("form-check-input");
			
			const label = document.createElement("label");
			label.textContent = origin.name; // Texto do botão
			label.classList.add("form-check-label");
			
			originsContainer.appendChild(radioInput);
			originsContainer.appendChild(label);
			originsContainer.appendChild(document.createElement("br")); // Quebra de linha

			// Adicione o atributo "checked" ao primeiro botão
			if (index === 0) {
				radioInput.checked = true;
				// Exibe a descrição e a imagem do primeiro povo por padrão
				descriptionContainer.textContent = origin.description;
				originLinguas.textContent = origin.linguas;
				originImage.src = `img/povos/${origin.imagem}`;
				setTimeout(() => {
					radioInput.dispatchEvent(new Event("change"));
				}, 0);
			}
			// Adicione um ouvinte de evento para cada botão
			radioInput.addEventListener("change", () => {
				// Encontre a origem selecionada
				const selectedOrigin = data.povos.find((o) => o.name === radioInput.value);
				const outputElement = document.getElementById("selected-origin");
				outputElement.innerHTML = selectedOrigin.name;
				
				// Exiba a descrição no container
				descriptionContainer.textContent = selectedOrigin.description;
				originLinguas.textContent = selectedOrigin.linguas;
				// Atualize a imagem com o caminho correto
				originImage.src = `img/povos/${selectedOrigin.imagem}`;
				displayRaces(selectedOrigin.racas, racesContainer);
			});
		});
	})
	.catch((error) => {
		console.error("Erro ao carregar o arquivo JSON:", error);
	});
	function displayRaces(races, container) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		races.forEach((race, index) => {
			const raceLabel = document.createElement("label");
			raceLabel.classList.add("form-check-label");
			raceLabel.textContent = race.name;

			// Crie um elemento de rádio para cada raça (opcional)
			const raceRadio = document.createElement("input");
			raceRadio.type = "radio";
			raceRadio.name = "race"; // Nome do grupo de raças (opcional)
			raceRadio.value = race.name; // Valor do rádio (opcional)
			raceRadio.classList.add("form-check-input");		
			raceRadio.addEventListener("change", () => {
				// Update the description when a new race is selected
				document.getElementById("race-description").textContent = race.description;
				document.getElementById("race-vantagem1").textContent = race.vantagem1;
				document.getElementById("race-vantagem2").textContent = race.vantagem2;
				document.getElementById("race-idade").textContent = race.idade;
				document.getElementById("selected-race").textContent = race.name;
				// Rest of your existing code...
			});		
			if (index === 0) {
				raceRadio.checked = true;
				document.getElementById("race-description").textContent = race.description;
				document.getElementById("race-vantagem1").textContent = race.vantagem1;
				document.getElementById("race-vantagem2").textContent = race.vantagem2;
				document.getElementById("race-idade").textContent = race.idade;
				document.getElementById("selected-race").textContent = race.name;
			}
			container.appendChild(raceRadio); // Adicione o rádio (opcional)
			container.appendChild(raceLabel);
			container.appendChild(document.createElement("br"));
		});
	}
	function saveSelection() 
	{
		const selectedOrigin = document.querySelector('input[name="origin"]:checked').value;
		const selectedRace = document.querySelector('input[name="race"]:checked').value;
		localStorage.setItem('selectedOrigin', selectedOrigin);
		localStorage.setItem('selectedRace', selectedRace);
		window.location.href = 'caminhos.html';
	}