export const enum ModalStateEnum {
  Create = "create",
  Update = "update",
  Hidden = "hidden",
  View = "view",
}

export const QUERY_KEYS = {
  SUPPLIER: ["supplier"],
  MATERIAL: ["material"],
  PRODUCT: ["product"],
  PRODUCT_NIP: ["product", "nip"],
  PRODUCT_NIP_ID: (id?: number) => [...QUERY_KEYS.PRODUCT_NIP, id],
};

export const TABLE_ID_WIDTH = "9%";
export const TABLE_DATE_WIDTH = "15%";
export const TABLE_ACTIONS_WIDTH = "11%";
export const TABLE_MATERIAL_SUPPLIER_NAME_WIDTH = "15%";

export const ROWS_PER_PAGE = 10;
