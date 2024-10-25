from django.db import models

class Ticket(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
