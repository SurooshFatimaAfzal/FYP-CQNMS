# Python base image
FROM python:3.10-slim

# Working directory set karein
WORKDIR /app

# Requirements copy aur install karein
COPY requirnment.txt .
RUN pip install --no-cache-dir -r requirnment.txt

# Pura backend code copy karein
COPY . .

# FastAPI ko run karne ke liye command
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]