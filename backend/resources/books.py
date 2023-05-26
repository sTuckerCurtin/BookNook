from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review
from database.models import db, Favorite
from database.schemas import review_schema, reviews_schema
from database.schemas import favorite_schema, favorites_schema


class UserReviewResource(Resource):
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_review = review_schema.load(form_data)
        new_review.user_id = user_id
        db.session.add(new_review)
        db.session.commit()
        return review_schema.dump(new_review), 201
    
class UserFavoritesResource(Resource):
    @jwt_required()
    def get_cars():
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user_favorites = Favorite.query.filter_by(user_id=user_id).all()
            return favorite_schema.dump(user_favorites), 200
        except:
            return "Unauthorized", 401
        
    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_favorite = favorite_schema.load(form_data)
        new_favorite.user_id = user_id
        db.session.add(new_favorite)
        db.session.commit()
        return review_schema.dump(new_favorite), 201