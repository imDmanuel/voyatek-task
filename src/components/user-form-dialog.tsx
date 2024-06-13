import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  PiCaretUpDownBold,
  PiEyeClosed,
  PiUser,
  PiUserBold,
} from "react-icons/pi";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserFormSchema, userFormSchema } from "@/lib/schemas";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User, UserDialogType } from "@/lib/types";

export default function UserFormDialog({
  type = "edit",
  preloadValues = {
    email: "",
    fullName: "",
    role: "",
    password: "",
  },
  userFormDialogOpen,
  setUserFormDialogOpen,
  onSubmit,
}: {
  type: UserDialogType;
  preloadValues?: UserFormSchema & { id?: string };
  userFormDialogOpen: boolean;
  setUserFormDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (
    values: UserFormSchema,
    type: UserDialogType,
    id?: string
  ) => Promise<void>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: preloadValues.email,
      fullName: preloadValues.fullName,
      password: preloadValues.password,
      role: preloadValues.role,
    },
  });

  const sendForm = async (values: UserFormSchema) => {
    if (preloadValues.id) {
      await onSubmit(values, type, preloadValues.id);
    } else {
      await onSubmit(values, type);
    }
  };

  return (
    <>
      {/* NEW USER DIALOG */}
      <Dialog open={userFormDialogOpen} onOpenChange={setUserFormDialogOpen}>
        <DialogContent className="max-w-xl p-8 pb-14">
          <DialogHeader className="text-center">
            <div className="inline-grid mx-auto place-items-center size-16 rounded-full bg-primary-50 border border-primary-200 text-primary-600">
              <PiUserBold className="size-7" />
            </div>
            <div className="text-neutral-1000 text-2xl text-center">
              {type === "new" ? "New User" : "Edit User"}
            </div>
          </DialogHeader>
          <div>
            <Form {...form}>
              {/* TODO: CHECK UP FORM PLACEHOLDEER COLOURS */}
              <form
                onSubmit={form.handleSubmit(sendForm)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="text-neutral-800 placeholder-[#676E7E] bg-transparent"
                          placeholder="New User's Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          className="text-neutral-800 placeholder-[#676E7E] bg-transparent"
                          placeholder="New User’s Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-neutral-800 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                            <SelectValue
                              placeholder="Select Role"
                              className="placeholder-[#676E7E]"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            showIndicator={false}
                            value="Administrator"
                            className="rounded-none border-b border-b-[#E4E7EC]"
                          >
                            Administrator
                          </SelectItem>
                          <SelectItem
                            showIndicator={false}
                            className="rounded-none border-b border-b-[#E4E7EC]"
                            value="Sales Manager"
                          >
                            Sales Manager
                          </SelectItem>
                          <SelectItem
                            showIndicator={false}
                            value="Sales Representative"
                          >
                            Sales Representative
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Create Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center border border-grey-300 rounded-lg">
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="text-neutral-800 placeholder:text-[#676E7E] bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Create a password for new user"
                            {...field}
                          />
                          <button
                            onClick={() => setShowPassword((v) => !v)}
                            type="button"
                            className="pl-3 pr-4 py-2.5"
                          >
                            <PiEyeClosed className="size-5" />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full font-bold text-base"
                  disabled={form.formState.isSubmitting}
                >
                  {type === "new" ? "Add User" : "Update User"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      {/* END NEW USER DIALOG */}
    </>
  );
}
