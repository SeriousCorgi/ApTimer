from rest_framework.response import Response
from rest_framework import views

from .serializers import CalSerializers

from .calculation.sum import SumFunc


class CalView(views.APIView):
    def get(self, request):
        serializer = CalSerializers(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        sum_func = SumFunc(data)
        result = sum_func.sum()

        return Response({
            "result": result,
        })
