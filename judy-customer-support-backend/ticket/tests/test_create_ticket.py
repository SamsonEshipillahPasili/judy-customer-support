from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

import faker

from ticket.models import Ticket


class TestCreateTicket(TestCase):
    def setUp(self) -> None:
        self.url = '/api/tickets/'
        self.fake = faker.Faker()
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser', password='Pa$$word123'
        )
        refresh_token = RefreshToken.for_user(self.user)
        access_token = str(refresh_token.access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')

    def test_create_ticket_no_authentication(self):
        client = APIClient()
        payload = {
            "title": self.fake.sentence(nb_words=3),
            "description": self.fake.text()
        }
        response = client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_create_ticket_with_valid_payload(self) -> None:
        payload = {
            "title": self.fake.sentence(nb_words=3),
            "description": self.fake.text()
        }
        response = self.client.post(self.url, payload, format='json')

        # HTTP status check
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # HTTP Payload check
        self.assertEqual(response.data['title'], payload['title'])
        self.assertEqual(response.data['description'], payload['description'])
        self.assertFalse(response.data['is_resolved'])
        self.assertTrue(isinstance(response.data['owner'], int))
        self.assertTrue(isinstance(response.data['id'], int))
        self.assertTrue(isinstance(response.data['created_at'], str))
        self.assertTrue(response.data['resolved_at'] is None)

        # DB entry check
        self.assertTrue(
            Ticket.objects.filter(id=response.data['id']).exists()
        )

        # Check if the created ticket belongs to the authenticated user
        self.assertEqual(response.data['owner'], self.user.id)

    def test_create_ticket_with_missing_fields(self) -> None:
        # No ticket fields
        payload = {}
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Only the ticket title
        payload = {
            "title": self.fake.sentence(nb_words=3),
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Only the ticket description
        payload = {
            "description": self.fake.sentence(nb_words=3),
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
