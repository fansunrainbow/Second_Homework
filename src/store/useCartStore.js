import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cartItems.find((p) => p.id === product.id && p.spec === product.spec);
      if (existing) {
        return {
          cartItems: state.cartItems.map((p) =>
            p.id === product.id && p.spec === product.spec ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
      }
    }),
  removeFromCart: (productId, spec) =>
    set((state) => ({
      cartItems: state.cartItems.filter((p) => !(p.id === productId && p.spec === spec)),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
