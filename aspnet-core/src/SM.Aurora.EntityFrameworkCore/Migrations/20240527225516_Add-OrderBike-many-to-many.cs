using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SM.Aurora.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderBikemanytomany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppOrderBikes",
                columns: table => new
                {
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BikeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppOrderBikes", x => new { x.OrderId, x.BikeId });
                    table.ForeignKey(
                        name: "FK_AppOrderBikes_AppBikes_BikeId",
                        column: x => x.BikeId,
                        principalTable: "AppBikes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppOrderBikes_AppOrders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "AppOrders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppOrderBikes_BikeId",
                table: "AppOrderBikes",
                column: "BikeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppOrderBikes");
        }
    }
}
