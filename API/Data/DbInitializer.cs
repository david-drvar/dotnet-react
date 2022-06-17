using API.Entities;
using System.Collections.Generic;
using System.Linq;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext storeContext)
        {
            if (storeContext.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Angular Speedster Board 2000",
                    Description = "Lorem ipsum",
                    Price = 2000,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Type = "Boots",
                    Brand = "Angular",
                    QuantityInStock = 10
                },
                new Product
                {
                    Name = "iPhone 13 Pro Max",
                    Description = "Lorem ipsum",
                    Price = 2100230,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Type = "Phone",
                    Brand = "Apple",
                    QuantityInStock = 102
                },
                new Product
                {
                    Name = "iPod",
                    Description = "Lorem ipsum",
                    Price = 99,
                    PictureUrl = "/images/products/sb-ang1.png",
                    Type = "Music",
                    Brand = "Apple",
                    QuantityInStock = 1
                }
            };

            storeContext.Products.AddRange(products);
            storeContext.SaveChanges();
        }
    }
}
