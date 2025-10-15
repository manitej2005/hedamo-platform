import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, ArrowLeft, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Basic Info", description: "Product details" },
  { id: 2, name: "Ingredients", description: "List all ingredients" },
  { id: 3, name: "Certifications", description: "Add certifications" },
  { id: 4, name: "Review", description: "Review and submit" },
];

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    description: "",
    ingredients: [] as Array<{ name: string; source: string; verified: boolean }>,
    certifications: [] as string[],
  });

  const [newIngredient, setNewIngredient] = useState({ name: "", source: "" });
  const [newCertification, setNewCertification] = useState("");

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.source) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, { ...newIngredient, verified: false }],
      });
      setNewIngredient({ name: "", source: "" });
    }
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const addCertification = () => {
    if (newCertification && !formData.certifications.includes(newCertification)) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification],
      });
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((c) => c !== cert),
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.productName || !formData.category) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    if (currentStep === 2) {
      if (formData.ingredients.length === 0) {
        toast.error("Please add at least one ingredient");
        return;
      }
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    toast.success("Product submitted successfully! AI analysis in progress...");
    
    // Simulate AI feedback
    setTimeout(() => {
      toast.info("AI Feedback: Add organic certification for better transparency score", {
        duration: 5000,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
        <p className="text-muted-foreground">
          Submit your product for AI-powered transparency analysis
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  currentStep >= step.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium">{step.name}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 transition-colors",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name *</Label>
                <Input
                  id="productName"
                  placeholder="Enter product name"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Confectionery">Confectionery</SelectItem>
                    <SelectItem value="Food & Spreads">Food & Spreads</SelectItem>
                    <SelectItem value="Bakery">Bakery</SelectItem>
                    <SelectItem value="Supplements">Supplements</SelectItem>
                    <SelectItem value="Oils & Condiments">Oils & Condiments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="ingredientName">Ingredient Name</Label>
                  <Input
                    id="ingredientName"
                    placeholder="e.g., Organic Wheat Flour"
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="ingredientSource">Source</Label>
                  <Input
                    id="ingredientSource"
                    placeholder="e.g., Local Farm, USA"
                    value={newIngredient.source}
                    onChange={(e) => setNewIngredient({ ...newIngredient, source: e.target.value })}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addIngredient} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.ingredients.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Ingredients</Label>
                  <div className="space-y-2">
                    {formData.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{ingredient.name}</p>
                          <p className="text-sm text-muted-foreground">Source: {ingredient.source}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="certification">Certification</Label>
                  <Input
                    id="certification"
                    placeholder="e.g., Organic, Fair Trade, Non-GMO"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCertification()}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addCertification} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.certifications.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Certifications</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="px-3 py-1">
                        {cert}
                        <button
                          onClick={() => removeCertification(cert)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Product Name</h3>
                  <p className="text-muted-foreground">{formData.productName}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Category</h3>
                  <p className="text-muted-foreground">{formData.category}</p>
                </div>
                {formData.description && (
                  <div>
                    <h3 className="font-semibold mb-1">Description</h3>
                    <p className="text-muted-foreground">{formData.description}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold mb-2">Ingredients ({formData.ingredients.length})</h3>
                  <div className="space-y-2">
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{ingredient.name}</p>
                        <p className="text-sm text-muted-foreground">Source: {ingredient.source}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {formData.certifications.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {currentStep < 4 ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit for Analysis</Button>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
