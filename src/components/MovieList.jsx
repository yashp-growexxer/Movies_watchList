import { Button, Checkbox, List, Skeleton } from "antd";
import React from "react";
import {
  useGetMoviesQuery,
  useEditMoviesMutation,
  useDeleteMoviesMutation,
} from "../store/slice/movieApi";

const MovieList = () => {
  const { data: movies, isLoading, error } = useGetMoviesQuery();
  console.log("movies data", movies);

  const [editMovies] = useEditMoviesMutation();
  const [deleteMovies] = useDeleteMoviesMutation();

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    return <p>Error loading movies....</p>;
  }

  const handleToggle = async (id, watched, title) => {
    try {
      await editMovies({ id,title , watched: !watched });
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <div>
      <h2>Movies List</h2>
      <List
        header={<h3>Movies List ... </h3>}
        dataSource={movies}
        renderItem={(movie) => (
          <List.Item
            actions={[
              <Checkbox
                checked={movie.watched}
                onChange={() => handleToggle(movie.id, movie.watched , movie.title)}
              />,
              <Button danger onClick={() => deleteMovies(movie.id)}>
                Delete
              </Button>,
            ]}
          >
            {movie.title}
          </List.Item>
        )}
      />
    </div>
  );
};

export default MovieList;
