import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import ProductTable from "@/components/ProductTable";
import ProductDetailModal from "@/components/ProductDetailModal";
import productsData from "@/data/products.json";

interface Product {
  id: string;
  productName: string;
  category: string;
  score: number;
  status: string;
  lastUpdated: string;
  explanation: string;
  suggestions: string[];
  flags: string[];
  ingredients: Array<{ name: string; source: string; verified: boolean }>;
  certifications: string[];
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(productsData as Product[]);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleViewDetails = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Average Score",
      value: Math.round(products.reduce((acc, p) => acc + p.score, 0) / products.length) || 0,
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "High Transparency",
      value: products.filter((p) => p.score >= 80).length,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Need Attention",
      value: products.filter((p) => p.flags.length > 0).length,
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor product transparency and manage your portfolio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Products Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Product Portfolio</h2>
        <ProductTable products={products} onViewDetails={handleViewDetails} />
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
