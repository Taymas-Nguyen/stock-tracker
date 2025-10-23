from django import template

register = template.Library()

@register.inclusion_tag("template_data_page.html")
def createGraph(form, number):
    data = {
    "form":form, 
    "formname":f"form{number}",
    "name":f"stock{number}",
    "deleteGraph":f"stock{number}-deleteGraph",
    "addGraph":f"stock{number}-addGraph",
    "search_box":f"stock{number}-search_box",
    "button_and_graph":f"stock{number}-button_and_graph",
    "tooltip":f"stock{number}-tooltip",
    "range_buttons":f"stock{number}-range_buttons",
    "1Day":f"stock{number}-1Day",
    "5Days":f"stock{number}-5Days",
    "1Month":f"stock{number}-1Month",
    "6Months":f"stock{number}-6Months",
    "YearToDate":f"stock{number}-YearToDate",
    "1Year":f"stock{number}-1Year",
    "5Years":f"stock{number}-5Years",
    "Max":f"stock{number}-Max",
    "line_graph":f"stock{number}-line_graph",
    "loading_graph":f"stock{number}-loading_graph",
    "loading_words":f"stock{number}-loading_words",
    }
    return data