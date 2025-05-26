from django import forms
from django.core.exceptions import ValidationError

from .models import Documents, IndicationType


class DocumentAdminForm(forms.ModelForm):
    class Meta:
        model = Documents
        fields = ('title', 'description', 'file')

    def clean_file(self):
        file = self.cleaned_data['file']
        pdf = str(file).split('/')[-1]
        if pdf.split('.')[1].lower() != 'pdf':
            raise ValidationError('Недопустимое расширение файла. Допускаются только файлы PDF')
        return file


class IndicationTypeAdminForm(forms.ModelForm):
    class Meta:
        model = IndicationType
        fields = ('name', 'tube_type')

    def clean(self):
        cleaned_data = super().clean()
        type = cleaned_data.get('tube_type')
        if not self.instance.pk and IndicationType.objects.filter(tube_type=type).exists():
            raise ValidationError('Тип показаний уже существует')