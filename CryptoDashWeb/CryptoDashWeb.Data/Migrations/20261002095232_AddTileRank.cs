using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CryptoDashWeb.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddTileRank : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "rank",
                schema: "dbo",
                table: "tiles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "tiles",
                keyColumn: "id",
                keyValue: 1,
                column: "rank",
                value: 0);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "tiles",
                keyColumn: "id",
                keyValue: 2,
                column: "rank",
                value: 1);

            migrationBuilder.UpdateData(
                schema: "dbo",
                table: "tiles",
                keyColumn: "id",
                keyValue: 3,
                column: "rank",
                value: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "rank",
                schema: "dbo",
                table: "tiles");
        }
    }
}
