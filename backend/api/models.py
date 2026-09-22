from django.db import models
from django.utils.text import slugify

# --- COMERCIO ---
class Comercio(models.Model):
    CATEGORIAS_CHOICES = [
        ('MERCADO', 'Mercado'),
        ('FARMACIA', 'Farmácia'),
        ('PETSHOP', 'Pet-Shop'),
        ('VESTUARIO', 'Vestuário'),
        ('ELETRONICOS', 'Eletrônicos'),
        ('SERVICOS', 'Serviços'),
        ('VARIEDADES', 'Variedades'),
    ]

    nome = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True, help_text="Deixe em branco para preencher automaticamente")
    categoria = models.CharField(max_length=50, choices=CATEGORIAS_CHOICES, default='VARIEDADES')
    descricao = models.TextField(blank=True)
    bairro = models.CharField(max_length=50)
    endereco = models.CharField(max_length=255)
    telefone = models.CharField(max_length=20)
    foto = models.ImageField(upload_to='comercio/', null=True, blank=True)
    instagram = models.URLField(max_length=200, blank=True, null=True)
    destaque = models.BooleanField(default=False)

    # --- CAMPOS EXCLUSIVOS PLANO OURO ---
    horario_funcionamento = models.CharField(max_length=255, blank=True, null=True)
    link_cardapio = models.URLField(max_length=500, blank=True, null=True, help_text="Catálogo ou Site")
    foto_galeria_1 = models.ImageField(upload_to='galeria/comercio/', blank=True, null=True)
    foto_galeria_2 = models.ImageField(upload_to='galeria/comercio/', blank=True, null=True)
    foto_galeria_3 = models.ImageField(upload_to='galeria/comercio/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome).replace('-', '')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome

# --- TURISMO ---
class Turismo(models.Model):
    nome = models.CharField(max_length=200, default='Nome Aqui')
    slug = models.SlugField(unique=True, blank=True) # Ex: dedo-de-deus
    foto = models.ImageField(upload_to='turismo/', null=True, blank=True)
    bairro = models.CharField(max_length=100)
    endereco = models.CharField(max_length=200)
    introducao = models.TextField(max_length=200) # Texto curto para o card
    descricao_completa = models.TextField() # Texto longo com detalhes
    como_chegar = models.TextField() # Instruções específicas
    destaque = models.BooleanField(default=False)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome).replace('-', '')
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = "Ponto Turístico"
        verbose_name_plural = "Pontos Turísticos"

    def __str__(self):
        return self.nome
    
class TurismoFoto(models.Model):
    turismo = models.ForeignKey(Turismo, related_name='album', on_delete=models.CASCADE)
    arquivo = models.ImageField(upload_to='turismo/galeria/')
    CATEGORIAS_TUR = [
        ('CACHOEIRAS', 'Cachoeiras'),
        ('TRILHAS', 'Trilhas'),
        ('HISTORIA', 'História'),
        ('PARQUES', 'Parques'),
    ]

    nome = models.CharField(max_length=100, default='Sem Nome')
    categoria = models.CharField(max_length=20, choices=CATEGORIAS_TUR, default='CACHOEIRAS')
    subcategoria = models.CharField(max_length=50, blank=True, help_text="Ex: Oficina, Estética, Papelaria")
    
    # Imagem opcional para logo ou fachada
    foto = models.ImageField(upload_to='comercio/', blank=True, null=True, help_text="Upload da logo ou foto da fachada") 
    
    bairro = models.CharField(max_length=50, default="Centro")
    endereco = models.CharField(max_length=255, blank=True)
    telefone = models.CharField(max_length=20, null=True, blank=True)
    instagram = models.CharField(max_length=100, blank=True)
    destaque = models.BooleanField(default=False)
    criado_em = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    
    def __str__(self):
        return f"Foto de {self.turismo.nome}"

    @property
    def link_whatsapp(self):
        numero = ''.join(filter(str.isdigit, self.telefone))
        return f"https://wa.me/55{numero}?text=Olá, vi no Guia Guapimirim e gostaria de informações."

# --- GASTRONOMIA ---
class Gastronomia(models.Model):
    CATEGORIAS = [
        ('RESTAURANTE', 'Restaurante'),
        ('LANCHONETE', 'Lanchonete'),
        ('PIZZARIA', 'Pizzaria'),
        ('CAFE E PADARIA', 'Café / Padaria'),
        ('CERVEJARIA', 'Cervejaria / Bar'),
        ('SORVETERIA', 'Sorveteria / Doceria'),
        ('OUTROS', 'Outros'),
    ]

    nome = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    especialidade = models.CharField(max_length=200, help_text="Ex: Comida Caseira, Massas, Hambúrguer Artesanal")
    foto = models.ImageField(upload_to='gastronomia/', blank=True, null=True)
    bairro = models.CharField(max_length=50, default="Centro")
    endereco = models.CharField(max_length=255, blank=True)
    telefone = models.CharField(max_length=20)
    horario = models.CharField(max_length=100, null=True, blank=True)
    delivery = models.BooleanField(default=True)
    vegano_vegetariano = models.BooleanField(default=False, verbose_name="Opções Veg/Veggie")
    destaque = models.BooleanField(default=False)

    # --- CAMPOS EXCLUSIVOS PLANO OURO ---
    descricao = models.TextField(blank=True, null=True)
    link_cardapio = models.URLField(max_length=500, blank=True, null=True)
    instagram = models.CharField(max_length=100, blank=True, null=True)
    foto_galeria_1 = models.ImageField(upload_to='galeria/gastronomia/', blank=True, null=True)
    foto_galeria_2 = models.ImageField(upload_to='galeria/gastronomia/', blank=True, null=True)
    foto_galeria_3 = models.ImageField(upload_to='galeria/gastronomia/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome).replace('-', '')
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome

# --- HOSPEDAGEM ---
class Hospedagem(models.Model):
    TIPOS = [
        ('POUSADA', 'Pousada'),
        ('HOTEL', 'Hotel'),
        ('CHALE', 'Chalé'),
        ('CAMPING', 'Camping'),
    ]

    nome = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    tipo = models.CharField(max_length=20, choices=TIPOS, default='POUSADA')
    descricao = models.TextField(blank=True)
    foto = models.ImageField(upload_to='hospedagem/', blank=True, null=True)
    bairro = models.CharField(max_length=50, help_text="Ex: Barreira, Caneca Fina, Centro")
    endereco = models.CharField(max_length=255, blank=True)
    telefone = models.CharField(max_length=50, blank=True)
    site_reserva = models.URLField(blank=True, help_text="Link para Booking ou site próprio")
    cafe_da_manha = models.BooleanField(default=True)
    pet_friendly = models.BooleanField(default=False)
    piscina = models.BooleanField(default=False)
    destaque = models.BooleanField(default=False) # Adicionado campo destaque

    # --- CAMPOS EXCLUSIVOS PLANO OURO ---
    horario_funcionamento = models.CharField(max_length=255, blank=True, null=True, help_text="Horários de Check-in e Check-out")
    instagram = models.CharField(max_length=100, blank=True, null=True)
    foto_galeria_1 = models.ImageField(upload_to='galeria/hospedagem/', blank=True, null=True)
    foto_galeria_2 = models.ImageField(upload_to='galeria/hospedagem/', blank=True, null=True)
    foto_galeria_3 = models.ImageField(upload_to='galeria/hospedagem/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome).replace('-', '')
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nome} ({self.bairro})"

# --- TRANSPORTE E HORÁRIOS ---
class HorarioOnibus(models.Model):
    TIPOS = [
        ('MUNICIPAL', 'Municipal (Circular)'),
        ('INTERMUNICIPAL', 'Intermunicipal'),
        ('VAN', 'Transporte Alternativo (Van)'),
        ('TREM', 'Trem (Ferrovia)')
    ]

    origem = models.CharField(max_length=100, default="Guapimirim")
    destino = models.CharField(max_length=100)
    empresa = models.CharField(max_length=50) 
    numero_linha = models.CharField(max_length=20, blank=True)
    tipo = models.CharField(max_length=50, choices=TIPOS, default='INTERMUNICIPAL')
    tarifa = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    horarios = models.TextField(help_text="Separe os horários por vírgula")
    via = models.CharField(max_length=200, blank=True)
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.numero_linha} - {self.destino} ({self.empresa})"
    
class CadastroGratuito(models.Model):
    CATEGORIAS_CHOICES = [
        ('Gastronomia', 'Gastronomia'),
        ('Hospedagem', 'Hospedagem'),
        ('Comércio', 'Comércio em Geral'),
    ]
    PLANO_CHOICES = [
        ('GRATUITO', 'Gratuito'),
        ('OURO', 'Ouro'),
    ]
    STATUS_PAGAMENTO_CHOICES = [
        ('PENDENTE', 'Pendente'),
        ('APROVADO', 'Aprovado'),
        ('RECUSADO', 'Recusado'),
    ]

    plano = models.CharField(max_length=20, choices=PLANO_CHOICES, default='GRATUITO')
    status_pagamento = models.CharField(max_length=20, choices=STATUS_PAGAMENTO_CHOICES, default='PENDENTE')
    order_id = models.CharField(max_length=100, blank=True, null=True, help_text="ID único para a InfinitePay")

    nome = models.CharField(max_length=150)
    email = models.EmailField(max_length=255, default="", help_text="Email para contato")
    telefone = models.CharField(max_length=20)
    endereco = models.CharField(max_length=255)
    categoria = models.CharField(max_length=50, choices=CATEGORIAS_CHOICES)
    subcategoria = models.CharField(max_length=100, blank=True, null=True)
    
    # Comodidades
    faz_entrega = models.BooleanField(default=False)
    pet_friendly = models.BooleanField(default=False)
    opcoes_veganas = models.BooleanField(default=False)
    
    # Foto da fachada/logo
    foto = models.ImageField(upload_to='cadastros_pendentes/', blank=True, null=True)
    
    # --- CAMPOS EXCLUSIVOS DO PLANO OURO (DESTAQUE) ---
    descricao = models.TextField(blank=True, null=True, help_text="Texto descritivo para a página exclusiva")
    horario_funcionamento = models.CharField(max_length=255, blank=True, null=True, help_text="Ex: Seg a Dom, das 18h às 23h")
    link_cardapio = models.URLField(max_length=500, blank=True, null=True, help_text="Link para cardápio digital ou site")
    instagram = models.CharField(max_length=100, blank=True, null=True, help_text="Ex: @seunegocio")
    whatsapp = models.CharField(max_length=20, blank=True, null=True, help_text="Número do WhatsApp")
    foto_galeria_1 = models.ImageField(upload_to='cadastros_pendentes/galeria/', blank=True, null=True)
    foto_galeria_2 = models.ImageField(upload_to='cadastros_pendentes/galeria/', blank=True, null=True)
    foto_galeria_3 = models.ImageField(upload_to='cadastros_pendentes/galeria/', blank=True, null=True)
    
    # Controle Administrativo da sua Dashboard
    criado_em = models.DateTimeField(auto_now_add=True)
    analisado = models.BooleanField(default=False, help_text="Marque aqui quando já tiver visto este cadastro")

    def __str__(self):
        return f"{self.nome} ({self.categoria})"

    def _extrair_bairro(self):
        """Extrai o bairro do endereço de forma inteligente."""
        if ',' in self.endereco:
            partes = [p.strip() for p in self.endereco.split(',')]
            return partes[1] if len(partes) > 2 else partes[0]
        return 'Centro'

    def publicar_estabelecimento(self):
        """
        Cria o estabelecimento na tabela correta (Gastronomia, Hospedagem ou Comércio)
        copiando TODOS os dados, incluindo fotos e campos Ouro.
        Retorna o objeto criado.
        """
        eh_ouro = self.plano == 'OURO'
        bairro = self._extrair_bairro()

        if self.categoria == 'Gastronomia':
            obj = Gastronomia.objects.create(
                nome=self.nome,
                categoria='OUTROS',
                especialidade=self.subcategoria or 'Variado',
                bairro=bairro,
                endereco=self.endereco,
                telefone=self.telefone,
                foto=self.foto if self.foto else None,
                delivery=self.faz_entrega,
                vegano_vegetariano=self.opcoes_veganas,
                destaque=eh_ouro,
                descricao=self.descricao or '',
                link_cardapio=self.link_cardapio,
                instagram=self.instagram,
                horario=self.horario_funcionamento,
                foto_galeria_1=self.foto_galeria_1 if self.foto_galeria_1 else None,
                foto_galeria_2=self.foto_galeria_2 if self.foto_galeria_2 else None,
                foto_galeria_3=self.foto_galeria_3 if self.foto_galeria_3 else None,
            )
        elif self.categoria == 'Hospedagem':
            obj = Hospedagem.objects.create(
                nome=self.nome,
                tipo='POUSADA',
                descricao=self.descricao or '',
                bairro=bairro,
                endereco=self.endereco,
                telefone=self.telefone,
                foto=self.foto if self.foto else None,
                pet_friendly=self.pet_friendly,
                destaque=eh_ouro,
                horario_funcionamento=self.horario_funcionamento,
                instagram=self.instagram,
                foto_galeria_1=self.foto_galeria_1 if self.foto_galeria_1 else None,
                foto_galeria_2=self.foto_galeria_2 if self.foto_galeria_2 else None,
                foto_galeria_3=self.foto_galeria_3 if self.foto_galeria_3 else None,
            )
        else:  # Comércio
            obj = Comercio.objects.create(
                nome=self.nome,
                categoria='VARIEDADES',
                descricao=self.descricao or '',
                bairro=bairro,
                endereco=self.endereco,
                telefone=self.telefone,
                foto=self.foto if self.foto else None,
                destaque=eh_ouro,
                horario_funcionamento=self.horario_funcionamento,
                link_cardapio=self.link_cardapio,
                instagram=self.instagram,
                foto_galeria_1=self.foto_galeria_1 if self.foto_galeria_1 else None,
                foto_galeria_2=self.foto_galeria_2 if self.foto_galeria_2 else None,
                foto_galeria_3=self.foto_galeria_3 if self.foto_galeria_3 else None,
            )

        # Marca como analisado
        self.analisado = True
        self.save()
        return obj

    class Meta:
        verbose_name = "Cadastro/Anúncio Pendente"
        verbose_name_plural = "Cadastros e Anúncios Pendentes"

# --- EVENTOS LOCAIS ---
class Evento(models.Model):
    CATEGORIAS_CHOICES = [
        ('GASTRONOMIA', 'Gastronomia'),
        ('AVENTURA', 'Aventura'),
        ('CULTURA', 'Cultura'),
        ('ESPORTE', 'Esporte'),
        ('MUSICA', 'Música'),
        ('OUTROS', 'Outros'),
    ]

    titulo = models.CharField(max_length=150)
    categoria = models.CharField(max_length=50, choices=CATEGORIAS_CHOICES, default='OUTROS')
    descricao_curta = models.TextField(max_length=250, help_text="Resumo que aparece no card da página inicial")
    data_hora = models.CharField(max_length=100, help_text="Ex: Sábado, 08:00")
    local = models.CharField(max_length=150, help_text="Ex: Praça Central")
    ativo = models.BooleanField(default=True, help_text="Desmarque para ocultar o evento da página principal")
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo} - {self.data_hora}"
    
    class Meta:
        verbose_name = "Evento Local"
        verbose_name_plural = "Eventos Locais"
        ordering = ['-criado_em']
