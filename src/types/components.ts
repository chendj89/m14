import type { MessageApi, TreeSelectOption } from "naive-ui";
import type { Ref, VNode } from "vue";

export interface HeaderCellStyle {
  backgroundColor?: string;
  color: string;
}

export interface TableConfig {
  dataList: Array<any>;
  stripe: boolean;
  border: boolean;
  size: string;
  headerCellStyle: HeaderCellStyle;
  height: string | number;
  tableLoading: boolean;
}

export interface SelectOptionItem {
  label: string;
  value: any;
}

export interface TableSearchItem {
  key: string | number;
  label: string;
  value: any;
  placeholder?: string;
  associatedOption?: string;
  onChange?: (value: any, associationItem: string) => void;
  span?: number;
}

export interface FormItem extends TableSearchItem {
  required?: boolean;
  validator?: (value: FormItem, message: MessageApi) => boolean;
  hidden?: boolean;
  inputType?: string;
  maxLength?: number;
  rows?: number;
  disabled?: Ref<boolean> | boolean;
  optionItems?: Array<SelectOptionItem | TreeSelectOption>;
  path?: string;
  reset?: (formItem: FormItem) => void;
  render?: (formItem: FormItem) => VNode;
}

export interface LikeSearchModel {
  conditionItems: Array<TableSearchItem> | null;
  extraParams?: (() => Record<string, any>) | Record<string, any>;
}

export interface TablePropsType {
  title: string;
  key: string;
  sortIndex: number;
  checked: Ref<boolean>;
}

export type DataFormType = InstanceType<
  typeof import("../components/common/DataForm").default
>;

export type SvgIconType = InstanceType<
  typeof import("../components/svg-icon/index.vue").default
>;
