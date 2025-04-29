# Auth-Front

Welcome to **Auth-Front**, the second version of my authentication project! Previously, I had a monolithic application, but now I've separated the front-end and back-end (in Go) into different machines. This repository contains the static front-end, with dark-themed login forms, served by Nginx and integrated with the API via proxy. The old version is here: [Monolithic Version](https://github.com/ak7r4/auth-project).

## Structure
- `templates/`: HTML files (e.g., `signup.html`)
- `assets/`: CSS and JS files (e.g., `styles.css`)
- `nginx/`: Nginx configuration

## How to Run
1. Clone this repository:
   ```bash
   git clone https://github.com/ak7r4/Auth-Front.git
   cd Auth-Front
   ```
2. Set up Nginx:
   - Ensure Nginx is installed on your system.
   - Copy the configuration file from `nginx/default` to your Nginx configuration directory (e.g., `/etc/nginx/sites-available/default`).
   - Change the IP on configuration to your back-end machine.
   - Test the configuration:
     ```bash
     nginx -t
     ```
   - Start or reload Nginx:
     ```bash
     nginx -s reload
     ```
3. Access in the browser:
   - Main form: `http://localhost`
   - API (via proxy): `http://localhost/api/`

**Note**: The back-end is in the `auth-backend` repository. Ensure the back-end API is running and accessible for proxy integration.

## Styling
The front-end uses an elegant dark theme:
- `styles.css`: Login form with reCAPTCHA v2 (dark theme).
- `change.css`: Change password form with dark theme.

## Nginx
Nginx serves static files and proxies to the Go API.
- Configuration: `nginx/default`
- Test: `nginx -t -c nginx/default`

## Tips
- **reCAPTCHA**: Configure your key in the [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) for the main form.
- **Issues?**: Verify that the Nginx configuration points to the correct back-end API endpoint.
- **Suggestions?**: I’d love to hear your ideas! Open an issue or send a PR.

## Project running:
Watch a quick demonstration of the login form in action:
<br>
[https://youtu.be/5lnTijzwjH4?feature=shared](https://youtu.be/5lnTijzwjH4?feature=shared)
<br>
[![Front-end for login page](https://raw.githubusercontent.com/ak7r4/Auth-Front/refs/heads/main/demo.png)](https://youtu.be/5lnTijzwjH4?feature=shared)
