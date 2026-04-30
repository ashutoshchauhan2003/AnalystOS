export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: string;
          created_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          user_id: string;
          lab_id: string;
          sql_answer: string;
          insight_note: string;
          recommendation: string;
          status: "draft" | "submitted" | "reviewed";
          score: number;
          feedback: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lab_id: string;
          sql_answer?: string;
          insight_note?: string;
          recommendation?: string;
          status?: "draft" | "submitted" | "reviewed";
          score?: number;
          feedback?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lab_id?: string;
          sql_answer?: string;
          insight_note?: string;
          recommendation?: string;
          status?: "draft" | "submitted" | "reviewed";
          score?: number;
          feedback?: string;
          created_at?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          headline: string;
          bio: string;
          skills: string[];
          projects: string[];
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          headline?: string;
          bio?: string;
          skills?: string[];
          projects?: string[];
          published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          headline?: string;
          bio?: string;
          skills?: string[];
          projects?: string[];
          published?: boolean;
          created_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          company: string;
          location: string;
          role: "DA" | "BA" | "DS";
          required_skills: string[];
          description: string;
          salary_range: string;
          difficulty: "entry" | "mid";
          created_at: string;
        };
        Insert: {
          id: string;
          title: string;
          company: string;
          location?: string;
          role: "DA" | "BA" | "DS";
          required_skills?: string[];
          description?: string;
          salary_range?: string;
          difficulty?: "entry" | "mid";
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          company?: string;
          location?: string;
          role?: "DA" | "BA" | "DS";
          required_skills?: string[];
          description?: string;
          salary_range?: string;
          difficulty?: "entry" | "mid";
          created_at?: string;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lab_id: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lab_id: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          lab_id?: string;
          status?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
