function register() {
  const name = document.getElementById('registerName').value;
  const password = document.getElementById('registerPassword').value;

  if (!name || !password) {
    Swal.fire({
      title: "Atenção",
      text: "Preencha todos os campos!",
      icon: "warning"
    });
    return;
  }

  if (localStorage.getItem(name)) {
    Swal.fire({
      title: "Erro!",
      text: "O usuário já existe!",
      icon: "error"
    });
    return;
  }

  localStorage.setItem(name, JSON.stringify({ name, password }));
  Swal.fire({
    icon: 'success',
    title: 'Usuário cadastrado!',
    timer: 1500
  }).then(() => {
    window.location.href = 'index.html';
  });
}

function login() {
  const name = document.getElementById('loginName').value;
  const password = document.getElementById('loginPassword').value;
  const user = JSON.parse(localStorage.getItem(name));

  if (user && user.password === password) {
    Swal.fire({
      icon: 'success',
      title: 'Login realizado!',
      timer: 1500
    }).then(() => {
      window.location.href = 'produtos.html';
    });
  } else {
    Swal.fire({
      title: "Erro!",
      text: "Usuario ou senha invalidos!",
      icon: "error"
    });
  }
}

function filtrarProdutos(categoria) {
  const produtos = document.querySelectorAll('.produto');

  const termos = {
    'Politrizes': ['politriz', 'polimento'],
    'Furadeiras': ['furadeira', 'impacto', 'perfuração'],
    'Parafusadeiras': ['parafusadeira', 'parafuso'],
    'Serras': ['serra', 'mármore', 'corte'],
    'Outros': ['compressor', 'lixadeira']
  };

  produtos.forEach(produto => {
    const titulo = produto.querySelector('h3').textContent.toLowerCase();
    const descricao = produto.querySelector('small').textContent.toLowerCase();
    const conteudo = titulo + ' ' + descricao;

    if (!categoria || categoria === 'Todos') {
      produto.style.display = 'block';
      return;
    }

    const termosDaCategoria = termos[categoria] || [];
    const pertenceCategoria = termosDaCategoria.some(termo =>
        conteudo.includes(termo.toLowerCase())
    );

    if (pertenceCategoria) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const menuLinks = document.querySelectorAll('.menu a');

  menuLinks.forEach(link => {
    if (link.parentElement.className !== 'sair') {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        menuLinks.forEach(l => l.classList.remove('ativo'));
        this.classList.add('ativo');
        const categoria = this.textContent;

        filtrarProdutos(categoria);
      });
    }
  });

  filtrarProdutos('Todos');
});