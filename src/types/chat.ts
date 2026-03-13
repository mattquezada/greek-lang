export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatSession {
  id: string
  user_id: string | null
  title: string | null
  messages: ChatMessage[]
  created_at: string
  updated_at: string
}
