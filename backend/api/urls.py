from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HospedagemViewSet, 
    GastronomiaViewSet, 
    ComercioViewSet, 
    HorarioOnibusViewSet,
    HorariosViewSet, 
    TurismoViewSet,
)

router = DefaultRouter()
router.register(r'turismo', TurismoViewSet)
router.register(r'hospedagem', HospedagemViewSet)
router.register(r'gastronomia', GastronomiaViewSet)
router.register(r'comercio', ComercioViewSet)
router.register(r'transporte', HorarioOnibusViewSet)
router.register(r'horarios', HorariosViewSet)

urlpatterns = [
    path('', include(router.urls)),
]