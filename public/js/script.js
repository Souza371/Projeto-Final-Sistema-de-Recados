document.addEventListener('DOMContentLoaded', function() {
    const recadoForm = document.getElementById('recadoForm');
    const listaRecados = document.getElementById('listaRecados');
    
    // Carregar recados do localStorage
    let recados = JSON.parse(localStorage.getItem('recados')) || [];
    
    // Renderizar recados
    function renderizarRecados() {
        listaRecados.innerHTML = '';
        
        if (recados.length === 0) {
            listaRecados.innerHTML = '<p class="text-muted text-center">Nenhum recado cadastrado ainda.</p>';
            return;
        }
        
        recados.forEach((recado, index) => {
            const recadoElement = document.createElement('div');
            recadoElement.className = 'list-group-item mb-2 rounded';
            recadoElement.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">De: ${recado.remetente}</h5>
                    <small>${recado.data}</small>
                </div>
                <p class="mb-1"><strong>Para:</strong> ${recado.destinatario}</p>
                <p class="mb-1">${recado.mensagem}</p>
                <button class="btn btn-outline-danger btn-sm mt-2" data-index="${index}">Excluir</button>
            `;
            
            listaRecados.appendChild(recadoElement);
        });
        
        // Adicionar eventos aos botões de excluir
        document.querySelectorAll('[data-index]').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                excluirRecado(index);
            });
        });
    }
    
    // Adicionar novo recado
    recadoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const remetente = document.getElementById('remetente').value.trim();
        const destinatario = document.getElementById('destinatario').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validação simples
        if (!remetente || !destinatario || !mensagem) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Criar novo recado
        const novoRecado = {
            remetente,
            destinatario,
            mensagem,
            data: new Date().toLocaleString()
        };
        
        recados.push(novoRecado);
        localStorage.setItem('recados', JSON.stringify(recados));
        
        // Limpar formulário
        recadoForm.reset();
        
        // Renderizar novamente
        renderizarRecados();
        
        // Efeito visual com jQuery (bônus)
        $('#listaRecados').hide().fadeIn(500);
    });
    
    // Excluir recado
    function excluirRecado(index) {
        if (confirm('Tem certeza que deseja excluir este recado?')) {
            recados.splice(index, 1);
            localStorage.setItem('recados', JSON.stringify(recados));
            renderizarRecados();
        }
    }
    
    // Renderizar inicialmente
    renderizarRecados();
});