from django import forms


class ExcelForm(forms.Form):
    excel = forms.FileField()
