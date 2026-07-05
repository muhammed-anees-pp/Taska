from django.contrib import admin
from .models import User, EmailOTP

"""
MODEL REGISTER
"""
admin.site.register(User)
admin.site.register(EmailOTP)