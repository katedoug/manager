"use client"

import { useState } from "react"
import {
  type ColumnDef, type ColumnFiltersState, type SortingState,
  type VisibilityState, type Row,
  flexRender, getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Eye, Download, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { PatientFormDialog, type PatientFormValues } from "./patient-form-dialog"
import { cn } from "@/lib/utils"

export interface Patient {
  id: number
  name: string
  species: string
  breed: string
  owner: string
  ownerEmail: string
  status: string
  lastVisit: string
  joinedDate: string
  visits: number
}

interface DataTableProps {
  patients: Patient[]
  onAddPatient: (data: PatientFormValues) => void
}

const statusClass: Record<string, string> = {
  Activo:    "text-green-700 bg-green-50 border-green-200",
  Inactivo:  "text-gray-600 bg-gray-50 border-gray-200",
  Pendiente: "text-orange-600 bg-orange-50 border-orange-200",
}

const speciesClass: Record<string, string> = {
  Canino:  "text-blue-700 bg-blue-50 border-blue-200",
  Felino:  "text-purple-700 bg-purple-50 border-purple-200",
  Ave:     "text-yellow-700 bg-yellow-50 border-yellow-200",
  Exótico: "text-pink-700 bg-pink-50 border-pink-200",
}

const exactFilter = (row: Row<Patient>, columnId: string, value: string) =>
  row.getValue(columnId) === value

export function DataTable({ patients, onAddPatient }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")

  const columns: ColumnDef<Patient>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center px-2">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Seleccionar todos"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center px-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Seleccionar fila"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "name",
      header: "Paciente",
      cell: ({ row }) => {
        const p = row.original
        return (
          <div className="flex flex-col">
            <span className="font-medium">{p.name}</span>
            <span className="text-xs text-muted-foreground">{p.breed}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "species",
      header: "Especie",
      cell: ({ row }) => {
        const s = row.getValue("species") as string
        return (
          <Badge variant="outline" className={cn("text-xs", speciesClass[s] ?? "")}>
            {s}
          </Badge>
        )
      },
      filterFn: exactFilter,
    },
    {
      accessorKey: "owner",
      header: "Tutor",
      cell: ({ row }) => {
        const p = row.original
        return (
          <div className="flex flex-col">
            <span className="text-sm">{p.owner}</span>
            <span className="text-xs text-muted-foreground">{p.ownerEmail}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "visits",
      header: "Visitas",
      cell: ({ row }) => (
        <span className="font-medium tabular-nums">{row.getValue("visits")}</span>
      ),
    },
    {
      accessorKey: "lastVisit",
      header: "Última visita",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">{row.getValue("lastVisit")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => {
        const s = row.getValue("status") as string
        return (
          <Badge variant="outline" className={cn("text-xs", statusClass[s] ?? "")}>
            {s}
          </Badge>
        )
      },
      filterFn: exactFilter,
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const p = row.original
        return (
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
              <Eye className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
              <Download className="size-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: patients,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
  })

  const speciesFilter = table.getColumn("species")?.getFilterValue() as string
  const statusFilter  = table.getColumn("status")?.getFilterValue()  as string

  return (
    <div className="w-full space-y-4">
      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar pacientes…"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden cursor-pointer">
            <Download className="mr-2 size-4" />
            Exportar
          </Button>
          <div className="hidden"><PatientFormDialog onAddPatient={onAddPatient} /></div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Especie</Label>
          <Select value={speciesFilter || ""} onValueChange={(v) => table.getColumn("species")?.setFilterValue(v === "all" ? "" : v)}>
            <SelectTrigger className="cursor-pointer w-full"><SelectValue placeholder="Todas las especies" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las especies</SelectItem>
              <SelectItem value="Canino">Canino</SelectItem>
              <SelectItem value="Felino">Felino</SelectItem>
              <SelectItem value="Ave">Ave</SelectItem>
              <SelectItem value="Exótico">Exótico</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Estado</Label>
          <Select value={statusFilter || ""} onValueChange={(v) => table.getColumn("status")?.setFilterValue(v === "all" ? "" : v)}>
            <SelectTrigger className="cursor-pointer w-full"><SelectValue placeholder="Todos los estados" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Activo">Activo</SelectItem>
              <SelectItem value="Inactivo">Inactivo</SelectItem>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Columnas</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer w-full">
                Visibilidad <ChevronDown className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().filter(c => c.getCanHide()).map(c => (
                <DropdownMenuCheckboxItem
                  key={c.id}
                  className="capitalize cursor-pointer"
                  checked={c.getIsVisible()}
                  onCheckedChange={(v) => c.toggleVisibility(!!v)}
                >
                  {c.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(hg => (
              <TableRow key={hg.id}>
                {hg.headers.map(h => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-2">
          <Label className="text-sm">Mostrar</Label>
          <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(v) => table.setPageSize(Number(v))}>
            <SelectTrigger className="w-20 cursor-pointer"><SelectValue /></SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 50].map(n => <SelectItem key={n} value={`${n}`}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <span className="text-sm text-muted-foreground hidden sm:block">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} seleccionados
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm hidden sm:block">
            Página <strong>{table.getState().pagination.pageIndex + 1}</strong> de <strong>{table.getPageCount()}</strong>
          </span>
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="cursor-pointer">
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="cursor-pointer">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
