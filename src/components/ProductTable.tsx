import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  productName: string;
  category: string;
  score: number;
  status: string;
  lastUpdated: string;
}

interface ProductTableProps {
  products: Product[];
  onViewDetails: (productId: string) => void;
}

const ProductTable = ({ products, onViewDetails }: ProductTableProps) => {
  const [sortField, setSortField] = useState<keyof Product>("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success bg-success/10";
    if (score >= 60) return "text-warning bg-warning/10";
    return "text-destructive bg-destructive/10";
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline"; label: string }> = {
      active: { variant: "default", label: "Active" },
      pending: { variant: "secondary", label: "Pending" },
      draft: { variant: "outline", label: "Draft" },
    };
    return variants[status] || variants.draft;
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const modifier = sortOrder === "asc" ? 1 : -1;
    
    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * modifier;
    }
    return String(aVal).localeCompare(String(bVal)) * modifier;
  });

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("productName")}
                className="hover:bg-muted"
              >
                Product Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("score")}
                className="hover:bg-muted"
              >
                Transparency Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((product) => {
            const statusBadge = getStatusBadge(product.status);
            return (
              <TableRow key={product.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full font-semibold",
                        getScoreColor(product.score)
                      )}
                    >
                      {product.score}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                </TableCell>
                <TableCell>{product.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(product.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
