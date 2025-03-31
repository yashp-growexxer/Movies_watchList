import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["movies"], // ✅ Add this for caching & invalidation
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => ({
        url: "/movies",
        method: "GET",
      }),
      providesTags: ["movies"], // ✅ Moved outside query
    }),
    addMovies: builder.mutation({
      query: (newMovie) => ({
        url: "/movies",
        method: "POST", // ✅ Method should come first
        body: newMovie,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["movies"], // ✅ Correct placement
    }),
    editMovies: builder.mutation({
      query: ({ id, ...updatedMovie }) => ({
        url: `/movies/${id}`,
        method: "PUT",
        body: updatedMovie,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["movies"],
    }),
    deleteMovies: builder.mutation({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["movies"],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useAddMoviesMutation,
  useEditMoviesMutation,
  useDeleteMoviesMutation,
} = movieApi;
