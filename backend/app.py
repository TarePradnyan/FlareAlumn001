from authlib.integrations.flask_client import OAuth
from config import Config
from datetime import datetime
from flask import Flask, request, jsonify, redirect, url_for, session, render_template, flash, send_file, Request
import io
from flask_cors import CORS  # Allow cross-origin requests
from models import db, Admin, Post, Reply, Tag, Alumni, Event, Donation  # Import Admin instead of User
from pytz import timezone
from werkzeug.security import generate_password_hash
import xlsxwriter

app = Flask(__name__, template_folder="../frontend/components")
app.config.from_object(Config)

# Set secret key immediately after creating app (for sessions & OAuth)
app.secret_key = app.config["SECRET_KEY"]

# Enable CORS and support credentials (needed for session cookies)
CORS(app, supports_credentials=True)

# Database setup
db.init_app(app)

oauth = OAuth(app)
google = oauth.register(
    name="google",
    client_id=app.config["GOOGLE_CLIENT_ID"],
    client_secret=app.config["GOOGLE_CLIENT_SECRET"],
    server_metadata_url=app.config["GOOGLE_DISCOVERY_URL"],
    client_kwargs={"scope": "openid email profile"},
)

@app.route("/")
def home():
    user = session.get("user")
    # print(user, "opened index")
    return render_template("index.html", user=user)

@app.route("/dashboard")
def dashboard():
    user = session.get("user")
    total_alumni = Alumni.query.count()
    # print(f"user: {user}")
    if not user:
        return redirect(url_for("login"))
    events = Event.query.order_by(Event.start_time).all()
    total_events=Event.query.count()
    # No longer redirect based on admin status; all logged-in users can view dashboard
    return render_template("dashboard.html", user=user, pic=user.get("profile_pic"), events=events, total_events=total_events, total_alumni=total_alumni)



@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        password = request.form['password']
        repassword = request.form['repassword']
        if password != repassword:
            flash("Passwords do not match.")
            return redirect(url_for('register'))

        alumni = Alumni(
            name=request.form['name'],
            department=request.form['department'],
            graduation_year=request.form['graduation_year'],
            current_role=request.form['current_role'],
            company=request.form['current_company'],
            location=request.form['location'],
            industry=request.form['industry'],
            linkedin_url=request.form['linkedin_url'],
            email=request.form['email'],
            password_hash=generate_password_hash(password)
        )
        db.session.add(alumni)
        db.session.commit()
        flash("Registration successful! You may now log in.")
        return redirect(url_for('login'))
    return render_template('register.html')


@app.route('/alumni_directory')
def alumni_directory():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))

    search = request.args.get('search', '', type=str)
    year = request.args.get('year', '', type=str)
    department = request.args.get('department', '', type=str)
    industry = request.args.get('industry', '', type=str)

    query = Alumni.query

    if search:
        query = query.filter(
            (Alumni.name.ilike(f'%{search}%')) |
            (Alumni.company.ilike(f'%{search}%')) |
            (Alumni.current_role.ilike(f'%{search}%'))
        )
    if year:
        query = query.filter(Alumni.graduation_year == int(year))
    if department:
        query = query.filter(Alumni.department == department)
    if industry:
        query = query.filter(Alumni.industry == industry)

    alumni = query.all()

    return render_template('alumni_directory.html', alumni=alumni, user=user, pic=user.get("profile_pic"))






@app.route('/alumni_directory/export')
def export_alumni():
    # Get filter parameters from query string
    search = request.args.get('search')
    year = request.args.get('year')
    department = request.args.get('department')
    industry = request.args.get('industry')

    # Build query with applied filters
    query = Alumni.query
    if search:
        query = query.filter(Alumni.name.contains(search))
    if year:
        query = query.filter_by(graduation_year=year)
    if department:
        query = query.filter_by(department=department)
    if industry:
        query = query.filter_by(industry=industry)
    alumni = query.all()

    # Create an in-memory Excel file
    output = io.BytesIO()
    workbook = xlsxwriter.Workbook(output, {'in_memory': True})
    worksheet = workbook.add_worksheet('Alumni')

    # Write header row including Sr No.
    headers = ['Sr No.', 'Name', 'Department', 'Graduation Year', 'Current Role', 'Company', 'Location', 'Industry', 'Email', 'LinkedIn']
    for col_num, header in enumerate(headers):
        worksheet.write(0, col_num, header)

    # Write alumni data rows with serial number starting from 1
    for row_num, alum in enumerate(alumni, start=1):
        worksheet.write(row_num, 0, row_num)  # Sr No.
        worksheet.write(row_num, 1, alum.name)
        worksheet.write(row_num, 2, alum.department)
        worksheet.write(row_num, 3, alum.graduation_year)
        worksheet.write(row_num, 4, alum.current_role)
        worksheet.write(row_num, 5, alum.company)
        worksheet.write(row_num, 6, alum.location)
        worksheet.write(row_num, 7, alum.industry)
        worksheet.write(row_num, 8, alum.email)
        worksheet.write(row_num, 9, alum.linkedin_url)

    workbook.close()
    output.seek(0)

    return send_file(
        output,
        as_attachment=True,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        download_name="filtered_alumni_list.xlsx",
    )



@app.route('/events')
def events():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    
    ist = timezone('Asia/Kolkata')
    now = datetime.now(ist)
    
    events = Event.query.order_by(Event.start_time).all()
    
    upcoming_events = []
    for event in events:
        # Make event.start_time timezone-aware if naive
        if event.start_time.tzinfo is None:
            start_aware = event.start_time.replace(tzinfo=ist)
        else:
            start_aware = event.start_time.astimezone(ist)
        
        if start_aware > now:
            upcoming_events.append(event)
    # print("Upcoming events:", [(e.title, e.start_time) for e in upcoming_events])

    
    # Pass filtered events instead of all events
    return render_template("events.html", user=user, pic=user.get("profile_pic"), events=upcoming_events, now=now)



@app.route("/mentorship")
def mentorship():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    return render_template("mentor.html", user=user, pic=user.get("profile_pic"))

@app.route('/donations')
def donation():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    return render_template("donations.html", user=user, pic=user.get("profile_pic"))

@app.route('/donation_success', methods=['POST'])
def donation_success():
    data = request.get_json()

    donation = Donation(
        name=data.get('name'),
        email=data.get('email'),
        grad_year=data.get('grad_year'),
        amount=data.get('amount'),
        purpose=data.get('purpose'),
        is_recurring=data.get('is_recurring', False),
        is_anonymous=data.get('is_anonymous', False),
        razorpay_payment_id=data.get('razorpay_payment_id'),
        status=data.get('status', 'initiated')
    )
    db.session.add(donation)
    db.session.commit()

    return jsonify({"success": True})



@app.route("/login")
def login():
    redirect_uri = url_for("authorize", _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route("/authorize")
def authorize():
    token = google.authorize_access_token()
    userinfo_endpoint = google.server_metadata['userinfo_endpoint']
    resp = google.get(userinfo_endpoint)
    user_info = resp.json()

    email = user_info["email"]
    name = user_info.get("name")
    profile_pic = user_info.get("picture")
    first_name = user_info.get("given_name")
    last_name = user_info.get("family_name")

    # Check or create admin in DB
    admin = Admin.query.filter_by(email=email).first()
    if not admin:
        admin = Admin(
            email=email,
            name=name,
            profile_pic=profile_pic,
            admin=False  # Default admin status; can modify later via DB
        )
        db.session.add(admin)
        db.session.commit()
    else:
        admin.name = name
        admin.profile_pic = profile_pic
        db.session.commit()

    # Save session data for logged in user
    session["user"] = {
        "id": admin.id,
        "email": admin.email,
        "first_name": first_name,
        "last_name": last_name,
        "name": admin.name,
        "profile_pic": admin.profile_pic,
        "admin": admin.admin
        
    }
    # print(f"admin session data: {session['user']}")

    # Redirect all users to dashboard
    return redirect(url_for("dashboard"))

@app.route("/user_dashboard")
def user_dashboard():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    return render_template("user_dashboard.html", user=user, pic=user.get("profile_pic"))




@app.route('/comm')
def community():
    # Get all posts from DB
    posts = Post.query.order_by(Post.id.desc()).all()
    user = session.get("user")

    # Prepare tags as comma-separated string for each post
    for post in posts:
        post.tags_display = ', '.join([tag.name for tag in post.tags])

    # Render the page with posts data
    return render_template('community.html', posts=posts, user=user)

# Route to create a new post with tags
@app.route('/post', methods=['POST'])
def create_post():
    message = request.form.get('message')
    tags_raw = request.form.get('tags', '')
    tags_list = [t.strip().lower() for t in tags_raw.split(',') if t.strip()]

    new_post = Post(message=message)
    for tag_name in tags_list:
        tag = Tag.query.filter_by(name=tag_name).first()
        if not tag:
            tag = Tag(name=tag_name)
            db.session.add(tag)
        new_post.tags.append(tag)
    db.session.add(new_post)
    db.session.commit()
    return redirect(url_for('community'))   

# Route to add a reply to a post
@app.route('/reply', methods=['POST'])
def reply():
    post_id = request.form.get('post_id')
    reply_message = request.form.get('reply_message')
    new_reply = Reply(message=reply_message, post_id=post_id)
    db.session.add(new_reply)
    db.session.commit()
    return redirect(url_for('community'))

# Route to like a post (increments like count)
@app.route('/like', methods=['POST'])
def like_post():
    post_id = request.form.get('post_id')
    post = Post.query.get(post_id)
    if post:
        post.likes += 1
        db.session.commit()
    return redirect(url_for('community'))




@app.route('/create_event', methods=['POST'])
def create_event():
    title = request.form['title']
    description = request.form['description']
    location = request.form['location']
    category = request.form['category']
    start_time_str = request.form['start_time']
    end_time_str = request.form['end_time']

    # IST validation and parsing
    ist = timezone('Asia/Kolkata')
    start_time = ist.localize(datetime.strptime(start_time_str, '%Y-%m-%dT%H:%M'))
    end_time = ist.localize(datetime.strptime(end_time_str, '%Y-%m-%dT%H:%M'))

    if start_time < datetime.now(ist) or end_time <= start_time:
        return "Event timings are invalid!", 400

    event = Event(
        title=title,
        description=description,
        location=location,
        category=category,
        start_time=start_time,
        end_time=end_time
    )
    db.session.add(event)
    db.session.commit()
    return redirect(url_for('events'))




@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
