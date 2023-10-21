export interface Pet {
  name: string
  description: string
  type: string
  image_url: string
  create_at: string
  update_at: string
  id: string
}

export interface CreatePetInput {
  name: string
  description: string
  type: string
  image_url: string
  create_at: string
  update_at: string
}
