using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CryptoDashWeb.Data.Migrations
{
    /// <inheritdoc />
    public partial class RenameTableTileItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_layouts_tile_items_tile_id",
                schema: "dbo",
                table: "layouts");

            migrationBuilder.DropForeignKey(
                name: "fk_tile_items_tile_items_parent_id",
                schema: "dbo",
                table: "tile_items");

            migrationBuilder.DropForeignKey(
                name: "fk_tile_items_tile_types_type_code",
                schema: "dbo",
                table: "tile_items");

            migrationBuilder.DropIndex(
                name: "ix_layouts_tile_id",
                schema: "dbo",
                table: "layouts");

            migrationBuilder.DropPrimaryKey(
                name: "pk_tile_items",
                schema: "dbo",
                table: "tile_items");

            migrationBuilder.RenameTable(
                name: "tile_items",
                schema: "dbo",
                newName: "tiles",
                newSchema: "dbo");

            migrationBuilder.RenameIndex(
                name: "ix_tile_items_type_code",
                schema: "dbo",
                table: "tiles",
                newName: "ix_tiles_type_code");

            migrationBuilder.RenameIndex(
                name: "ix_tile_items_parent_id",
                schema: "dbo",
                table: "tiles",
                newName: "ix_tiles_parent_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_tiles",
                schema: "dbo",
                table: "tiles",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "ix_layouts_tile_id",
                schema: "dbo",
                table: "layouts",
                column: "tile_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_layouts_tiles_tile_id",
                schema: "dbo",
                table: "layouts",
                column: "tile_id",
                principalSchema: "dbo",
                principalTable: "tiles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_tiles_tile_types_type_code",
                schema: "dbo",
                table: "tiles",
                column: "type_code",
                principalSchema: "dbo",
                principalTable: "tile_types",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_tiles_tiles_parent_id",
                schema: "dbo",
                table: "tiles",
                column: "parent_id",
                principalSchema: "dbo",
                principalTable: "tiles",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_layouts_tiles_tile_id",
                schema: "dbo",
                table: "layouts");

            migrationBuilder.DropForeignKey(
                name: "fk_tiles_tile_types_type_code",
                schema: "dbo",
                table: "tiles");

            migrationBuilder.DropForeignKey(
                name: "fk_tiles_tiles_parent_id",
                schema: "dbo",
                table: "tiles");

            migrationBuilder.DropIndex(
                name: "ix_layouts_tile_id",
                schema: "dbo",
                table: "layouts");

            migrationBuilder.DropPrimaryKey(
                name: "pk_tiles",
                schema: "dbo",
                table: "tiles");

            migrationBuilder.RenameTable(
                name: "tiles",
                schema: "dbo",
                newName: "tile_items",
                newSchema: "dbo");

            migrationBuilder.RenameIndex(
                name: "ix_tiles_type_code",
                schema: "dbo",
                table: "tile_items",
                newName: "ix_tile_items_type_code");

            migrationBuilder.RenameIndex(
                name: "ix_tiles_parent_id",
                schema: "dbo",
                table: "tile_items",
                newName: "ix_tile_items_parent_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_tile_items",
                schema: "dbo",
                table: "tile_items",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "ix_layouts_tile_id",
                schema: "dbo",
                table: "layouts",
                column: "tile_id");

            migrationBuilder.AddForeignKey(
                name: "fk_layouts_tile_items_tile_id",
                schema: "dbo",
                table: "layouts",
                column: "tile_id",
                principalSchema: "dbo",
                principalTable: "tile_items",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_tile_items_tile_items_parent_id",
                schema: "dbo",
                table: "tile_items",
                column: "parent_id",
                principalSchema: "dbo",
                principalTable: "tile_items",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_tile_items_tile_types_type_code",
                schema: "dbo",
                table: "tile_items",
                column: "type_code",
                principalSchema: "dbo",
                principalTable: "tile_types",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
