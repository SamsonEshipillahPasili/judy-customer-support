import datetime as dt
from typing import Tuple, Mapping, Any

import faker
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from ticket.models import Ticket

_fake = faker.Faker()

BASE_URL = '/api/tickets/'

def create_user() -> User:
    return User.objects.create_user(
        username=_fake.user_name(),
        password=_fake.password()
    )


def create_api_client(user: User) -> APIClient:
    client = APIClient()
    refresh_token = RefreshToken.for_user(user)
    access_token = str(refresh_token.access_token)
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
    return client


def create_test_ticket(owner: User) -> Ticket:
    return Ticket.objects.create(
        title=_fake.sentence(nb_words=3),
        description=_fake.text(),
        owner=owner
    )

def format_datetime(datetime: dt.datetime | None) -> str | None:
    if datetime is None:
        return None
    return dt.datetime.strftime(datetime, "%Y-%m-%dT%H:%M:%S.%fZ")
