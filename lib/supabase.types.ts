export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          author: string
          created_at: string
          id: string
          image: string
          isbn10: string
          isbn13: string
          price: number
          pubdate: string
          publisher: string
          subtitle: string | null
          summary: string
          title: string | null
        }
        Insert: {
          author: string
          created_at?: string
          id?: string
          image: string
          isbn10: string
          isbn13: string
          price: number
          pubdate: string
          publisher: string
          subtitle?: string | null
          summary: string
          title?: string | null
        }
        Update: {
          author?: string
          created_at?: string
          id?: string
          image?: string
          isbn10?: string
          isbn13?: string
          price?: number
          pubdate?: string
          publisher?: string
          subtitle?: string | null
          summary?: string
          title?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          sell_id: string | null
          seller_id: string
          status: string | null
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          sell_id?: string | null
          seller_id: string
          status?: string | null
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          sell_id?: string | null
          seller_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_sell_id_fkey"
            columns: ["sell_id"]
            referencedRelation: "sells"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          academy: string | null
          address: string | null
          campus: string | null
          created_at: string
          gender: string | null
          grade: number | null
          id: string
          notify_email: string | null
          university: string | null
          wechat: string | null
        }
        Insert: {
          academy?: string | null
          address?: string | null
          campus?: string | null
          created_at?: string
          gender?: string | null
          grade?: number | null
          id: string
          notify_email?: string | null
          university?: string | null
          wechat?: string | null
        }
        Update: {
          academy?: string | null
          address?: string | null
          campus?: string | null
          created_at?: string
          gender?: string | null
          grade?: number | null
          id?: string
          notify_email?: string | null
          university?: string | null
          wechat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sells: {
        Row: {
          book_id: string
          condition: string | null
          created_at: string
          id: string
          order_id: string | null
          price: number
          seller_id: string
        }
        Insert: {
          book_id: string
          condition?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
          price: number
          seller_id: string
        }
        Update: {
          book_id?: string
          condition?: string | null
          created_at?: string
          id?: string
          order_id?: string | null
          price?: number
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sells_book_id_fkey"
            columns: ["book_id"]
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sells_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sells_seller_id_fkey"
            columns: ["seller_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
