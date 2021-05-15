using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class vrc_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CambiaPrecio",
                table: "ProductoOpciones",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "IdProductoTipoOpcion",
                table: "ProductoOpciones",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductoOpciones_IdProductoTipoOpcion",
                table: "ProductoOpciones",
                column: "IdProductoTipoOpcion");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductoOpciones_ProductoTipoOpciones_IdProductoTipoOpcion",
                table: "ProductoOpciones",
                column: "IdProductoTipoOpcion",
                principalTable: "ProductoTipoOpciones",
                principalColumn: "IdProductoTipoOpcion",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductoOpciones_ProductoTipoOpciones_IdProductoTipoOpcion",
                table: "ProductoOpciones");

            migrationBuilder.DropIndex(
                name: "IX_ProductoOpciones_IdProductoTipoOpcion",
                table: "ProductoOpciones");

            migrationBuilder.DropColumn(
                name: "CambiaPrecio",
                table: "ProductoOpciones");

            migrationBuilder.DropColumn(
                name: "IdProductoTipoOpcion",
                table: "ProductoOpciones");
        }
    }
}
