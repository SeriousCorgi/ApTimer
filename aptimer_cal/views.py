from rest_framework.response import Response
from rest_framework import views

from .serializers import DiffSerializers, IniBoundSerializers, DisTimeSerializers

from .calculation.diffusivity import DiffFunc
from .calculation.inibound import IniBound
from .calculation.distime import DisTime


class DiffView(views.APIView):
    def get(self, request):
        serializer = DiffSerializers(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        diffusivity = DiffFunc(data).diffusivity()

        return Response({
            "diffusivity": diffusivity,
        })


class IniBoundView(views.APIView):
    def get(self, request):
        serializer = IniBoundSerializers(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        inibound = IniBound(data).show_input()
        return Response({
            "initial & boundary conditions": inibound
        })


class DisTimeView(views.APIView):
    def get(self, request):
        serializer = DisTimeSerializers(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        distime = DisTime(data).show_input()
        return Response({
            "distance & time steps": distime
        })
