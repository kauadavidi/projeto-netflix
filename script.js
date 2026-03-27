/* Script para alternar entre Dark Mode e Light Mode */

// Obter o botão de tema e o elemento html
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Função para aplicar o tema
function applyTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
  updateToggleState(theme);
}

// Função para atualizar o estado visual do toggle
function updateToggleState(theme) {
  if (theme === 'light') {
    themeToggle.classList.add('active');
  } else {
    themeToggle.classList.remove('active');
  }
}

// Função para atualizar o ícone do tema
function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.textContent = ''; // Ícone de lua (modo escuro ativo)
  } else {
    themeIcon.textContent = ''; // Ícone de sol (modo claro ativo)
  }
}

// Função para obter a preferência de tema do sistema
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Obter o tema salvo no localStorage ou usar o tema do sistema
const savedTheme = localStorage.getItem('theme');
const initialTheme = savedTheme || getSystemTheme();

// Aplicar o tema inicial
applyTheme(initialTheme);

// Adicionar listener ao botão de toggle
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// Observar mudanças nas preferências do sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Só aplicar automaticamente se não há tema salvo no localStorage
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(newTheme);
  }
});

// Salvar o perfil ativo no localStorage ao clicar em um perfil
const profileLinks = document.querySelectorAll('.profile-link');
profileLinks.forEach(link => {
  link.addEventListener('click', () => {
    const nome = link.dataset.perfilNome;
    const img = link.dataset.perfilImg;

    if (nome) {
      localStorage.setItem('perfilAtivoNome', nome);
    }

    if (img) {
      localStorage.setItem('perfilAtivoImagem', img);
    }
  });
});
