export type Supplier = {
  name: string;

  // to get from BE
  id?: number;
  created_at?: string;
  updated_at?: string;
};

export type Material = {
  name: string;
  energy: string;
  protein: string;
  total_fat: string;
  saturated_fat: string;
  trans_fat: string;
  cholesterol: string;
  carbohydrate: string;
  sugars: string;
  dietary_fibre: string;
  sodium: string;

  // to get from BE
  supplier?: Supplier;
  id?: number;
  created_at?: string;
  updated_at?: string;

  // for create
  supplier_id?: number;
};

export type Product = {
  name: string;
  serving_size: number;
  serving_unit: string;
  serving_per_package: number;

  // to get from BE
  id?: number;
  created_at?: string;
  updated_at?: string;

  // for create
  sub_product_id_and_quantity?: any[];
  material_id_and_quantity?: any[];
};

export type ColumnArgument = {
  [k: string]: any;
};
