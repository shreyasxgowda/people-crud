# People CRUD (React + ASP.NET Core + MySQL)
## Full‑stack CRUD app:

Frontend: React (Vite)
Backend: ASP.NET Core Web API (C#) + Entity Framework Core
Database: MySQL

## Prerequisites
Windows 11
Node.js LTS
.NET SDK 8.x
MySQL Server 8.x + MySQL Workbench
VS Code


## Quick Start

### 1) Database (MySQL)
Run this SQL as root in MySQL Workbench (or via CLI):


CREATE DATABASE IF NOT EXISTS PeopleDb CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER IF NOT EXISTS 'people_user'@'localhost' IDENTIFIED BY 'people_pwd';
GRANT ALL PRIVILEGES ON PeopleDb.* TO 'people_user'@'localhost';
FLUSH PRIVILEGES;


Backend connection string (backend/appsettings.json):

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=127.0.0.1;Port=3306;Database=PeopleDb;User Id=people_user;Password=people_pwd;TreatTinyAsBoolean=true;"
  }
}


### 2) Backend (ASP.NET Core)
Open a terminal in the backend folder:

cd backend
dotnet restore
dotnet tool update --global dotnet-ef
dotnet ef migrations add InitialCreate   # run once if no migration exists
dotnet ef database update
dotnet run
API base: http://localhost:5000
Swagger: http://localhost:5000/swagger


### 3) Frontend (React + Vite)
Open a second terminal in the frontend folder:

cd frontend
npm install
echo VITE_API_BASE_URL=http://localhost:5000 > .env
npm run dev
App: http://localhost:5173
Test end‑to‑end
Backend (Swagger): test GET/POST at http://localhost:5000/swagger
Frontend: http://localhost:5173
Fill the form and Save → row appears in the table
Edit → Update saved
Delete → Row removed
Exported MySQL schema (for submission)
Included structure‑only schema: db/people_schema.sql
To export yourself (Workbench):

Server > Data Export
Select schema: PeopleDb
Export Options: Export to Self‑Contained File
Dump Structure Only
Output: people-crud/db/people_schema.sql
Start Export


## CLI alternative:

### Structure + data
mysqldump -h 127.0.0.1 -P 3306 -u people_user -p PeopleDb > db\people_schema.sql


people-crud/
  README.md
  db/
    people_schema.sql
  backend/
    Controllers/
      PeopleController.cs
    Data/
      AppDbContext.cs
    DTOs/
      PersonCreateDto.cs
      PersonUpdateDto.cs
      PersonReadDto.cs
    Models/
      Person.cs
    Services/
      IPersonService.cs
      PersonService.cs
    appsettings.json
    Program.cs
    CrudApi.csproj
  frontend/
    .env
    index.html
    src/
      api.js
      constants.js
      App.jsx
      main.jsx
      index.css
      components/
        PersonForm.jsx
        PeopleTable.jsx



## API endpoints
GET /api/people
GET /api/people/{id}
POST /api/people
PUT /api/people/{id}
DELETE /api/people/{id}


## Notes / Troubleshooting


404 at http://localhost:5000 is expected for Web API root; use /swagger and /api routes.
CORS: backend allows http://localhost:5173 (see Program.cs); ensure app.UseCors is before MapControllers.
EF “Access denied”: verify PeopleDb user/password/privileges; then run dotnet ef database update.
Vite env: after editing .env, restart npm run dev.
.NET runtime: install .NET 8 SDK if app targets net8.0.