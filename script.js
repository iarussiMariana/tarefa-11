const URL_API = "https://6734abe5a042ab85d11b2a63.mockapi.io/animais/animais_teste";

async function buscarAnimais() {
  try {
    const resposta = await fetch(URL_API);
    const animais = await resposta.json();
    const listaAnimais = document.getElementById("lista-animais");

    listaAnimais.innerHTML = ""; 

    animais.forEach((animal) => {
      const itemLista = document.createElement("li");
      itemLista.textContent = `${animal.id} - ${animal.nome} (${animal.idade} anos) – ${animal.raca}`;
      listaAnimais.appendChild(itemLista);
    });
  } catch (erro) {
    console.error("Erro ao buscar animais:", erro);
  }
}

async function adicionarAnimal() {
  const novoAnimal = {
    nome: "Berry",
    idade: 8,
    raca: "Cavalier King Charles Spaniel",
  };

  try {
    const resposta = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoAnimal),
    });

    if (resposta.ok) {
      buscarAnimais(); 
    } else {
      throw new Error("Erro ao cadastrar animal.");
    }
  } catch (erro) {
    console.error(erro);
  }
}

document.getElementById("botao-adicionar-animal").addEventListener("click", adicionarAnimal);

buscarAnimais();
