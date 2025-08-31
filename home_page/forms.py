from django import forms
from .models import search_model

class search_form(forms.ModelForm):
    ticker = forms.CharField(
        label = '',
        widget = forms.TextInput(
            attrs = {
                'placeholder' : 'Enter ticker ($aapl, appl)',
                'cols': 20, 
                'rows': 1,
                # equivalent to css styling except for forms
                'style': """
                font-size: 60; 
                pointer-event: none;
                top: 50%;
                left: 50%;
                margin-left: -369px;
                margin-top: -37.5px;
                position: absolute;
                border-style: none;
                outline: none;
                """,
            }
        )
    ) 
    class Meta:
        model = search_model
        fields = ['ticker']  