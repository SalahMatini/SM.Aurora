using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SM.Aurora.Migrations
{
    /// <inheritdoc />
    public partial class order_removed_orderID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "AppOrders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "AppOrders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
