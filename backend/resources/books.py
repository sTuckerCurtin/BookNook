from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Favorite
from database.schemas import review_schema, reviews_schema, favorite_schema, favorites_schema
from flask_cors import CORS
from flask import Flask
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError

class UserReviewResource(Resource):
    @jwt_required()
    def post(self):
        try:
            user_id = get_jwt_identity()
            form_data = request.get_json()
            new_review = review_schema.load(form_data)
            new_review.user_id = user_id
            db.session.add(new_review)
            db.session.commit()
            return review_schema.dump(new_review), 201
        except ValidationError as err:
            return err.messages ,400



class UserFavoritesResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_favorites = Favorite.query.filter_by(user_id=user_id).all()
        serialized_favorites = favorites_schema.dump(user_favorites)
        return serialized_favorites, 200

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_favorite = favorite_schema.load(form_data)
        new_favorite.user_id = user_id
        db.session.add(new_favorite)
        db.session.commit()
        serialized_favorite = favorite_schema.dump(new_favorite)
        return serialized_favorite, 201


class GetBookInformation(Resource):
    @jwt_required()
    def get(self, book_id):
        reviews = Review.query.filter_by(book_id=book_id).all()
        average_rating = calculate_avg(reviews)
        is_favorited = check_user_fav(book_id)
        
        review_data = reviews_schema.dump(reviews)
        
        response = {
            "reviews": review_data,
            "average_rating": average_rating,
            "is_favorited": is_favorited,
        }
        
        return response



def calculate_avg(reviews):
    if len(reviews) == 0:
        return "NO REVIEWS"

    total_rating = sum(review.rating for review in reviews)
    return total_rating / len(reviews)


def check_user_fav(book_id):
    user_id = get_jwt_identity()
    favorite = Favorite.query.filter_by(user_id=user_id, book_id=book_id).first()
    return favorite is not None

class ReviewDetailResource(Resource):
    @jwt_required()
    def put (self, review_id):
        user_id = get_jwt_identity()
        edit_review = Review.query.get_or_404(review_id)
        if "book_id" in request.json:
            edit_review.book_id=request.json["book_id"]
        if "text" in request.json:
            edit_review.text=request.json["text"]
        if "rating" in request.json:
            edit_review.rating=request.json["rating"]
        db.session.commit()
        return review_schema.dump(edit_review), 200
    
    @jwt_required()
    def delete(self, review_id):
        user_id = get_jwt_identity()
        delete_review = Review.query.get_or_404(review_id)
        db.session.delete(delete_review)
        db.session.commit()
        return '', 204