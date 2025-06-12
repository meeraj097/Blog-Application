# Use Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the backend code
COPY . /app/

# Run migrations and start the server
CMD ["sh", "-c", "python manage.py migrate && gunicorn blogapi.wsgi:application --bind 0.0.0.0:8000"]
