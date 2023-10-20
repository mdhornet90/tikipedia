export interface GenericFormFieldConfiguration<T> {
  name: string;
  initialValue?: T;
  validationRule?: (value: T) => boolean;
}

export type FormFieldConfiguration =
  | GenericFormFieldConfiguration<string>
  | GenericFormFieldConfiguration<number>;
