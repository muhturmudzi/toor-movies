import type { IGenre } from './genre'

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
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IDetailMovie extends IMovie {
  genres: IGenre[]
  status: string
  spoken_languages: IMovieLang[]
  revenue: number
  production_companies: IProductionCompany[]
}

export interface IMovieLang {
  english_name: string
  iso_639_1: string
  name: string
}

export interface IProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export const getTrendingMovies = async (query?: any): Promise<IGeneralResponse<IMovie[]>> => {
  try {
    const res: IGeneralResponse<IMovie[]> = await useGetFetch('/3/trending/movie/day', {
      query
    })

    return res
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getDiscoverMovies = async (query?: any): Promise<IGeneralResponse<IMovie[]>> => {
  try {
    const res: IGeneralResponse<IMovie[]> = await useGetFetch('/3/discover/movie', {
      query
    })

    return res
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getRecommendationMovies = async (id: number, query?: any): Promise<IGeneralResponse<IMovie[]>> => {
  try {
    const res: IGeneralResponse<IMovie[]> = await useGetFetch(`/3/movie/${id}/recommendations`, {
      query
    })

    return res
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getDetailMovies = async (id: number, query?: any): Promise<IDetailMovie> => {
  try {
    const res: IDetailMovie = await useGetFetch(`/3/movie/${id}`, {
      query
    })

    return res
  } catch (error: any) {
    throw new Error(error)
  }
}