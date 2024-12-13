export const getTrendingMovies = async (query: any = {}): Promise<IGeneralResponse<string>> => {
  try {
    const res: IGeneralResponse<string> = await useGetFetch('/3/trending/movie/day', {
      query: query
    })

    return res
  } catch (error: any) {
    throw new Error(error)
  }
}