from django import forms
from django.core.exceptions import ValidationError

from .models import Documents


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