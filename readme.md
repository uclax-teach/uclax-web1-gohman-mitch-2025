# Web 1: Frontend Web Application Development

## How to Run

### Local Development

-   change `.env` variable `DOCKERFILE_PATH` to "development environment"
-   `docker compose build --no-cache`
-   `docker compose up`

### Production Build

-   change `.env` variable `DOCKERFILE_PATH` to "production environment"
-   `docker compose build --no-cache`
-   `docker compose up`

### To Stop Either Development or Production

-   `control + c`
-   `docke compose down`
