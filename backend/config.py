import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "supersecretkey"
    SQLALCHEMY_DATABASE_URI = "sqlite:///admins.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Google OAuth
    GOOGLE_CLIENT_ID =  os.environ.get("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET =  os.environ.get("GOOGLE_CLIENT_SECRET")
    GOOGLE_DISCOVERY_URL =  os.environ.get("GOOGLE_DISCOVERY_URL")