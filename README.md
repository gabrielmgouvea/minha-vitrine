# Minha Vitrine - Vitrine Virtual MVP

## Descrição

Minha Vitrine é uma plataforma de vitrine virtual que conecta pessoas aos melhores estabelecimentos e eventos da cidade. 

### Funcionalidades Principais

- ✅ Sistema de autenticação (Login/Registro)
- ✅ Cadastro de estabelecimentos (apenas para DEVs/Admins)
- ✅ Cadastro de eventos
- ✅ Categorização de estabelecimentos (Moda, Gastronomia, Farmácia, Mercado, Lanchonete, etc.)
- ✅ Sistema de favoritos
- ✅ Avaliações e comentários
- ✅ Mapa interativo
- ✅ Busca de estabelecimentos
- ✅ Design moderno e responsivo

## Tecnologias Utilizadas

- **Backend**: Django 4.2.7
- **Frontend**: HTML5, CSS3, JavaScript
- **Banco de Dados**: SQLite (desenvolvimento)
- **Fontes**: Inter, Poppins (Google Fonts)
- **Ícones**: Font Awesome 6

## Instalação

### 1. Criar ambiente virtual

```bash
python -m venv venv
```

### 2. Ativar ambiente virtual

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/Mac:**
```bash
source venv/bin/activate
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Aplicar migrações

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Criar superusuário (DEV/Admin)

```bash
python manage.py createsuperuser
```

### 6. Criar dados iniciais (categorias)

```bash
python manage.py shell
```

Depois execute:

```python
from apps.core.models import Categoria

categorias = [
    {'nome': 'Moda', 'slug': 'moda', 'ordem': 1},
    {'nome': 'Gastronomia', 'slug': 'gastronomia', 'ordem': 2},
    {'nome': 'Farmácia', 'slug': 'farmacia', 'ordem': 3},
    {'nome': 'Mercado', 'slug': 'mercado', 'ordem': 4},
    {'nome': 'Lanchonete', 'slug': 'lanchonete', 'ordem': 5},
    {'nome': 'Eventos', 'slug': 'eventos', 'ordem': 6},
    {'nome': 'Outros', 'slug': 'outros', 'ordem': 7},
]

for cat_data in categorias:
    Categoria.objects.get_or_create(**cat_data)

exit()
```

### 7. Marcar seu usuário como DEV

Após criar o superusuário, você precisa marcar o perfil como desenvolvedor:

```bash
python manage.py shell
```

Depois execute:

```python
from django.contrib.auth.models import User
from apps.core.models import Profile

user = User.objects.get(username='seu_username')  # substitua pelo seu username
user.profile.is_dev = True
user.profile.save()
exit()
```

### 8. Executar servidor

```bash
python manage.py runserver
```

Acesse: http://127.0.0.1:8000/

## Estrutura do Projeto

```
Minha-Vitrine/
├── manage.py                 # Entrada Django
├── config/                   # Camada de configuração (settings, urls, wsgi)
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   └── core/                 # Camada de aplicação (models, views, forms)
│       ├── models.py
│       ├── views.py
│       ├── urls.py
│       ├── forms.py
│       ├── admin.py
│       ├── signals.py
│       └── management/commands/
├── templates/                # Camada de apresentação (HTML)
│   ├── base.html
│   └── core/
├── static/                   # Assets (CSS, JS, imagens)
│   ├── css/
│   ├── js/
│   └── images/
├── media/                    # Uploads de usuários
├── docs/                     # Documentação do projeto
├── scripts/                  # Scripts utilitários (setup.py)
├── deploy/                   # Docker e variáveis de ambiente
└── _revisar/                 # Arquivos suspeitos para você revisar
```

Documentação adicional: `docs/INICIO_RAPIDO.md`

## Uso

### Como usuário comum:

1. Crie uma conta ou faça login
2. Navegue pelas categorias
3. Favorite seus estabelecimentos preferidos
4. Deixe avaliações
5. Explore o mapa interativo
6. Veja eventos da cidade

### Como DEV/Admin:

1. Acesse o painel administrativo em `/admin/`
2. Cadastre novos estabelecimentos
3. Cadastre eventos
4. Gerencie categorias
5. Modere avaliações

## Personalização

### Cores

As cores principais estão definidas no arquivo `static/css/style.css`:

```css
:root {
    --primary-color: #17C3B2;    /* Verde água */
    --secondary-color: #227C9D;   /* Azul */
    --dark-color: #2C2C2C;        /* Preto suave */
}
```

### Categorias

Para adicionar novas categorias, acesse o admin Django e crie uma nova categoria.

## Melhorias Futuras

- [ ] Integração com Google Maps API
- [ ] Sistema de notificações
- [ ] Chat online
- [ ] Sistema de cupons/promoções
- [ ] App mobile
- [ ] API REST
- [ ] Sistema de recomendações
- [ ] Histórico de visualizações

## Licença

Este é um projeto MVP para fins educacionais.

## Contato

Para mais informações, entre em contato através do painel administrativo.

