using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CryptoDashWeb.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddObjAndClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "class_entities",
                schema: "dbo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_class_entities", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "object_entities",
                schema: "dbo",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:IdentitySequenceOptions", "'1000', '1', '', '', 'False', '1'")
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    class_code = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    display_name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_object_entities", x => x.id);
                    table.ForeignKey(
                        name: "fk_object_entities_class_entities_class_code",
                        column: x => x.class_code,
                        principalSchema: "dbo",
                        principalTable: "class_entities",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "dbo",
                table: "class_entities",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 2, "SupportedCurrency" },
                    { 3, "Coin" }
                });

            migrationBuilder.CreateIndex(
                name: "ix_object_entities_class_code",
                schema: "dbo",
                table: "object_entities",
                column: "class_code");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "object_entities",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "class_entities",
                schema: "dbo");
        }
    }
}
