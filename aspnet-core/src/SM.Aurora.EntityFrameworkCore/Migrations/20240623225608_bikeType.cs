using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SM.Aurora.Migrations
{
    /// <inheritdoc />
    public partial class bikeType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "AppBikes");

            migrationBuilder.AddColumn<Guid>(
                name: "BikeTypeId",
                table: "AppBikes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "AppBikeType",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppBikeType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppBikes_BikeTypeId",
                table: "AppBikes",
                column: "BikeTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppBikes_AppBikeType_BikeTypeId",
                table: "AppBikes",
                column: "BikeTypeId",
                principalTable: "AppBikeType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppBikes_AppBikeType_BikeTypeId",
                table: "AppBikes");

            migrationBuilder.DropTable(
                name: "AppBikeType");

            migrationBuilder.DropIndex(
                name: "IX_AppBikes_BikeTypeId",
                table: "AppBikes");

            migrationBuilder.DropColumn(
                name: "BikeTypeId",
                table: "AppBikes");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "AppBikes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
