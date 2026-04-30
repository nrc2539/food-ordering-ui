export interface RolePermissionGuardProps {
  children: React.ReactNode;
}

export enum FeatureEnum {
  ORDERS = "orders",
  TABLES = "tables",
  STAFF = "staff",
  CATEGORIES = "categories",
  MENUS = "menus",
}
