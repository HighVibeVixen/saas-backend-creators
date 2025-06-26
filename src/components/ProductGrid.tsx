import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { useSupabase, Product } from '@/hooks/useSupabase';
import { toast } from '@/components/ui/use-toast';

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { fetchProducts, loading, error } = useSupabase();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handlePurchase = (product: Product) => {
    toast({
      title: "Purchase Initiated",
      description: `Starting checkout for ${product.title}`,
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              {product.image_url ? (
                <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-500">No Image</div>
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.title}</CardTitle>
                {product.featured && <Badge>Featured</Badge>}
              </div>
              <CardDescription className="line-clamp-2">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.original_price && (
                    <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.8)</span>
                </div>
              </div>
              <Button 
                className="w-full gap-2" 
                onClick={() => handlePurchase(product)}
              >
                <ShoppingCart className="h-4 w-4" />
                Purchase Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {products.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No products found</p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;