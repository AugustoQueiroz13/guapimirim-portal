from rest_framework import viewsets, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
import requests
import uuid

from .models import Turismo, Hospedagem, Comercio, Gastronomia, HorarioOnibus, CadastroGratuito
from .serializers import (
    TurismoSerializer,
    HospedagemSerializer, 
    GastronomiaSerializer, 
    ComercioSerializer, 
    HorarioOnibusSerializer,
    CadastroGratuitoSerializer
)

# --- BUSCADOR GLOBAL DE SLUGS (Para URLs Limpas) ---
class EstabelecimentoGlobalView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, slug):
        # Vasculha a Gastronomia
        gastronomia = Gastronomia.objects.filter(slug=slug).first()
        if gastronomia:
            data = GastronomiaSerializer(gastronomia).data
            data['tipo_global'] = 'gastronomia' # Avisa o frontend de onde veio
            return Response(data)

        # Vasculha a Hospedagem
        hospedagem = Hospedagem.objects.filter(slug=slug).first()
        if hospedagem:
            data = HospedagemSerializer(hospedagem).data
            data['tipo_global'] = 'hospedagem'
            return Response(data)

        # Vasculha o Comércio
        comercio = Comercio.objects.filter(slug=slug).first()
        if comercio:
            data = ComercioSerializer(comercio).data
            data['tipo_global'] = 'comercio'
            return Response(data)

        # Se não achar em lugar nenhum, devolve 404
        return Response({"erro": "Estabelecimento não encontrado"}, status=status.HTTP_404_NOT_FOUND)


# --- COMÉRCIO ---
class ComercioViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API para listar comércios e serviços diversos.
    """
    queryset = Comercio.objects.all().order_by('-destaque', 'nome') 
    serializer_class = ComercioSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['categoria', 'bairro', 'destaque']
    search_fields = ['nome', 'descricao', 'bairro']

# --- TURISMO ---
class TurismoViewSet(viewsets.ModelViewSet):
    queryset = Turismo.objects.all()
    serializer_class = TurismoSerializer
    lookup_field = 'slug'

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
    """
    queryset = HorarioOnibus.objects.all().order_by('tipo', 'destino')
    serializer_class = HorarioOnibusSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['tipo', 'destino', 'empresa']
    search_fields = ['destino', 'numero_linha', 'via']

# --- GASTRONOMIA ---
class GastronomiaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API para listar restaurantes e bares.
    """
    queryset = Gastronomia.objects.all().order_by('-destaque', 'nome')
    serializer_class = GastronomiaSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = [
        'categoria', 
        'bairro', 
        'delivery', 
        'vegano_vegetariano', 
        'destaque'
    ]
    search_fields = ['nome', 'especialidade', 'bairro']

# --- HOSPEDAGEM ---
class HospedagemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API para listar pousadas, hotéis e campings.
    """
    queryset = Hospedagem.objects.all().order_by('-destaque', 'nome')
    serializer_class = HospedagemSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = [
        'tipo', 
        'bairro', 
        'pet_friendly', 
        'cafe_da_manha',
        'destaque'
    ]
    search_fields = ['nome', 'descricao', 'bairro']

# --- CADASTRO GRATUITO ---
class CadastroGratuitoViewSet(viewsets.ModelViewSet):
    queryset = CadastroGratuito.objects.all().order_by('-criado_em')
    serializer_class = CadastroGratuitoSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post', 'get', 'patch', 'delete']

# --- CHECKOUT PLANO OURO (INFINITEPAY) ---
class CriarCheckoutOuroView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CadastroGratuitoSerializer(data=request.data)
        if serializer.is_valid():
            # Salvar como pendente
            cadastro = serializer.save(plano='OURO', status_pagamento='PENDENTE')
            
            # Gerar Order NSU único
            order_nsu = f"GUIA-{cadastro.id}-{uuid.uuid4().hex[:8].upper()}"
            cadastro.order_id = order_nsu
            cadastro.save()

            # Chamada para API da InfinitePay
            payload = {
                "handle": "eletrofox",
                "items": [
                    {
                        "quantity": 1,
                        "price": 14900,  # Valor em centavos (R$ 149,00)
                        "description": "Plano Destaque Ouro Anual - Guia Guapimirim"
                    }
                ],
                "order_nsu": order_nsu,
                "customer": {
                    "name": cadastro.nome,
                    "email": cadastro.email if cadastro.email else "",
                    "phone_number": "".join(filter(str.isdigit, cadastro.telefone))
                },
                "redirect_url": "http://localhost:3000/anuncie?status=success", 
                # A URL de webhook real precisará ser configurada em produção
                # "webhook_url": "https://seusite.com.br/api/webhook-infinitepay/"
            }

            try:
                response = requests.post(
                    "https://api.checkout.infinitepay.io/links",
                    json=payload,
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code in [200, 201]:
                    data = response.json()
                    return Response({"url": data.get("url")}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"erro": "Erro na InfinitePay", "detalhes": response.text}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"erro": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- WEBHOOK INFINITEPAY ---
class InfinitePayWebhookView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        order_nsu = data.get("order_nsu")
        capture_method = data.get("capture_method")
        paid_amount = data.get("paid_amount")

        # Verifica se existe order_nsu e se o pagamento cobriu o valor
        if order_nsu and capture_method and paid_amount and int(paid_amount) >= 14900:
            cadastro = CadastroGratuito.objects.filter(order_id=order_nsu).first()
            if cadastro and cadastro.status_pagamento != 'APROVADO':
                # Atualizar status de pagamento
                cadastro.status_pagamento = 'APROVADO'
                cadastro.save()

                # Publicar usando o método centralizado do modelo
                cadastro.publicar_estabelecimento()
                
                return Response({"status": "Aprovado e publicado com sucesso!"}, status=status.HTTP_200_OK)
        
        return Response({"status": "Recebido. Nenhuma ação executada."}, status=status.HTTP_200_OK)
from .models import Evento
from .serializers import EventoSerializer
class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.filter(ativo=True)
    serializer_class = EventoSerializer
    permission_classes = [AllowAny]
