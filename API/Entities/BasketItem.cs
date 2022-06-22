using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navigation properties - Entity frameworks works out relationships between entities
        public int ProductId { get; set; }
        public Product Product { get; set; }



        public int BasketId {get; set;}
        public Basket Basket {get; set;}
    }
}