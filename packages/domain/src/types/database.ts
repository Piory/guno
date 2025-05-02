export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      t_post_medias: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          display_order: number;
          id: string;
          post_id: number;
          type: Database['public']['Enums']['media_type'];
          updated_at: string;
          url: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          display_order: number;
          id?: string;
          post_id: number;
          type: Database['public']['Enums']['media_type'];
          updated_at?: string;
          url: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          display_order?: number;
          id?: string;
          post_id?: number;
          type?: Database['public']['Enums']['media_type'];
          updated_at?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 't_post_medias_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 't_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 't_post_medias_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_cores';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_post_medias_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_engagements';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_post_medias_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_post_medias_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['repost_post_id'];
          },
        ];
      };
      t_posts: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: number;
          referenced_post_id: number | null;
          text: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          referenced_post_id?: number | null;
          text?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: number;
          referenced_post_id?: number | null;
          text?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 't_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_cores';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_engagements';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['repost_post_id'];
          },
          {
            foreignKeyName: 't_posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
      t_user_follows: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          follow_user_id: string;
          id: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          follow_user_id: string;
          id?: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          follow_user_id?: string;
          id?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 't_user_follows_follow_user_id_fkey';
            columns: ['follow_user_id'];
            isOneToOne: false;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 't_user_follows_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
      t_user_post_favorites: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: string;
          post_id: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          post_id: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          post_id?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 't_user_post_favorites_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 't_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 't_user_post_favorites_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_cores';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_user_post_favorites_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_engagements';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_user_post_favorites_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_user_post_favorites_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['repost_post_id'];
          },
          {
            foreignKeyName: 't_user_post_favorites_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
      t_user_profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          deleted_at: string | null;
          display_name: string;
          self_introduction: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          display_name: string;
          self_introduction?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          deleted_at?: string | null;
          display_name?: string;
          self_introduction?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 't_user_profiles_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
      t_user_timelines: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: string;
          post_id: number;
          type: Database['public']['Enums']['timeline_type'];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          post_id: number;
          type: Database['public']['Enums']['timeline_type'];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          post_id?: number;
          type?: Database['public']['Enums']['timeline_type'];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 't_user_timelines_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 't_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 't_user_timelines_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_cores';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_user_timelines_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_engagements';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_user_timelines_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_user_timelines_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['repost_post_id'];
          },
          {
            foreignKeyName: 't_user_timelines_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
      t_users: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          id: string;
          screen_name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          id: string;
          screen_name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          id?: string;
          screen_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      v_post_cores: {
        Row: {
          created_at: string | null;
          deleted_at: string | null;
          medias: Json | null;
          post_id: number | null;
          referenced_post_id: number | null;
          text: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 't_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_cores';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 'v_post_engagements';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['post_id'];
          },
          {
            foreignKeyName: 't_posts_referenced_post_id_fkey';
            columns: ['referenced_post_id'];
            isOneToOne: false;
            referencedRelation: 'v_posts';
            referencedColumns: ['repost_post_id'];
          },
          {
            foreignKeyName: 't_posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
      v_post_engagements: {
        Row: {
          favorite_count: number | null;
          is_favorited: boolean | null;
          is_reposted: boolean | null;
          post_id: number | null;
          repost_count: number | null;
        };
        Relationships: [];
      };
      v_posts: {
        Row: {
          created_at: string | null;
          deleted_at: string | null;
          display_medias: Json | null;
          display_text: string | null;
          favorite_count: number | null;
          is_favorited: boolean | null;
          is_reposted: boolean | null;
          post_id: number | null;
          quote_medias: Json | null;
          quote_text: string | null;
          repost_count: number | null;
          repost_created_at: string | null;
          repost_deleted_at: string | null;
          repost_post_id: number | null;
          repost_type: string | null;
          repost_updated_at: string | null;
          repost_user_id: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 't_posts_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 't_posts_user_id_fkey';
            columns: ['repost_user_id'];
            isOneToOne: false;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
      v_user_details: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          deleted_at: string | null;
          display_name: string | null;
          favorite_posts: Json | null;
          follow_count: number | null;
          follower_count: number | null;
          latest_posts: Json | null;
          screen_name: string | null;
          self_introduction: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 't_user_profiles_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
      v_users: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          display_name: string | null;
          screen_name: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 't_user_profiles_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 't_users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Functions: {
      citext: {
        Args: { '': boolean } | { '': string } | { '': unknown };
        Returns: string;
      };
      citext_hash: {
        Args: { '': string };
        Returns: number;
      };
      citextin: {
        Args: { '': unknown };
        Returns: string;
      };
      citextout: {
        Args: { '': string };
        Returns: unknown;
      };
      citextrecv: {
        Args: { '': unknown };
        Returns: string;
      };
      citextsend: {
        Args: { '': string };
        Returns: string;
      };
      create_post: {
        Args: {
          timeline_type: Database['public']['Enums']['timeline_type'];
          text: string;
          medias: Json;
        };
        Returns: number;
      };
      create_post_for_repost: {
        Args: {
          timeline_type: Database['public']['Enums']['timeline_type'];
          referenced_post_id: number;
        };
        Returns: number;
      };
      generate_snowflake_id: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
    };
    Enums: {
      media_type: 'image' | 'video';
      timeline_type: 'follow';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views']) | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] & Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] & Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      media_type: ['image', 'video'],
      timeline_type: ['follow'],
    },
  },
} as const;

// Schema: graphql_public
// Functions
export type ArgsGraphql = Database['graphql_public']['Functions']['graphql']['Args'];
export type ReturnTypeGraphql = Database['graphql_public']['Functions']['graphql']['Returns'];

// Schema: public
// Enums
export enum MediaType {
  image = 'image',
  video = 'video',
}

export enum TimelineType {
  follow = 'follow',
}

// Tables
export type TPostMedias = Database['public']['Tables']['t_post_medias']['Row'];
export type InsertTPostMedias = Database['public']['Tables']['t_post_medias']['Insert'];
export type UpdateTPostMedias = Database['public']['Tables']['t_post_medias']['Update'];

export type TPosts = Database['public']['Tables']['t_posts']['Row'];
export type InsertTPosts = Database['public']['Tables']['t_posts']['Insert'];
export type UpdateTPosts = Database['public']['Tables']['t_posts']['Update'];

export type TUserFollows = Database['public']['Tables']['t_user_follows']['Row'];
export type InsertTUserFollows = Database['public']['Tables']['t_user_follows']['Insert'];
export type UpdateTUserFollows = Database['public']['Tables']['t_user_follows']['Update'];

export type TUserPostFavorites = Database['public']['Tables']['t_user_post_favorites']['Row'];
export type InsertTUserPostFavorites = Database['public']['Tables']['t_user_post_favorites']['Insert'];
export type UpdateTUserPostFavorites = Database['public']['Tables']['t_user_post_favorites']['Update'];

export type TUserProfiles = Database['public']['Tables']['t_user_profiles']['Row'];
export type InsertTUserProfiles = Database['public']['Tables']['t_user_profiles']['Insert'];
export type UpdateTUserProfiles = Database['public']['Tables']['t_user_profiles']['Update'];

export type TUserTimelines = Database['public']['Tables']['t_user_timelines']['Row'];
export type InsertTUserTimelines = Database['public']['Tables']['t_user_timelines']['Insert'];
export type UpdateTUserTimelines = Database['public']['Tables']['t_user_timelines']['Update'];

export type TUsers = Database['public']['Tables']['t_users']['Row'];
export type InsertTUsers = Database['public']['Tables']['t_users']['Insert'];
export type UpdateTUsers = Database['public']['Tables']['t_users']['Update'];

// Views
export type VPostCores = Database['public']['Views']['v_post_cores']['Row'];

export type VPostEngagements = Database['public']['Views']['v_post_engagements']['Row'];

export type VPosts = Database['public']['Views']['v_posts']['Row'];

export type VUserDetails = Database['public']['Views']['v_user_details']['Row'];

export type VUsers = Database['public']['Views']['v_users']['Row'];

// Functions
export type ArgsCitext = Database['public']['Functions']['citext']['Args'];
export type ReturnTypeCitext = Database['public']['Functions']['citext']['Returns'];

export type ArgsCitextHash = Database['public']['Functions']['citext_hash']['Args'];
export type ReturnTypeCitextHash = Database['public']['Functions']['citext_hash']['Returns'];

export type ArgsCitextin = Database['public']['Functions']['citextin']['Args'];
export type ReturnTypeCitextin = Database['public']['Functions']['citextin']['Returns'];

export type ArgsCitextout = Database['public']['Functions']['citextout']['Args'];
export type ReturnTypeCitextout = Database['public']['Functions']['citextout']['Returns'];

export type ArgsCitextrecv = Database['public']['Functions']['citextrecv']['Args'];
export type ReturnTypeCitextrecv = Database['public']['Functions']['citextrecv']['Returns'];

export type ArgsCitextsend = Database['public']['Functions']['citextsend']['Args'];
export type ReturnTypeCitextsend = Database['public']['Functions']['citextsend']['Returns'];

export type ArgsCreatePost = Database['public']['Functions']['create_post']['Args'];
export type ReturnTypeCreatePost = Database['public']['Functions']['create_post']['Returns'];

export type ArgsCreatePostForRepost = Database['public']['Functions']['create_post_for_repost']['Args'];
export type ReturnTypeCreatePostForRepost = Database['public']['Functions']['create_post_for_repost']['Returns'];

export type ArgsGenerateSnowflakeId = Database['public']['Functions']['generate_snowflake_id']['Args'];
export type ReturnTypeGenerateSnowflakeId = Database['public']['Functions']['generate_snowflake_id']['Returns'];
