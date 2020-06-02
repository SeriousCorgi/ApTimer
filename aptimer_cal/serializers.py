from rest_framework import serializers


class DiffSerializers(serializers.Serializer):
    # DIFFUSIVITY
    temp = serializers.FloatField()     # Temperature in Celsius degree
    tilt = serializers.FloatField()     # Tilt of traverse from the c-axis


# class IniBoundSerializers(serializers.Serializer):
#     # INITIAL & BOUNDARY CONDITIONS
#     # Initial conditions
#     xcl_ini = serializers.FloatField()
#     xf_ini = serializers.FloatField()
#     xoh_ini = serializers.FloatField()
#     # Left boundary
#     xcl_left = serializers.FloatField()
#     xf_left = serializers.FloatField()
#     xoh_left = serializers.FloatField()
#     # Right boundary
#     xcl_right = serializers.FloatField()
#     xf_right = serializers.FloatField()
#     xoh_right = serializers.FloatField()


# class DisTimeSerializers(serializers.Serializer):
#     dx = serializers.FloatField()          # distance step, dx (um)
#     dt = serializers.FloatField()          # time step, dt (hour)
#     iteration = serializers.IntegerField()
