"use client";
import React, { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { User, UserDialogType, UserRole } from "@/lib/types";
import { PiCaretUpDownBold } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { PiMagnifyingGlass, PiPlusCircleBold } from "react-icons/pi";
import { Input } from "./ui/input";
import { LuListFilter } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import z from "zod";
import { Checkbox } from "./ui/checkbox";
import { UserFormSchema, userFormSchema } from "@/lib/schemas";
import UserFormDialog from "./user-form-dialog";
import axios from "axios";
import { toast } from "sonner";
import DeleteUserDialog from "./delete-user-dialog";

const defaultPreloadValues: UserFormSchema = {
  email: "",
  fullName: "",
  password: "",
  role: "",
};
export const columns: ColumnDef<User>[] = [
  {
    id: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left flex items-center gap-x-2 cursor-pointer"
      >
        <span className="text-sm font-medium text-neutral-1000">Name</span>
        <PiCaretUpDownBold className="text-neutral-400" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left text-sm font-medium text-grey-900">
          {row.getValue("fullName")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left flex items-center gap-x-2 cursor-pointer"
      >
        <span className="text-sm font-medium text-neutral-1000">Email</span>
        <PiCaretUpDownBold className="text-neutral-400" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-left text-sm font-normal text-grey-700">
          {row.getValue("email")}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left flex items-center gap-x-2 cursor-pointer"
      >
        <span className="text-sm font-medium text-neutral-1000">Role</span>
        <PiCaretUpDownBold className="text-neutral-400" />
      </div>
    ),
    cell: ({ row }) => {
      const role: UserRole = row.getValue("role");
      return (
        <div
          className={cn(
            "text-left text-sm font-medium inline-block rounded-xl px-3 py-0.5",
            role === "Administrator" && "text-primary-600 bg-primary-50",
            role === "Sales Manager" && "text-success-600 bg-success-100",
            role === "Sales Representative" &&
              "text-secondary-600 bg-secondary-100"
          )}
        >
          {role}
        </div>
      );
    },
  },
];

export default function UsersTable() {
  const [userFormDialogOpen, setUserFormDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [userFormDialogType, setUserFormDialogType] =
    useState<UserDialogType>("new");
  const [preloadValues, setPreloadValues] = useState<UserFormSchema>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [userToDelete, setUserToDelete] = useState<string>("");
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] =
    useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<"fullName" | "email" | "role">(
    "fullName"
  );
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    async function fetchUsers() {
      setTableLoading(true);
      try {
        const response = await axios.get<User[]>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/`
        );
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        }
      } catch {
        toast.error("Failed to fetch users");
      } finally {
        setTableLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function onSubmit(
    values: z.infer<typeof userFormSchema>,
    type: UserDialogType,
    id?: string
  ) {
    if (type === "new") {
      const toastId = toast.loading("Submitting..");
      try {
        const response = await axios.post<User>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
          values
        );
        setUsers((prevState) => [...prevState, response.data]);
        toast.success(`New user with name ${response.data.fullName} added`, {
          id: toastId,
        });
      } catch (e) {
        toast.error("An error occurred while submiting new details..", {
          id: toastId,
        });
      }
    } else {
      const toastId = toast.loading("Updating user details..");
      try {
        if (!id) {
          // if the id to patch is not present, throw an error
          throw Error();
        }
        const response = await axios.put<User>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${id}`,
          values
        );
        setUsers((prevState) =>
          prevState.map((item) => {
            if (item.id === id) {
              return response.data;
            } else {
              return item;
            }
          })
        );
        toast.success(
          `User with name ${response.data.fullName} updated successfully`,
          {
            id: toastId,
          }
        );
      } catch (e) {
        toast.error("An error occurred while updating user details..", {
          id: toastId,
        });
      }
    }
  }
  async function handleDelete(id: string) {
    const toastId = toast.loading("Deleting user..");
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${id}`
      );
      setUsers((prevState) => {
        return prevState.filter((user) => user.id !== id);
      });
      toast.success("User deleted successfully..", { id: toastId });
    } catch (e) {
      toast.error("An error occurred while deleting user..", { id: toastId });
    }
  }

  function showEditDialog(id: string) {
    const userDetails = users.find((item) => item.id === id);
    if (!userDetails) {
      toast.error("Could not find item to edit..");
      return;
    }
    setUserFormDialogOpen(() => {
      setPreloadValues(userDetails);
      setUserFormDialogType("edit");
      return true;
    });
  }

  function handleCancel() {
    setUserToDelete("");
    setDeleteUserDialogOpen(false);
  }

  return (
    <>
      <div className="rounded-lg bg-card w-full whitespace-nowrap overflow-x-auto">
        {/* TABLE ACTIONS */}
        <div className={"p-4 flex gap-x-2"}>
          {/* SEARCH INPUT FIELD */}
          <div className="flex items-center px-3 py-2 border border-neutral-300 rounded-lg w-72 min-w-52">
            <PiMagnifyingGlass />
            <Input
              placeholder="Search here..."
              className="bg-transparent border-none h-5 text-neutral-400 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={
                (table.getColumn(filterBy)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(filterBy)?.setFilterValue(event.target.value)
              }
            />
          </div>
          {/* END SEARCH INPUT FIELD */}

          <div className="flex flex-1 gap-x-2">
            {/* FILTER BUTTON */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  className="px-3 py-2 gap-x-2 border-neutral-300 text-neutral-700"
                >
                  <LuListFilter />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white z-[1]">
                <DropdownMenuCheckboxItem
                  onClick={() => {
                    table.resetColumnFilters();
                    setFilterBy("fullName");
                  }}
                  checked={filterBy === "fullName"}
                >
                  Name
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onClick={() => {
                    table.resetColumnFilters();
                    setFilterBy("email");
                  }}
                  checked={filterBy === "email"}
                >
                  Email
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  onClick={() => {
                    table.resetColumnFilters();
                    setFilterBy("role");
                  }}
                  checked={filterBy === "role"}
                >
                  Role
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* END FILTER BUTTON */}

            {/* ADD NEW USER BUTTON */}
            <Button
              className="gap-x-2 ml-auto"
              onClick={() => {
                setPreloadValues(defaultPreloadValues);
                setUserFormDialogType("new");
                setUserFormDialogOpen(true);
              }}
            >
              <PiPlusCircleBold />
              <span>New User</span>
            </Button>
            {/* END ADD NEW USER BUTTON */}
          </div>
        </div>
        {/* END TABLE ACTIONS */}

        {/* TABLE */}
        <Table>
          <TableHeader className="bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableHead>
                  <div className="text-left flex items-center gap-x-2">
                    <span className="text-sm font-medium text-neutral-1000">
                      Actions
                    </span>
                  </div>
                </TableHead>
              </TableRow>
            ))}
          </TableHeader>
          {tableLoading ? (
            <tbody>
              <tr>
                <td colSpan={columns.length}>Loading..</td>
              </tr>
            </tbody>
          ) : users.length > 0 ? (
            <TableBody className="[&_tr:last-child]:border-b">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="text-left text-sm font-bold space-x-3">
                        <Button
                          variant={"link"}
                          onClick={() => showEditDialog(row.original.id)}
                          className="p-0 bg-transparent hover:bg-transparent hover:no-underline"
                        >
                          View
                        </Button>
                        <Button
                          variant={"ghost"}
                          onClick={() => {
                            setUserToDelete(row.original.id);
                            setDeleteUserDialogOpen(true);
                          }}
                          className="p-0 bg-transparent hover:bg-transparent"
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={columns.length}>No data..</td>
              </tr>
            </tbody>
          )}
        </Table>
        {/* END TABLE */}
      </div>

      {/* Done so the form will be forced to re-render to accept new default values */}
      {userFormDialogOpen && (
        <UserFormDialog
          onSubmit={onSubmit}
          userFormDialogOpen={userFormDialogOpen}
          setUserFormDialogOpen={setUserFormDialogOpen}
          type={userFormDialogType}
          preloadValues={preloadValues}
        />
      )}

      <DeleteUserDialog
        id={userToDelete}
        // Only open the delete confirmation dialog if the userToDelete field is set
        deleteUserDialogOpen={Boolean(userToDelete) && deleteUserDialogOpen}
        setDeletteUserDialogOpen={setDeleteUserDialogOpen}
        onCancel={handleCancel}
        onConfirmDelete={handleDelete}
      />
    </>
  );
}
