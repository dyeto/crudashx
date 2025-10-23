// types/ResourceViewConfig.ts
export type FieldConfig = {
    /**
     * List of field names to include (e.g. ["name", "email"]).
     * If omitted, all fields are included unless excluded.
     */
    include?: string[];
  
    /**
     * List of field names to exclude (e.g. ["password", "token"]).
     * Takes precedence over `include`.
     */
    exclude?: string[];
  
    /**
     * Optional label overrides for fields.
     */
    labels?: Record<string, string>;
  
    /**
     * Optional field order (for display priority).
     */
    order?: string[];
  
    /**
     * Optional custom components or renderers for specific fields.
     * e.g. { avatar: AvatarRenderer, status: StatusTag }
     */
    renderers?: Record<string, React.ComponentType<any>>;
  };
  
  export type ResourceViewModes = "list" | "show" | "create" | "update";
  
  /**
   * Main configuration object for each resource.
   * Each view can define what fields to display or omit.
   */
  export type ResourceViewConfig = Partial<Record<ResourceViewModes, FieldConfig>>;
  