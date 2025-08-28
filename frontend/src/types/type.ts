export interface Transaction {
  id: string | null
  date: string
  name: string
  category: string
  amount: number
}

export interface Dialog {
  isVisible: boolean
  isEdit: boolean
  form: Transaction
}

export interface Category {
  key: string
  title: string
  icon: string
  color: string
}

export interface LoginForm {
  username: string
  password: string
}
