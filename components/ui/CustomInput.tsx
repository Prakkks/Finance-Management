// import React from 'react'
// import { FormControl, FormField, FormLabel, FormMessage } from './form'
// import { Input } from './input'
// import {Control, FieldPath, Form} from 'react-hook-form'
// import z from 'zod'
// import { authFormSchema } from '@/lib/utils'
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
// import { format } from 'date-fns'
// import { Button } from './button'
// import { Calendar } from './calendar'
// import { CalendarIcon } from 'lucide-react'

// const formSchema = authFormSchema('sign-up');
// interface CustomInput {
//     control : Control<z.infer<typeof formSchema>> ,
//     name : FieldPath<z.infer<typeof formSchema>>
//     label : string,
//     placeholder : string,
// }

// const CustomInput = ({control,name,label,placeholder}: CustomInput ) => {
//    return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <div className="form-item">
//           <FormLabel className="form-label">{label}</FormLabel>
//           <div className="flex w-full flex-col">
//             <FormControl>
//               {/* 📅 Conditionally render date picker */}
//               {name === "dob" ? (
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className={`w-full justify-start text-left font-normal ${
//                         !field.value && "text-muted-foreground"
//                       }`}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {field.value ? format(field.value, "PPP") : "Pick a date"}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto p-0 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg">
//                   <Calendar
//                     mode="single"
//                     selected={field.value ? new Date(field.value) : undefined}
//                     onSelect={(date) => {
//                     if (date) {
//                     field.onChange(format(date, "yyyy-MM-dd"));
//                     }
//                     }}
//                     captionLayout="dropdown"
//                     fromYear={1950}
//                     toYear={new Date().getFullYear()}
//                   />
//                   </PopoverContent>
//                 </Popover>
//               ) : (
//                 <Input
//                   placeholder={placeholder}
//                   className="input-class"
//                   // name={name}
//                   autoComplete={name === "password" ? "current-password" : "off"}
//                   type={name === "password" ? "password" : "text"}
//                   {...field}
//                 />
//               )}
//             </FormControl>
//             <FormMessage className="form-message mt-2" />
//           </div>
//         </div>
//       )}
//     />
//   );
// }

// export default CustomInput


import React from 'react'


import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'
import { FormControl, FormField, FormLabel, FormMessage } from './form'
import { Input } from './input'

const formSchema = authFormSchema('sign-up')

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input 
                placeholder={placeholder}
                className="input-class"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput