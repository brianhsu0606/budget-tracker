export interface Transaction {
  id: string | null
  date: string
  name: string
  category: string
  amount: number
}

// export interface TransactionForm {
//   id: string
//   date: string
//   name: string
//   category: string
//   amount: number
// }

export interface Category {
  key: string
  title: string
  icon: string
  color: string
}
