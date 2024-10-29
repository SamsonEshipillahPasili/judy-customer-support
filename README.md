# Judy Customer Support App

The app is composed of the backend and the frontend. The backend code is stored in `judy-customer-support-backend`. The frontend code is stored in `judy-customer-support-frontend`.

# Getting Started
1. Clone this repository into a directory. I will use the `judy-customer-support` to refer to this directory in this document

2. Install Python 3.11 and above. You can install Python from here:- [Python](https://www.python.org/downloads/)

3. Install Node.JS here:- [Node.js](https://nodejs.org/en/download/package-manager)

4. Open a terminal/command prompt, and install the Angular CLI using the command below:
```bash
  npm install -g @angular/cli
```

# Backend Setup
1. Open a terminal and navigate to the directory with the backend code.
```bash
   cd judy-customer-support/judy-customer-support-backend
```

2. Create a Python virtual environment.
```bash
  python -m venv venv
```

3. Activate the virtual environment
For `Mac/Linux`
```bash
source venv/bin/activate.fish

```

For Windows
```ps1
.\venv\Scripts\Activate
```

4. Install Project Requirements
```bash
pip install -r requirements.txt
```

5. Run migrations
```bash
python manage.py migrate
```

6. Run the tests
```bash
python manage.py test
```

7. Run the tests with coverage
```bash
coverage run manage.py test
```
To view the test coverage, run:
```bash
coverage report
```

8. Create an account for test. Feel free to create as many as you need
```bash
python manage.py create_demo_user
```

You will get an output similar to the one below:
```
Successfully created a user
            Username: schwartzapril
            Password: r)23uVcsq#
            Email: amandapowell@example.net
```

Save these credentials to later use to login from the frontend.

9. Run the server. Ensure the port 8000 is available, so that the backend is reachable by the frontend.
```bash
python manage.py runserver
```


# Frontend Setup
1. Open a terminal and navigate to the directory with the frontend code.
```bash
   cd judy-customer-support/judy-customer-support-frontend
```

2. Install the app dependencies.
```bash
npm install
```

3. Run the frontend. Ensure the port 4200 is available, as that the default port used by angular and assumed in this manual.
```bash
ng serve
```

4. Open the url: [Judy Customer Tickets App](http://localhost:4200). You will be redirected to sign in.
Use the credentials generated above to sign in.
