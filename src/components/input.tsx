import { capitalize } from "@/function/capitalize";
import React, { InputHTMLAttributes } from "react";
import {
  set,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormTrigger,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<any> {
  title: string;
  entity: string;
  errors: boolean;
  classNameInput?: string;
  classNameLable?: string;
  setValue?: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  register: UseFormRegister<T>;
  errorsMsg: string | undefined;
}

export default function InputComponent<T extends FieldValues>({
  entity,
  title,
  errors,
  trigger,
  register,
  setValue,
  errorsMsg,
  classNameInput,
  classNameLable,
  ...rest
}: InputProps<T>) {
  return (
    <div className="flex flex-col w-full gap-y-2">
      <label htmlFor="nome" className={`font-semibold text-[15px]`}>
        {capitalize(title)}
      </label>
      <input
        {...rest}
        placeholder={capitalize(title)}
        {...register(`${entity}` as Path<T>, {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            if (setValue) {
              setValue(
                `${entity}` as Path<T>,
                e.target.value as PathValue<T, Path<T>>
              );
            }
            trigger(`${entity}` as Path<T>);
          },
        })}
        className={`
                w-full
                p-5
                rounded-md
                font-light
                bg-white
                border-2
                outline-none
                transition
                placeholder:text-[12px]
                ${errors && "border-[1px] border-red-700 "}`}
      />
      <span className="text-red-700 text-[15px] w-full">
        {errors && errorsMsg}
      </span>
    </div>
  );
}
