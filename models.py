from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Existing User model remains unchanged


post_tags = db.Table('post_tags',
    db.Column('post_id', db.Integer, db.ForeignKey('post.id', ondelete='CASCADE'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id', ondelete='CASCADE'), primary_key=True)
)

class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    likes = db.Column(db.Integer, default=0)
    replies = db.relationship('Reply', backref='post', lazy=True, cascade="all, delete-orphan")
    tags = db.relationship('Tag', secondary=post_tags, back_populates="posts")

class Reply(db.Model):
    __tablename__ = 'reply'
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id', ondelete='CASCADE'), nullable=False)

class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    posts = db.relationship('Post', secondary=post_tags, back_populates="tags")

class Admin(db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    name = db.Column(db.String(150), nullable=False)
    profile_pic = db.Column(db.String(250))
    admin = db.Column(db.Boolean, nullable=False, default=False)


class Alumni(db.Model):
    __tablename__ = 'alumni'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    graduation_year = db.Column(db.Integer, nullable=False)
    current_role = db.Column(db.String(150), nullable=False)
    company = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    industry = db.Column(db.String(100), nullable=False)
    avatar_url = db.Column(db.String(250))
    email = db.Column(db.String(150))
    linkedin_url = db.Column(db.String(250))
    password_hash = db.Column(db.String, nullable=False)
    is_featured = db.Column(db.Boolean, default=False)

class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)  # IST time (store UTC, handle TZ on frontend/back)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

class Donation(db.Model):
    __tablename__ = 'donations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    grad_year = db.Column(db.Integer)
    amount = db.Column(db.Integer, nullable=False)
    purpose = db.Column(db.String(100), nullable=False)
    is_recurring = db.Column(db.Boolean, default=False)
    is_anonymous = db.Column(db.Boolean, default=False)
    razorpay_payment_id = db.Column(db.String(100))
    status = db.Column(db.String(50), default='initiated')
    created_at = db.Column(db.DateTime, default=db.func.now())
