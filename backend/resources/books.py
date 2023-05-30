from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Review, Favorite
from database.schemas import review_schema, reviews_schema, favorite_schema, favorites_schema


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
    @jwt_required
    def get(self):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user_favorites = Favorite.query.filter_by(user_id=user_id).all()
            return favorites_schema.dump(user_favorites), 200
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
        return favorite_schema.dump(new_favorite), 201


class GetBookInformation(Resource):
    def get(self, book_id):
        reviews = Review.query.filter_by(book_id=book_id).all()
        average_rating = calculate_avg(reviews)
        is_favorited = check_user_fav(book_id)
        response = {
            "Reviews": reviews_schema.dump(reviews),
            "Average Rating": average_rating,
            "Favorited?": is_favorited,
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
