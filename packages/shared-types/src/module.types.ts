export interface Module {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  isStandalone: boolean;
  icon?: string;
  order: number;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

