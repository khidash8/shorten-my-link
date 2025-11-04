export interface CreatedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  clicks: number;
  createdAt: string;
}
