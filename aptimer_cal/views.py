from rest_framework.response import Response
from rest_framework import views

from .forms import ExcelForm
from .serializers import DiffSerializers, IniBoundSerializers

from .calculation.diffusivity import DiffFunc
from .calculation.inibound import IniBound
from .calculation.distime import DisTime

import numpy as np


class ExcelView(views.APIView):
    def post(self, request):
        form = ExcelForm(request.POST, request.FILES)
        excel = request.FILES['excel']
        if form.is_valid():
            meas_dis = []
            lines = excel.readlines()
            length = len(lines) - 1
            meas_profile = np.zeros((3, length))    # array 3x19
            err = np.zeros((3, length))             # array 3x19
            i = 0
            for line in lines[1:]:
                meas_dis.append(i)
                line = line.decode('utf-8').split(',')
                print(line)
                meas_profile[:, i] = np.array(line[1:4])
                err[:, i] = np.array(line[4:7])
                i += 1
            x = meas_dis
            y_cl = meas_profile[0, :]
            y_f = meas_profile[1, :]
            y_oh = meas_profile[2, :]
            err_cl = err[0]
            err_f = err[1]
            err_oh = err[2]

        return Response({
            'name': excel.name,
            'x': x,
            'y_cl': y_cl,
            'y_f': y_f,
            'y_oh': y_oh,
            'err_cl': err_cl,
            'err_f': err_f,
            'err_oh': err_oh,
        })


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


# class DisTimeView(views.APIView):
#     def get(self, request):
#         serializer = DisTimeSerializers(data=request.query_params)
#         serializer.is_valid(raise_exception=True)

#         data = serializer.validated_data

#         distime = DisTime(data).show_input()
#         return Response({
#             "distance & time steps": distime
#         })