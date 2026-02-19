from django.contrib import admin
from .models import Turismo, TurismoFoto, Comercio, Gastronomia, Hospedagem, HorarioOnibus

class TurismoFotoInline(admin.TabularInline):
    model = TurismoFoto
    extra = 3 # Deixa 3 espaços abertos para colocar as fotos

@admin.register(Turismo)
class TurismoAdmin(admin.ModelAdmin):
    inlines = [TurismoFotoInline] # Insere a galeria dentro do cadastro principal
    list_display = ('nome', 'bairro', 'destaque')
    prepopulated_fields = {'slug': ('nome',)}
    list_filter = ('bairro', 'destaque')
    
@admin.register(Hospedagem)
class HospedagemAdmin(admin.ModelAdmin):
    list_display = ('nome', 'tipo', 'bairro', 'telefone', 'pet_friendly')
    list_filter = ('tipo', 'bairro', 'pet_friendly')
    search_fields = ('nome', 'descricao')

@admin.register(Gastronomia)
class GastronomiaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'bairro', 'delivery', 'destaque')
    list_filter = ('categoria', 'bairro', 'delivery')
    search_fields = ('nome', 'especialidade')

@admin.register(Comercio)
class ComercioAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'bairro', 'destaque', 'link_whatsapp')
    list_filter = ('categoria', 'bairro', 'destaque')
    search_fields = ('nome', 'subcategoria')

@admin.register(HorarioOnibus)
class HorarioOnibusAdmin(admin.ModelAdmin):
    # Colunas que aparecem na lista
    list_display = ('destino', 'empresa', 'numero_linha', 'tipo', 'tarifa', 'origem')
    
    # Filtros laterais (MUITO ÚTIL para separar Van de Ônibus)
    list_filter = ('tipo', 'empresa', 'origem')
    
    # Barra de busca (Procura por destino ou número da linha)
    search_fields = ('destino', 'numero_linha', 'via')
    
    # Ordem padrão (Agrupa por tipo e depois alfabético)
    ordering = ('tipo', 'destino')
    
    # Ajuda visual para diferenciar campos
    fieldsets = (
        ('Informações Principais', {
            'fields': ('tipo', 'empresa', 'numero_linha', 'tarifa')
        }),
        ('Itinerário', {
            'fields': ('origem', 'destino', 'via')
        }),
        ('Horários e Detalhes', {
            'fields': ('horarios', 'observacoes')
        }),
    )