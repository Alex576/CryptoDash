using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CryptoDashWeb.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddObjNameIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "ix_object_entities_name",
                schema: "dbo",
                table: "object_entities",
                column: "name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_object_entities_name",
                schema: "dbo",
                table: "object_entities");
        }
    }
}
