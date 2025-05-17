import Header from '../components/Header';
import Footer from '../components/Footer';
import FavoriteCard from '../components/FavoriteCard';
import { useFavorites } from '../utils/favoriteStore';
import { Button } from '../components/ui/button';
import { BookmarkX } from 'lucide-react';

const Favorites = () => {
  const { favorites, deleteFavorite, error } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
        <p className="text-muted-foreground mb-8">
          All your saved combinations in one place
        </p>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <FavoriteCard
                key={favorite.id}
                favorite={favorite}
                onDelete={deleteFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookmarkX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">
              Save combinations from the home page to see them here
            </p>
            <Button asChild>
              <a href="/">Return to Generator</a>
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
