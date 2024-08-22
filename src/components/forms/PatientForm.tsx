"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import  {Button} from "@/components/ui/button"
import { createUser } from "@/lib/actions/patient.action"


export enum FormFieldType{
  INPUT='input',
  TEXTAREA = 'textarea',
  PHONE_INPUT ='phoneinput',
  CHECKBOX ='checkbox',
  DATE_PICKER='datePicker',
  SELECT ='select',
  SKELETON ='skeleton',
}
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
 
const PatientForm = () => {
  const router =useRouter();
  const [isLoading,setIsLoading] =useState(false);
  
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })
  // async function onSubmit ({ name,email,phone}:z.infer<typeof UserFormValidation>){
  //   setIsLoading(true);
  //    try{
  //     const userData ={ name, email, phone}

  //     const user = await createUser(userData);
  //     if(user) router.push('/register')
  //    } catch (error) {
  //     console.log(error);
  //    }
  // }
 
 
  
    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
          <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋 </h1>
            <p className="text-dark-700">Schedule your first appointment.</p>

          </section>
          <CustomFormField
          fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="JOHN Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
            />
         <CustomFormField
          fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            />
            <CustomFormField
             fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="1234567890"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
            />
          
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    )
}
 export  default PatientForm;
