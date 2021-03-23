using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdEstado",
                table: "Pedidos",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Estados",
                columns: table => new
                {
                    IdEstado = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estados", x => x.IdEstado);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Pedidos_IdEstado",
                table: "Pedidos",
                column: "IdEstado");

            migrationBuilder.AddForeignKey(
                name: "FK_Pedidos_Estados_IdEstado",
                table: "Pedidos",
                column: "IdEstado",
                principalTable: "Estados",
                principalColumn: "IdEstado",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pedidos_Estados_IdEstado",
                table: "Pedidos");

            migrationBuilder.DropTable(
                name: "Estados");

            migrationBuilder.DropIndex(
                name: "IX_Pedidos_IdEstado",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "IdEstado",
                table: "Pedidos");
        }
    }
}
