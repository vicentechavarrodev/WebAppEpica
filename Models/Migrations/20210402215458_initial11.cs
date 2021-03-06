﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
         
            migrationBuilder.AddColumn<bool>(
                name: "EsPizza",
                table: "Productos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
          

            migrationBuilder.AddColumn<bool>(
                name: "EsPizza",
                table: "ProductoTipoOpciones",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
