export interface ShortLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias: string | null;
  clicks: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
