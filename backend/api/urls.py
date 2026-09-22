from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HospedagemViewSet, 
    GastronomiaViewSet, 
    ComercioViewSet, 
    HorarioOnibusViewSet,
    TurismoViewSet,
    CadastroGratuitoViewSet,
    EstabelecimentoGlobalView,
    CriarCheckoutOuroView,
    InfinitePayWebhookView,
    EventoViewSet
)

router = DefaultRouter()
router.register(r'comercio', ComercioViewSet)
router.register(r'turismo', TurismoViewSet)
router.register(r'hospedagem', HospedagemViewSet)
router.register(r'gastronomia', GastronomiaViewSet)
router.register(r'transporte', HorarioOnibusViewSet)
router.register(r'cadastros-gratuitos', CadastroGratuitoViewSet, basename='cadastros-gratuitos')
router.register(r'eventos', EventoViewSet, basename='eventos')

urlpatterns = [
    # 1. A rota mágica DEVE vir primeiro para o Django ler ela antes do router
    path('api/estabelecimento/<str:slug>/', EstabelecimentoGlobalView.as_view(), name='estabelecimento-global'),
    
    # 2. Rotas padrão do ModelViewSet vêm depois
    path('api/', include(router.urls)),

    # 3. Integração com InfinitePay
    path('api/checkout-ouro/', CriarCheckoutOuroView.as_view(), name='checkout-ouro'),
    path('api/webhook/infinitepay/', InfinitePayWebhookView.as_view(), name='webhook-infinitepay'),
]