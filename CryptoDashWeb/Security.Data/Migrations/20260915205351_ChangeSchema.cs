using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Security.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "sc");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "users",
                newSchema: "sc");

            migrationBuilder.RenameTable(
                name: "roles",
                newName: "roles",
                newSchema: "sc");

            migrationBuilder.RenameTable(
                name: "role_user",
                newName: "role_user",
                newSchema: "sc");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "users",
                schema: "sc",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "roles",
                schema: "sc",
                newName: "roles");

            migrationBuilder.RenameTable(
                name: "role_user",
                schema: "sc",
                newName: "role_user");
        }
    }
}
