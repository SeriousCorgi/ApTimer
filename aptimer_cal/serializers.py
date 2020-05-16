from rest_framework import serializers


class CalSerializers(serializers.Serializer):
    a = serializers.IntegerField()
    b = serializers.IntegerField()
