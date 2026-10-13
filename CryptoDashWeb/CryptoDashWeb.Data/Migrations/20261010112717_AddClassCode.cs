using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CryptoDashWeb.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddClassCode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                schema: "dbo",
                table: "class_entities",
                columns: new[] { "id", "name" },
                values: new object[] { 4, "Currency" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "dbo",
                table: "class_entities",
                keyColumn: "id",
                keyValue: 4);
        }
    }
}
