using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdOpcion",
                table: "ProductoTipoOpciones");

            migrationBuilder.AlterColumn<int>(
                name: "IdTipoOpcion",
                table: "ProductoTipoOpciones",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "IdTipoOpcion",
                table: "ProductoTipoOpciones",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "IdOpcion",
                table: "ProductoTipoOpciones",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
