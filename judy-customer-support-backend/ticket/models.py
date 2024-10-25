from django.db import models
from django.contrib.auth.models import User

class Ticket(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_resolved = models.BooleanField(default=False)
    owner = models.ForeignKey(
        to=User,
        on_delete=models.CASCADE,
        null=True,
        default=None, # Added this field (and null=True) after running migration, thus had to specify default value.
        related_name='tickets'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(
        null=True,
        default=None
    )
