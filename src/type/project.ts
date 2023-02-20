type projectKey = 'id' | 'name' | 'url' | 'github' | 'description' | 'thumb'

export type projectItem = {
  [keyof in projectKey]: string
}

export type project = Array<projectItem>