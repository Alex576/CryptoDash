using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CryptoDashWeb.Data.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "tile_types",
                schema: "dbo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_tile_types", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tile_items",
                schema: "dbo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    tool_code = table.Column<int>(type: "integer", nullable: true),
                    type_code = table.Column<int>(type: "integer", nullable: false),
                    parent_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_tile_items", x => x.id);
                    table.ForeignKey(
                        name: "fk_tile_items_tile_items_parent_id",
                        column: x => x.parent_id,
                        principalSchema: "dbo",
                        principalTable: "tile_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_tile_items_tile_types_type_code",
                        column: x => x.type_code,
                        principalSchema: "dbo",
                        principalTable: "tile_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "layouts",
                schema: "dbo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tile_id = table.Column<int>(type: "integer", nullable: false),
                    layout_json = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_layouts", x => x.id);
                    table.ForeignKey(
                        name: "fk_layouts_tile_items_tile_id",
                        column: x => x.tile_id,
                        principalSchema: "dbo",
                        principalTable: "tile_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tile_types",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 1, "Dashboard" },
                    { 2, "Grid" },
                    { 3, "Form" },
                    { 4, "Filter" },
                    { 5, "Layout" }
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "tile_items",
                columns: new[] { "id", "name", "parent_id", "tool_code", "type_code" },
                values: new object[,]
                {
                    { 1, "Dashboard Layout", null, 1, 5 },
                    { 2, "Dashboard Filters", 1, null, 4 },
                    { 3, "Dashboard Dashboard", 1, null, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "ix_layouts_tile_id",
                schema: "dbo",
                table: "layouts",
                column: "tile_id");

            migrationBuilder.CreateIndex(
                name: "ix_tile_items_parent_id",
                schema: "dbo",
                table: "tile_items",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_tile_items_type_code",
                schema: "dbo",
                table: "tile_items",
                column: "type_code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "layouts",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "tile_items",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "tile_types",
                schema: "dbo");
        }
    }
}
