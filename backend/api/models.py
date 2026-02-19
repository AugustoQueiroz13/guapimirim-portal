from django.db import models
from django.utils.text import slugify

# --- TURISMO ---
class Turismo(models.Model):
    nome = models.CharField(max_length=200)
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
            self.slug = slugify(self.nome)
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = "Ponto Turístico"
        verbose_name_plural = "Pontos Turísticos"

    def __str__(self):
        return self.nome
    
class TurismoFoto(models.Model):
    turismo = models.ForeignKey(Turismo, related_name='album', on_delete=models.CASCADE)
    arquivo = models.ImageField(upload_to='turismo/galeria/')

    def __str__(self):
        return f"Foto de {self.turismo.nome}"

# --- COMÉRCIO E SERVIÇOS ---
class Comercio(models.Model):
    CATEGORIAS = [
        ('FARMACIA', 'Farmácia'),
        ('MERCADO', 'Mercado'),
        ('SERVICOS', 'Serviços'),
        ('PETSHOP', 'Pet Shop'),
        ('OUTROS', 'Outros'),
    ]

    nome = models.CharField(max_length=100)
    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    subcategoria = models.CharField(max_length=50, blank=True, help_text="Ex: Oficina, Estética, Papelaria")
    
    # Imagem opcional para logo ou fachada
    foto = models.ImageField(upload_to='comercio/', blank=True, null=True, help_text="Upload da logo ou foto da fachada") 
    
    bairro = models.CharField(max_length=50, default="Centro")
    endereco = models.CharField(max_length=255, blank=True)
    telefone = models.CharField(max_length=20, help_text="Apenas números, ex: 21999999999")
    instagram = models.CharField(max_length=100, blank=True)
    destaque = models.BooleanField(default=False)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

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
    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    especialidade = models.CharField(max_length=200, help_text="Ex: Comida Caseira, Massas, Hambúrguer Artesanal")
    
    foto = models.ImageField(upload_to='gastronomia/', blank=True, null=True)
    
    bairro = models.CharField(max_length=50, default="Centro")
    endereco = models.CharField(max_length=255, blank=True)
    telefone = models.CharField(max_length=20)
    delivery = models.BooleanField(default=True)
    vegano_vegetariano = models.BooleanField(default=False, verbose_name="Opções Veg/Veggie")
    
    destaque = models.BooleanField(default=False)

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