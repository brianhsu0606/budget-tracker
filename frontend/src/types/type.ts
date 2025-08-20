export interface Expense {
  date: string
  name: string
  category: string
  amount: number
}

export interface Income {
  date: string
  name: string
  category: string
  amount: number
}

export interface Category {
  key: string
  title: string
  icon: string
  color: string
}
