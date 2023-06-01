import React, { useState, useEffect} from 'react';
import FavoritesList from '../../components/FavoritesList/FavoritesList';


function FavoritesPage({favorite}) {

//     const [favorites, setFavorites] = useState([])
//     const [user, token] = useAuth();
//     const { book_id } = useParams();

//     const fetchFavorites = async () => {
//         try {
//           const config = {
//             headers: {
//               Authorization: "Bearer " + token,
//             },
//           };
    
//           const response = await axios.get(`http://127.0.0.1:5000/api/favorites`, config);
//           const favoriteData = response.data;
//           setFavorites(favoriteData.reviews);
//         } catch (error) {
//           console.error('Error getting favorites', error);
//         }
//       };

//       useEffect(() => {
//         fetchFavorites();
//       }, [token, book_id]);
    
//       if (!favoritesDetails) {
//         return <div>Loading...</div>;
//       }
    return ( 

        <div>
            <h1>Favorites Details Page</h1>
            <FavoritesList/>
            
        </div>


     );
}

export default FavoritesPage;