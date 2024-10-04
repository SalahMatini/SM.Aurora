using System;
using System.ComponentModel.DataAnnotations;

namespace SM.Aurora.Bikes
{
    public class CreateUpdateBikeDto
    {
        [Required]
        [StringLength(128)]
        public string Brand { get; set; }

        [Required]
        [StringLength(128)]
        public string Model { get; set; }


        [Required]
        [StringLength(50)]
        public string Color { get; set; }

        [Required]
        public int ReleaseYear { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public Guid BikeTypeId { get; set; }
    }
}
