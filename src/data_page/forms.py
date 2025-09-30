from django import forms
from .models import search_model


# search bar for ticker in data_page located at the top of the screen
class search_form(forms.ModelForm):
    ticker = forms.CharField(
        label = '',
        widget = forms.TextInput(
            attrs = {
                'placeholder' : 'Enter ticker (meta, appl)',
                'cols': 20, 
                'rows': 1,
                # equivalent to css styling except for forms
                'style': """
                font-size: 25; 
                margin-left: 20px;
                pointer-event: none;
                position: absolute;
                border-style: none;
                outline: none;
                background: transparent;
                border-radius: 10px;
                
                """,
            }
        )
    ) 
    class Meta:
        model = search_model
        fields = ['ticker']  