from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User

import faker

class Command(BaseCommand):
    help = 'Create a demo user for ticket management'

    def handle(self, *args, **kwargs):
        fake = faker.Faker()
        password = fake.password()
        try:
            user = User.objects.create_user(
                username=fake.user_name(),
                email=fake.email(),
                password=password,
            )
            msg = f"""
            Successfully created a user
            Username: {user.username}
            Password: {password}
            Email: {user.email}
            """.strip()
            self.stdout.write(self.style.SUCCESS(msg))
        except Exception as e:
            raise CommandError(e)
