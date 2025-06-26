import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price?: number;
  featured: boolean;
  image_url?: string;
  tenant_id: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  plan: string;
  status: string;
}

export const useSupabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (tenantId?: string) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('products').select('*');
      if (tenantId) {
        query = query.eq('tenant_id', tenantId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as Product[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: Omit<Product, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();
      if (error) throw error;
      return data as Product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTenants = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('tenants').select('*');
      if (error) throw error;
      return data as Tenant[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchProducts,
    createProduct,
    fetchTenants
  };
};
