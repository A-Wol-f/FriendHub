FriendHub Application

A full-stack application using Flask (Python) and React with Material UI, PostgreSQL, and SQLAlchemy.

## Tech Stack
- Backend: Python, Flask, PostgreSQL, SQLAlchemy
- Frontend: React, Material UI
- Deployment: Render
- Features: CRUD operations, Dark/Light mode, Responsive design

## Local Development

### Backend Setup
```bash
# Clone repository
git clone https://github.com/AmIT0yAdAv/FriendHub
cd FriendHub/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Unix/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure PostgreSQL
# Set DATABASE_URL environment variable
export DATABASE_URL="postgresql://example_user:securepassword@localhost:5432/friendhub"

# Initialize database
flask db upgrade
```

### Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Running the Application
```bash
cd ../backend
flask run
```
Visit `http://localhost:5000`

## Features
- User management with PostgreSQL database
- Instant feedback using Material UI's Snackbar system
- Responsive layout for all devices
- Light/Dark theme support
- Real-time updates with optimistic UI

## API Endpoints
- `GET /api/friends`: Retrieve all friends
- `POST /api/friends`: Create new friend
- `PATCH /api/friends/<id>`: Update friend
- `DELETE /api/friends/<id>`: Delete friend

## Environment Variables
```
DATABASE_URL=postgresql://example_user:securepassword@localhost:5432/friendhub
FLASK_ENV=development
SECRET_KEY=supersecretkey123
```

## Deployment
1. Create Render account
2. Connect GitHub repository
3. Configure environment variables
4. Deploy application
