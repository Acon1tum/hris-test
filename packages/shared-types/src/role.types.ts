export interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

