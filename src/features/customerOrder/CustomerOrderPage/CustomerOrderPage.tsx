import { Empty } from "antd";

import { CategoryTabs } from "../components/CategoryTabs";
import MenuGrid from "../components/MenuGrid";
import { CartFloatSection } from "../components/CartFloatSection";
import { OrderHistorySection } from "./OrderHistorySection";
import { CustomerOrderPageProps } from "./interface";

export default function CustomerOrderPage({
  tableSession,
  categories,
  menus,
  activeCategory,
  filteredMenus,
  isCartOpen,
  cartItems,
  isOrderLoading,
  handleChangeActiveCategory,
  handleIsCardOpen,
  handlePlaceOrder,
  handleAddToCart,
  handleRemoveItem,
}: CustomerOrderPageProps) {
  if (categories.length === 0 || menus.length === 0) {
    return (
      <Empty
        className="absolute -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2"
        description="Some thing went wrong. Please try again later."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Header */}
      <div className="relative z-11 flex items-center justify-between bg-white px-4 laptop:px-6 py-4">
        <div>
          <h1 className="text-2xl laptop:text-3xl font-bold text-orange-500">
            Order Your Food
          </h1>
          <p className="text-gray-600 text-sm laptop:text-base mt-1">
            Select items and place your order
          </p>
        </div>
        {/* History Button */}
        <OrderHistorySection sessionToken={tableSession.sessionToken} />
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(categoryId) =>
          handleChangeActiveCategory(categoryId)
        }
      />

      {/* Menu Items Grid */}
      <MenuGrid menus={filteredMenus} onAddToCart={handleAddToCart} />

      {/* Cart Float Section */}
      <CartFloatSection
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => handleIsCardOpen(false)}
        onOpenCart={() => handleIsCardOpen(true)}
        onRemoveItem={handleRemoveItem}
        onOrder={handlePlaceOrder}
        isLoading={isOrderLoading}
      />
    </div>
  );
}
