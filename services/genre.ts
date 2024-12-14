export interface IGenre {
  id: number
  name: string
}

export const getGenreMovies = async (query?: any): Promise<{ genres: IGenre[] }> => {
  try {
    const res: { genres: IGenre[] } = await useGetFetch('/3/genre/movie/list', {
      query
    })

    return res
  } catch (error: any) {
    throw new Error(error)
  }
}