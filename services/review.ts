export interface IReview {
  author: string
  author_details: IReviewAuthor
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export interface IReviewAuthor {
  name: string
  username: string
  avatar_path: string
  rating: number
}

export const getReviewMovie = async (id: number, query?: any): Promise<IGeneralResponse<IReview[]>> => {
  try {
    const res: IGeneralResponse<IReview[]> = await useGetFetch(`/3/movie/${id}/reviews`, {
      query
    })

    return res
  } catch (error: any) {
    throw new Error(error)
  }
}