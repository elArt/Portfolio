export interface Project {
  id: number
  slug: string
  name: string
  short: string       // короткий опис (uk)
  short_en?: string   // короткий опис (en)
  description: string // повний HTML-опис (uk)
  description_en?: string // повний HTML-опис (en)
  stack: string[]
  year: string
  demoUrl?: string    // посилання на демо (опціонально)
  githubUrl?: string  // посилання на GitHub (опціонально)
  imageUrl?: string   // скрін проекту (опціонально)
}
