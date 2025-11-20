from django import forms
from .models import search_model


class search_form(forms.ModelForm):
    ticker = forms.CharField(
        label = '',
        widget = forms.TextInput(
            attrs = {
                'placeholder' : 'Enter ticker (meta, aapl)',
                'cols': 20, 
                'rows': 1,
                # equivalent to css styling except for forms
                'style': """
                font-size: 60; 
                pointer-event: none;
                top: 50%;
                left: 50%;
                margin-left: -360px;
                margin-top: -37.5px;
                position: absolute;
                border-style: none;
                outline: none;
                background: transparent;
                border-radius: 10px;
                z-index: 1;
                """,
            }
        )
    ) 
    class Meta:
        model = search_model
        fields = ['ticker']  