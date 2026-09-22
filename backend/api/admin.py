from django.contrib import admin, messages
from django.utils.html import format_html
from .models import Turismo, TurismoFoto, Comercio, Gastronomia, Hospedagem, HorarioOnibus, CadastroGratuito, Evento

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
    def link_whatsapp(self, obj):
        if obj.telefone:
            numero_limpo = ''.join(filter(str.isdigit, obj.telefone))
            return format_html('<a href="https://wa.me/55{}" target="_blank">📲 Link</a>', numero_limpo)
        return "-"
    link_whatsapp.short_description = 'WhatsApp'

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

@admin.register(CadastroGratuito)
class CadastroGratuitoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'categoria', 'telefone', 'criado_em', 'analisado')
    list_filter = ('analisado', 'categoria', 'criado_em')
    search_fields = ('nome', 'telefone', 'endereco')
    list_editable = ('analisado',)
    
    # Chama a função que criamos logo abaixo
    actions = ['aprovar_cadastros']

    @admin.action(description="Aprovar e Publicar Selecionados")
    def aprovar_cadastros(self, request, queryset):
        sucesso = 0
        for cadastro in queryset:
            if cadastro.analisado:
                continue 
            
            # Usa o método centralizado do modelo que copia TODOS os dados
            cadastro.publicar_estabelecimento()
            sucesso += 1
            
        self.message_user(request, f"{sucesso} cadastros foram aprovados e publicados com sucesso.")
    

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'categoria', 'data_hora', 'ativo', 'criado_em')
    list_filter = ('ativo', 'categoria')
    search_fields = ('titulo', 'local')
    list_editable = ('ativo',)
