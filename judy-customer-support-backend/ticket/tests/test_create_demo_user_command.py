from io import StringIO

from django.test import TestCase
from django.core.management import call_command


class TestCreateDemoUserCommand(TestCase):

    def test_command(self):
        # Capture the output of the command
        out = StringIO()
        call_command('create_demo_user', stdout=out)

        # Check that the output matches the default message
        self.assertIn('Successfully created a user', out.getvalue())
