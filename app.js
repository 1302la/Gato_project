function resetar() {
    // Limpa todas as seleções dos 3 alunos
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`nome${i}`).value = "";
        document.getElementById(`suco${i}`).value = "";
        document.getElementById(`animal${i}`).value = "";
    }
    document.getElementById("gif-gato").style.display = "none";
    document.getElementById("gif-confete").style.display = "none";
    document.getElementById("som-confetti").currentTime = 0;
    document.getElementById("som-festa").currentTime = 0;
    window.jaMostrouCelebracao = false;
    atualizarDisponibilidade(); // reativa todas as opções
}

function verificarRegras() {
    const alunos = [];
    for (let i = 1; i <= 3; i++) {
        alunos.push({
            nome: document.getElementById(`nome${i}`).value,
            suco: document.getElementById(`suco${i}`).value,
            animal: document.getElementById(`animal${i}`).value,
        });
    }

    const solucaoCorreta = [
        { nome: "davi", suco: "morango", animal: "cachorro" },
        { nome: "isa", suco: "uva", animal: "papagaio" },
        { nome: "bella", suco: "laranja", animal: "gato" }
    ];

    const incompleto = alunos.some(a => !a.nome || !a.suco || !a.animal);
    if (incompleto) {
        alert("Preencha todas as seleções antes de verificar!");
        return;
    }

    let correta = true;
    for (let i = 0; i < 3; i++) {
        const aluno = alunos[i];
        const esperado = solucaoCorreta[i];
        if (
            aluno.nome !== esperado.nome ||
            aluno.suco !== esperado.suco ||
            aluno.animal !== esperado.animal
        ) {
            correta = false;
            break;
        }
    }

    if (correta) {
    // Mostrar GIFs apenas uma vez por acerto
        if (!window.jaMostrouCelebracao) {
            document.getElementById("gif-gato").style.display = "block";
            document.getElementById("gif-confete").style.display = "block";

            const somConfetti = document.getElementById("som-confetti");
            const somFesta = document.getElementById("som-festa");

            if (somConfetti && somFesta) {
                somConfetti.currentTime = 0;
                somFesta.currentTime = 0;
                somConfetti.play().catch(console.error);
                somFesta.play().catch(console.error);
            }

            setTimeout(() => {
                document.getElementById("gif-gato").style.display = "none";
                document.getElementById("gif-confete").style.display = "none";
                window.jaMostrouCelebracao = false;
            }, 10000);

            window.jaMostrouCelebracao = true;
        }
    } else {
        alert("Ops, a solução está incorreta :(. Tente mais uma vez com atenção");
        document.getElementById("gif-gato").style.display = "none";
        document.getElementById("gif-confete").style.display = "none";
        window.jaMostrouCelebracao = false;
    }
}

function atualizarDisponibilidade() {
    atualizarGrupo("nome", ["davi", "isa", "bella"]);
    atualizarGrupo("suco", ["laranja", "uva", "morango"]);
    atualizarGrupo("animal", ["cachorro", "gato", "papagaio"]);
}

function atualizarGrupo(grupo, opcoes) {
    const usados = [];

    // Coletar opções já selecionadas
    for (let i = 1; i <= 3; i++) {
        const valor = document.getElementById(`${grupo}${i}`).value;
        if (valor) usados.push(valor);
    }

    // Atualizar os selects
    for (let i = 1; i <= 3; i++) {
        const select = document.getElementById(`${grupo}${i}`);
        const valorAtual = select.value;

        for (let j = 0; j < select.options.length; j++) {
            const opt = select.options[j];
            if (opt.value === "") {
                opt.disabled = false; // nunca desabilita a opção em branco
                continue;
            }

            if (opt.value === valorAtual) {
                opt.disabled = false; // manter a opção atual habilitada
            } else {
                opt.disabled = usados.includes(opt.value);
            }
        }
    }
}

// Adiciona ouvintes para todos os selects
window.onload = () => {
    for (let grupo of ["nome", "suco", "animal"]) {
        for (let i = 1; i <= 3; i++) {
            const select = document.getElementById(`${grupo}${i}`);
            if (select) {
                select.addEventListener("change", atualizarDisponibilidade);
            }
        }
    }
    atualizarDisponibilidade(); 
};
