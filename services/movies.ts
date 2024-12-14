export interface IMovie {
  backdrop_path: string
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  adult: boolean
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date: number
  video: boolean
  vote_average: number
  vote_count: number
}

export const getTrendingMovies = async (query?: any): Promise<IGeneralResponse<IMovie[]>> => {
  try {
    const res: IGeneralResponse<IMovie[]> = await useGetFetch('/3/trending/movie/day', {
      query: query
    })

    return res
  } catch (error: any) {
    throw new Error(error)
  }
}