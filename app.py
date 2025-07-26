from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # 🧠 this is what fixes the CORS issue

app = Flask(__name__)
CORS(app)  # ✅ enables CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///anime.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Anime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(200), nullable=False)
    done = db.Column(db.Boolean, default=False)
    category = db.Column(db.String(100), nullable=False, default='general')

# create db tables
with app.app_context():
    db.create_all()

@app.route("/anime_list", methods=["GET"])
def get_anime_list():
    category = request.args.get('category', 'general')  # Default to 'general' if no category specified
    animes = Anime.query.filter_by(category=category).all()
    return jsonify([{"id": a.id, "label": a.label, "done": a.done, "category": a.category} for a in animes])

@app.route("/anime_list", methods=["POST"])
def add_anime():
    data = request.get_json()
    category = data.get('category', 'general')  # Default to 'general' if no category specified
    new_anime = Anime(label=data["label"], done=False, category=category)
    db.session.add(new_anime)
    db.session.commit()
    return jsonify({"message": "Anime added"}), 201

@app.route("/anime_list/<int:id>", methods=["DELETE"])
def delete_anime(id):
    anime = Anime.query.get(id)
    if anime:
        db.session.delete(anime)
        db.session.commit()
        return jsonify({"message": "Anime deleted"}), 200
    else:
        return jsonify({"error": "Anime not found"}), 404

@app.route("/categories", methods=["GET"])
def get_categories():
    categories = db.session.query(Anime.category).distinct().all()
    return jsonify([category[0] for category in categories])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)