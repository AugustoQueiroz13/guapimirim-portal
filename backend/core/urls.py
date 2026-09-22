from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from api.views import (
    TurismoViewSet, 
    HospedagemViewSet, 
    GastronomiaViewSet, 
    ComercioViewSet, 
    HorarioOnibusViewSet,
    CadastroGratuitoViewSet,
    EstabelecimentoGlobalView, # <-- Nossa classe mágica importada aqui
    CriarCheckoutOuroView,
    InfinitePayWebhookView
)

router = DefaultRouter()
# Endpoints da API
router.register(r'turismo', TurismoViewSet)
router.register(r'hospedagem', HospedagemViewSet)
router.register(r'gastronomia', GastronomiaViewSet)
router.register(r'comercio', ComercioViewSet)
router.register(r'cadastros-gratuitos', CadastroGratuitoViewSet, basename='cadastro-gratuito')

# Corrigindo o conflito: agora o Next.js encontrará os horários de ônibus em /api/horarios/
router.register(r'horarios', HorarioOnibusViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Nossa rota global para as URLs limpas (DEVE vir antes do include do router)
    path('api/estabelecimento/<str:slug>/', EstabelecimentoGlobalView.as_view(), name='estabelecimento-global'),
    
    # Rotas de Integração com InfinitePay
    path('api/checkout-ouro/', CriarCheckoutOuroView.as_view(), name='checkout-ouro'),
    path('api/webhook/infinitepay/', InfinitePayWebhookView.as_view(), name='webhook-infinitepay'),

    path('api/', include(router.urls)), 
]

# Configuração para servir arquivos de mídia (fotos) durante o desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)