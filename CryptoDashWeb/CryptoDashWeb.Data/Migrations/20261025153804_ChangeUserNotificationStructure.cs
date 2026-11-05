using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CryptoDashWeb.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUserNotificationStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_user_notification_histories_notification_key",
                schema: "dbo",
                table: "user_notification_histories");

            migrationBuilder.DropColumn(
                name: "data_json",
                schema: "dbo",
                table: "user_notification_histories");

            migrationBuilder.DropColumn(
                name: "notification_key",
                schema: "dbo",
                table: "user_notification_histories");

            migrationBuilder.AddColumn<string>(
                name: "data",
                schema: "dbo",
                table: "user_notification_histories",
                type: "jsonb",
                nullable: false,
                defaultValue: "{}");

            migrationBuilder.AddColumn<bool>(
                name: "is_read",
                schema: "dbo",
                table: "user_notification_histories",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                schema: "dbo",
                table: "user_notification_histories",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "ix_user_notification_histories_user_id",
                schema: "dbo",
                table: "user_notification_histories",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_user_notification_histories_user_id",
                schema: "dbo",
                table: "user_notification_histories");

            migrationBuilder.DropColumn(
                name: "data",
                schema: "dbo",
                table: "user_notification_histories");

            migrationBuilder.DropColumn(
                name: "is_read",
                schema: "dbo",
                table: "user_notification_histories");

            migrationBuilder.DropColumn(
                name: "user_id",
                schema: "dbo",
                table: "user_notification_histories");

            migrationBuilder.AddColumn<string>(
                name: "data_json",
                schema: "dbo",
                table: "user_notification_histories",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "notification_key",
                schema: "dbo",
                table: "user_notification_histories",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "ix_user_notification_histories_notification_key",
                schema: "dbo",
                table: "user_notification_histories",
                column: "notification_key");
        }
    }
}
