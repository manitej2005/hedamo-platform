import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";
import RadialChart from "./RadialChart";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  productName: string;
  category: string;
  score: number;
  explanation: string;
  suggestions: string[];
  flags: string[];
  ingredients: Array<{ name: string; source: string; verified: boolean }>;
  certifications: string[];
}

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, open, onClose }: ProductDetailModalProps) => {
  if (!product) return null;

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-success" };
    if (score >= 60) return { label: "Good", color: "text-warning" };
    return { label: "Needs Improvement", color: "text-destructive" };
  };

  const scoreInfo = getScoreLabel(product.score);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.productName}</DialogTitle>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Score Section */}
          <div className="flex items-start gap-6 p-6 bg-muted/50 rounded-lg">
            <div className="flex-shrink-0">
              <RadialChart score={product.score} size={120} />
            </div>
            <div className="flex-1">
              <h3 className={cn("text-xl font-semibold mb-2", scoreInfo.color)}>
                {scoreInfo.label} Transparency
              </h3>
              <p className="text-sm text-foreground/80">{product.explanation}</p>
            </div>
          </div>

          {/* Flags */}
          {product.flags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Attention Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.flags.map((flag, index) => (
                  <Badge key={index} variant="destructive">
                    {flag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {product.suggestions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                AI Suggestions
              </h3>
              <ul className="space-y-2">
                {product.suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
            <div className="space-y-2">
              {product.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{ingredient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Source: {ingredient.source}
                    </p>
                  </div>
                  <Badge variant={ingredient.verified ? "default" : "secondary"}>
                    {ingredient.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
