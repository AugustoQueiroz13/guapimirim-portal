from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Turismo, Hospedagem, Gastronomia, Comercio, HorarioOnibus
from .serializers import (
    TurismoSerializer,
    HospedagemSerializer, 
    GastronomiaSerializer, 
    ComercioSerializer, 
    HorarioOnibusSerializer
)
# --- TURISMO ---
class TurismoViewSet(viewsets.ModelViewSet):
    queryset = Turismo.objects.all()
    serializer_class = TurismoSerializer

    def get_queryset(self):
        queryset = Turismo.objects.all()
        slug = self.request.query_params.get('slug')
        if slug is not None:
            queryset = queryset.filter(slug=slug)
        return queryset
# --- TRANSPORTE ---
class HorarioOnibusViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API para listar horários de ônibus, vans e trem.
    Ordenação: Por tipo de transporte e depois destino.
    """
    queryset = HorarioOnibus.objects.all().order_by('tipo', 'destino')
    serializer_class = HorarioOnibusSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['tipo', 'destino', 'empresa']
    search_fields = ['destino', 'numero_linha', 'via']

# --- COMÉRCIO ---
class ComercioViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API para listar comércios e serviços diversos.
    Ordenação: Destaques primeiro, depois alfabético.
    """
    queryset = Comercio.objects.all().order_by('-destaque', 'nome') 
    serializer_class = ComercioSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['categoria', 'bairro', 'destaque']
    search_fields = ['nome', 'subcategoria', 'bairro']

# --- GASTRONOMIA ---
class GastronomiaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API para listar restaurantes e bares.
    Filtros cruciais: Delivery e Vegano/Vegetariano.
    """
    queryset = Gastronomia.objects.all().order_by('-destaque', 'nome')
    serializer_class = GastronomiaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    
    # Filtros que aparecerão no Front-end
    filterset_fields = [
        'categoria', 
        'bairro', 
        'delivery', 
        'vegano_vegetariano', 
        'destaque'
    ]
    
    # Campos que o usuário pode buscar digitando
    search_fields = ['nome', 'especialidade', 'bairro']

# --- HOSPEDAGEM ---
class HospedagemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API para listar pousadas, hotéis e campings.
    Filtros cruciais: Pet Friendly e Café da Manhã.
    """
    queryset = Hospedagem.objects.all().order_by('nome')
    serializer_class = HospedagemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    
    # Filtros para a página de Hospedagem
    filterset_fields = [
        'tipo', 
        'bairro', 
        'pet_friendly', 
        'cafe_da_manha'
    ]
    
    search_fields = ['nome', 'descricao', 'bairro']