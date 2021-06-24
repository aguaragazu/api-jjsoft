export interface IModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  whitelist: string[];
}