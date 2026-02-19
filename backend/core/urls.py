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
    HorarioOnibusViewSet
)

router = DefaultRouter()

# Endpoints da API
router.register(r'turismo', TurismoViewSet)
router.register(r'hospedagem', HospedagemViewSet)
router.register(r'gastronomia', GastronomiaViewSet)
router.register(r'comercio', ComercioViewSet)

# Corrigindo o conflito: agora o Next.js encontrará os horários de ônibus em /api/horarios/
router.register(r'horarios', HorarioOnibusViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
]

# Configuração para servir arquivos de mídia (fotos) durante o desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)