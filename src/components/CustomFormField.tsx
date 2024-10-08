"use client";

import {
  
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image"; // Assuming you are using Next.js
import React from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField: React.FC<{ field: any; props: CustomProps }> = ({ field, props }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
      case FormFieldType.PHONE_INPUT:
         return (
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value ={field.value as E164Number || undefined}
              onChange={field.onChange}
              className="input-phone shad-input border-0"
              />
          </FormControl>
         )
         case FormFieldType.DATE_PICKER:
          return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
              <Image
                src="/assets/icons/calendar.svg"
                height={24}
                width={24}
                alt="user"
                className="ml-2"
              />
              <DatePicker
                showTimeSelect={props.showTimeSelect ?? false}
                selected={field.value}
                onChange={(date: Date | [Date] | null) => {
                    if (date instanceof Date) {
                        field.onChange(date);
                    } else if (Array.isArray(date)) {
                        // Handle Date[] if necessary
                        field.onChange(date[0] || null); // Example, adjust as needed
                    } else {
                        field.onChange(null);
                    }
                }}
                timeInputLabel="Time:"
                dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                wrapperClassName="date-picker"
            />
            </div>
          );
          case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return ;
  }
};

const CustomFormField: React.FC<CustomProps> = (props) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;