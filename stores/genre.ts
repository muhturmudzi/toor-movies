import { defineStore } from 'pinia'
import type { IGenre } from '~/services/genre'

interface State {
  genres: IGenre[]
}

export const useGenreMovieStore = defineStore('genreMovies', {
  state: (): State => ({
    genres: []
  }),

  getters: {
    getGenreNameById: (state) => (id: number): string | undefined => {
      const genre = state.genres.find((genre) => genre.id === id)
      return genre?.name
    },
  },
})