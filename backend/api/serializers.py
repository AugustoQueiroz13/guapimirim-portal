from rest_framework import serializers
from .models import Turismo, TurismoFoto, Hospedagem, Gastronomia, Comercio, HorarioOnibus

class TurismoFotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TurismoFoto
        fields = ['id', 'arquivo']

class TurismoSerializer(serializers.ModelSerializer):
    album = TurismoFotoSerializer(many=True, read_only=True)

    class Meta:
        model = Turismo
        fields = '__all__'

class HorarioOnibusSerializer(serializers.ModelSerializer):
    class Meta:
        model = HorarioOnibus
        fields = '__all__'

class ComercioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comercio
        fields = '__all__'

class HospedagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospedagem
        fields = '__all__'

class GastronomiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gastronomia
        fields = '__all__'